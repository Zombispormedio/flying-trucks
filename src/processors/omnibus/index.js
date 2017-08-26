import vm from 'vm'
import path from 'path'
import {Observable} from 'rx'
import Processor from '../base.js'
import {getTorrentPathname} from '../../configuration/constants'

import util from 'util'

const extractDataFromScript = (rawData)=>{
    const sandbox = {}
    const script = new vm.Script(rawData)
    const context = new vm.createContext(sandbox)
    script.runInContext(context)
    return {movies: sandbox.arrayMODPC, series: sandbox.arrayMODSH}
}

const foldArrayToObject = ([id, link, imageUrl, title, format])=>({id, link, imageUrl, title, format})

const resolveTorrentLink = (data) => {
    const {imageUrl} = data
    const basename = path.basename(imageUrl, ".jpg")
    const torrentLink = getTorrentPathname()+basename
    return {...data, torrentLink}
}

const processMovies = function(movies){
    const {store: { substractMovieIds, persistMovies }} = this
    const featuredObservable = Observable.fromArray(this.featured)
    const inputObservable = Observable.fromArray(movies)
                                .map(foldArrayToObject)
    return Observable.concat(featuredObservable, inputObservable)
            .map(resolveTorrentLink)
            .toArray()
            .flatMap(movies => Observable.fromPromise(substractMovieIds(movies)))
            .flatMap(movies => Observable.fromPromise(persistMovies(movies))
                                .map(()=>movies))
       
}

const processSeries = function(series){
    return Observable.fromArray(series)
            .map(foldArrayToObject)
            .map(resolveTorrentLink)
            .toArray()
}

const foldData = function({featured, data: {series, movies}}){
    const moviesProcessorObservable = processMovies.bind({...this, featured})(movies)
    const seriesProcessorObservable = processSeries.bind(this)(series)
    return Observable.zip(moviesProcessorObservable, seriesProcessorObservable, (movies, series)=>({movies, series}))
}

class OmnibusProcessor extends Processor {
    getFoldDataFunction(){
        return foldData.bind(this)
    }

    process() {
        const {harvester, store} = this
        const source = super.process()
        const featuredSource = source.map(harvester.getFeaturedMovies)
        const inputSource = source.map(harvester.getScriptCode)
                                .map(extractDataFromScript)
        return Observable.zip(featuredSource, inputSource, (featured, data)=>({featured, data}))
                        .flatMap(this.getFoldDataFunction())
    }

}


export default OmnibusProcessor