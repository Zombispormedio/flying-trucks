import MovieProcessor from './movies'
import {createProcessor} from './base'

export const createMovieProcessor = (url) => {
    const optionsProcessor = {
        name: 'movies',
        initUrl: url,
        harvester: {},
        store: {}
    }
    return createProcessor(MovieProcessor.prototype, optionsProcessor)
}

export default () => {
    const movieProcessor = createMovieProcessor(process.env.MOVIES_URL)
    return [movieProcessor]
}