import mongoose, {Schema} from 'mongoose'
import {ModelTypes} from '../../../configuration/constants'

const SerieSchema = Schema({
    id: { type: Number, index: { unique: true }},
    title: String,
    link: String,
    imageUrl: String,
    format: String,
    torrentLink: String,
    createdAt: { type: Date, expires: process.env.TTL || 300 }
})


export default mongoose.model(ModelTypes.SERIE, SerieSchema)