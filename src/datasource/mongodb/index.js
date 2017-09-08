import mongoose from 'mongoose'
import {curry} from 'ramda'
import {ModelTypes} from '../../configuration/constants'
import Models from './models'
import {getMongoUrl} from '../../configuration/constants'

mongoose.Promise = Promise;
const Module  =  {}

Module.connectDatabase = () => {
    return mongoose.connect(getMongoUrl(), { useMongoClient: true })
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
    const ids = data.map(({id})=> id)
    const controller = (resolve, reject) =>{
        Models[type].aggregate( { $match: {id: {$in: ids}}}, { $project: { _id: 0, id: 1 }}, (err, result)=>{
            const formatedResult = result.map(({id})=> id)
            const filteredData = data.filter(({id}) => formatedResult.indexOf(id) < 0)
            resolve(filteredData)
        })
    }
    return new Promise(controller)
}

Module.substractMovieIds = curry(substractIds)(ModelTypes.MOVIE)
Module.substractSerieIds = curry(substractIds)(ModelTypes.SERIE)


Module.getEmails = () => {
    const query = (resolve, reject) =>{
        Models[ModelTypes.SUBSCRIBER].find({}, function(err, data){
            if(err) return reject(err)
            const emails = data.map(({email})=>email)
            resolve(emails)
        })
    } 
   
    return new Promise(query)
}

export default Module