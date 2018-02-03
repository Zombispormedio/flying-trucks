import mongoose, { Schema } from "mongoose";

const SubscriberSchema = Schema({
  email: String,
  enabled: Boolean
});

export default mongoose.model("Subscriber", SubscriberSchema);
