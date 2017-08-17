import moviesDomain from './movies'

export default () => ({
    movies: {
        exec: moviesDomain,
        url: process.env.MOVIES
    }
    /*,
        tvSeries:{
            exec: require("./series"),
            url: process.env.TV_SERIES
        }*/
})