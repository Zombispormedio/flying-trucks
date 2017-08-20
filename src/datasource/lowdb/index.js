import low from 'lowdb'
import lowFileAsync from 'lowdb/lib/storages/file-async'
const db = low('db.json', {
    storage: lowFileAsync
})

const Module = {}

Module.connectDatabase = () => {
    return db.defaults({
            movies: [],
            series: []
        })
        .write()
}

Module.getMovieById = (id) => {
    return new Promise((resolve) => {
        const value = db.get('movies')
            .find({id})
            .value()
        resolve(value)
    })
}

Module.persistMovie = (movie) => {
    return db.get('movies')
        .push(movie)
        .write()
}

export default Module