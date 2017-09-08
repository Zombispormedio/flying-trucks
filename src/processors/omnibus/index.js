import vm from 'vm'
import path from 'path'
import {Observable} from 'rx'
import Processor from '../base.js'
import {getDefaultPathname, CONNECTION_INTERVAL, getBadUrl} from '../../configuration/constants'
import Observables from '../../lib/observables'

const extractDataFromScript = (rawData)=>{
    const sandbox = {}
    const script = new vm.Script(rawData)
    const context = new vm.createContext(sandbox)
    script.runInContext(context)
    return {movies: sandbox.arrayMODPC, series: sandbox.arrayMODSH}
}

const foldArrayToObject = ([id, link, imageUrl, title, format]) => ({
        id: Number(id), link, imageUrl, title: title.trim(), format, createdAt: new Date()
    })

const resolveMovieTorrentLink = () => ((data) => {
    const {imageUrl} = data
    const basename = path.basename(imageUrl, ".jpg")
    const torrentLink = getDefaultPathname() + basename + ".torrent"
    return {...data, torrentLink}
})

const fixSerieTorrentLink = () => ((link) => {
    return getDefaultPathname() + 
                link.replace(getBadUrl(), "").replace("/", "")
                 + ".torrent"
})


const resolveSerieTorrentLink = function(series){
    const {harvester} = this
    return Observable.fromArray(series)
            .flatMap(serie => {
                return Observables.fromUrl(serie.link)
                .doOnNext(()=>console.log(`get html from serir ${serie.id}`))
                .map(harvester.getTorrentLink)
                .doOnNext(()=>console.log(`get torrentlink ${serie.id}`))
                .map(fixSerieTorrentLink())
                .map(torrentLink => ({...serie, torrentLink}))
            })
            .toArray()
}
 
const processMovies = function(movies){
    const {store: { substractMovieIds, persistMovies }} = this
    const featuredObservable = Observable.fromArray(this.featured)
                                    .map(movie => ({...movie, createdAt: new Date()}))
    const inputObservable = Observable.fromArray(movies)
                                .map(foldArrayToObject)
    return Observable.concat(featuredObservable, inputObservable)
            .map(resolveMovieTorrentLink())
            .toArray()
            .flatMap(movies => Observable.fromPromise(substractMovieIds(movies)))
            .doOnNext(console.log)
            .flatMap(movies => Observable.fromPromise(persistMovies(movies))
                                .map(() => movies))
}

const processSeries = function(series){
    const {store: { substractSerieIds, persistSeries }, harvester} = this
    return Observable.fromArray(series)
            .map(foldArrayToObject)
            .toArray()
            .doOnNext(()=>console.log("Join movies and torrent link"))
            .flatMap(series => Observable.fromPromise(substractSerieIds(series)))
            .doOnNext(()=>console.log("Substract ids series"))
            .flatMap(resolveSerieTorrentLink.bind({harvester}))
            .doOnNext(()=>console.log("serie link"))
            .flatMap(series => Observable.fromPromise(persistSeries(series))
                                .map(() => series))
                                .doOnNext(()=>console.log("persist series"))
                                
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