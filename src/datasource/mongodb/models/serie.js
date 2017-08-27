import mongoose, {Schema} from 'mongoose'

const SerieSchema = Schema({
    id: { type: Number, index: { unique: true }},
    title: String,
    link: String,
    imageUrl: String,
    format: String,
    torrentLink: String,
    createdAt: { type: Date, expires: 60 }
})


export default mongoose.model("Serie", SerieSchema)