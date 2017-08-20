import MovieProcessor from './movies'
import {createProcessor} from './base'
import {createStore, harvester} from '../datasource' 

export const createMovieProcessor = (url) => {
    const optionsProcessor = {
        name: 'movies',
        initUrl: url || process.env.MOVIES_URL,
        harvester,
        store: createStore()
    }
    return createProcessor(MovieProcessor.prototype, optionsProcessor)
}

export default () => {
    return [createMovieProcessor()]
}