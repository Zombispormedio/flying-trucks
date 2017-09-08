import mongoose, {Schema} from 'mongoose'

const SubscriberSchema = Schema({
  email: String
})


export default mongoose.model("Subscriber", SubscriberSchema)