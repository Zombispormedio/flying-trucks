import low from 'lowdb'
import lowFileAsync from 'lowdb/lib/storages/file-async'
console.log(lowFileAsync)
const db = low('db.json', { storage: lowFileAsync })

const Module  =  {}

Module.connectDatabase = () => {
    return db.defaults({ movies: [], series: [] })
    .write()
}

Module.getMovieById = (id) => {
    return db.get('movies')
            .find({id})
            .value()
}

Module.persistMovie = (movie) => {
    return db.get('movies')
            .push(movie)
            .write()
}

export default Module