import mongoose from 'mongoose'
import {getMongoUrl} from '../../../../configuration/constants'

mongoose.Promise = Promise;

export const connectDatabase = () => {
    return mongoose.connect(getMongoUrl(), { useMongoClient: true })
}

export const disconnectDatabase = () => {
    mongoose.connection.close()
}