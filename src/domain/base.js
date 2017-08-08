require('dotenv').config()
module.exports = {
    movies: {
        exec: require("./movies"),
        url: process.env.MOVIES
    },
    tvSeries:{
        exec: require("./series"),
        url: process.env.TV_SERIES
    }
}


