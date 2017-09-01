import {Observable} from "rx"
import url from "url"
import Observables from '../../lib/observables'
import Processor from '../base.js'
import {CONNECTION_INTERVAL} from '../../configuration/constants'

const getMovieDetail= function(){
    const {movie, harvester} = this
    return Observables.fromUrl(movie.link)
        .map(harvester.getTorrentLink)
        .map(torrentUrl => ({...movie, torrentUrl}))
}

const resolveId = (movie) => {
    const linkWithId = movie.imageUrl
    const pathnames = url.parse(linkWithId)
                        .pathname.split("/")
    const {[pathnames.length-1]: last} = pathnames
    const [id] = last.split("_")
    return {
        id: Number(id), 
        ...movie
    }
}

const existsMovieById = function(){
    const {movie, store} = this
    const value = store.getMovieById(movie.id)
    return Observable.fromPromise(value)
            .map((obj)=>[movie, obj != void 0] )
}

const persistMovie = function(){
    const {movie, store} = this
    return Observable.fromPromise(store.persistMovie(movie))
            .map(()=>movie)
}

class MovieProcessor extends Processor{

    process(){
        const {harvester, store} = this
        const source = super.process()
        .map(harvester.getMoviesList)
        .flatMap(Observable.fromArray)

        let sampledSource = source;
        if(process.env.MOVIES_SAMPLING != void 0){
            sampledSource = source.take(Number(process.env.MOVIES_SAMPLING))
        }
        
        const processedSource = sampledSource.map(resolveId)
        .flatMap(movie => existsMovieById.bind({movie, store})())
        .filter(([movie, exists])=>!exists)
        .map(([movie, exists])=>movie)

    return Observable.zip(processedSource, Observable.interval(CONNECTION_INTERVAL))
        .map(([movie]) => movie)
        .flatMap(movie => getMovieDetail.bind({movie, harvester})())
        .flatMap(movie=>persistMovie.bind({movie, store})())
    }
}

export default MovieProcessor