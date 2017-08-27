import mongoose from 'mongoose'
import {curry} from 'ramda'
import {ModelTypes} from '../../configuration/constants'
import Models from './models'

mongoose.Promise = Promise;
const Module  =  {}

Module.connectDatabase = () => {
    return mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true })
}

Module.close = () => {
    mongoose.connection.close()
}

const persistModels = (type, data) => {
    return Models[type].insertMany(data)
}

Module.persistMovies = curry(persistModels)(ModelTypes.MOVIE)
Module.persistSeries = curry(persistModels)(ModelTypes.SERIE)



const substractIds = (type, data) =>{

}

Module.substractMovieIds = curry(substractIds)(ModelTypes.MOVIE)
Module.substractSerieIds = curry(substractIds)(ModelTypes.SERIE)

export default Module