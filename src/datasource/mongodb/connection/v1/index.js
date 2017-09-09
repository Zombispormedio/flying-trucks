import mongoose from 'mongoose'
import {getMongoUrl} from '../../../../configuration/constants'

mongoose.Promise = Promise;

export const connectDatabase = () => {
    return new Promise((resolve, reject) =>  {
        const connection = mongoose.connect(getMongoUrl(), { useMongoClient: true }).connection
        connection.on("error", reject);
        connection.once('open',resolve);
    })
}

export const disconnectDatabase = () => {
    mongoose.connection.close()
}