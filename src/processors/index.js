import MovieProcessor from './movies'
import OmnibusProcessor from './omnibus'
import {createProcessor} from './base'
import {createStore, harvester} from '../datasource' 
import {getOmnibusUrl} from "../configuration/constants"

export const createMovieProcessor = (url) => {
    const optionsProcessor = {
        name: 'movies',
        initUrl: url || process.env.MOVIES_URL,
        harvester,
        store: createStore()
    }
    return createProcessor(MovieProcessor.prototype, optionsProcessor)
}

export const createOmnibusProcessor = (url) =>{
    const optionsProcessor = {
        name: 'omnibus',
        initUrl: url || getOmnibusUrl(),
        harvester,
        store: createStore()
    }
    return createProcessor(OmnibusProcessor.prototype, optionsProcessor)
}

export default () => {
    return [createMovieProcessor()]
}