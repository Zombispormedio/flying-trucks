import MovieProcessor from './movies'
import {createProcessor} from './base'
import {store, harvester} from '../datasource' 

export const createMovieProcessor = (initUrl) => {
    const optionsProcessor = {
        name: 'movies',
        initUrl,
        harvester,
        store
    }
    return createProcessor(MovieProcessor.prototype, optionsProcessor)
}

export default () => {
    const movieProcessor = createMovieProcessor(process.env.MOVIES_URL)
    return [movieProcessor]
}