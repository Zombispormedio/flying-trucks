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

class MovieProcessor extends Processor{
    process(){
        const {harvester} = this
        const source = super.process()
        .map(this.harvester.getMoviesList)
        .flatMap(Observable.fromArray)
        .map(resolveId)
        .take(2)

    return Observable.zip(source, Observable.interval(CONNECTION_INTERVAL))
        .map(([movie, _]) => movie)
        .flatMap(movie => getMovieDetail.bind({movie, harvester})())
    }
}

export default MovieProcessor