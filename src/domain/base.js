import {configureEnvironment} from '../config/main'
import moviesDomain from './movies'

configureEnvironment()

export default {
    movies: {
        exec: moviesDomain,
        url: process.env.MOVIES
    }
    /*,
        tvSeries:{
            exec: require("./series"),
            url: process.env.TV_SERIES
        }*/
}