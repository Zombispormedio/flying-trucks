import low from 'lowdb'
import lowFileAsync from 'lowdb/lib/storages/file-async'
import {curry} from 'ramda'
import {ModelTypes} from '../../configuration/constants'
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

const getModelById = (type, id) => {
    return new Promise((resolve) => {
        const value = db.get(ModelTypes[type].modelName.lowdb)
            .find({id})
            .value()
        resolve(value)
    })
}

Module.getMovieById = curry(getModelById)(ModelTypes.MOVIE)
Module.getSerieById = curry(getModelById)(ModelTypes.SERIE)

const persistModels = (type, models) => {
    return models.reduce((memo, item)=>{
        return memo.push(item)
    }, db.get(ModelTypes[type].modelName.lowdb)).write()
}

Module.persistMovies = curry(persistModels)(ModelTypes.MOVIE)
Module.persistSeries = curry(persistModels)(ModelTypes.SERIE)

const existsById = (type, id) =>{
    return !(
        db.get(ModelTypes[type].modelName.lowdb)
        .find({id})
        .value()
    )
}

const substractIds = (type, data) =>{
    return new Promise((resolve, reject) => {
        if(!ModelTypes.hasOwnProperty(type)) 
            return reject(new TypeError("ModelTypeSymbol is not specified"))
        const filteredData = data.filter(item =>  existsById(type, item.id))
        resolve(filteredData)
    })
}

Module.substractMovieIds = curry(substractIds)(ModelTypes.MOVIE)
Module.substractSerieIds = curry(substractIds)(ModelTypes.SERIE)

export default Module