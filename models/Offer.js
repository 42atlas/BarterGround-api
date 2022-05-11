import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const offerSchema = new Schema({
  product: { type: ObjectId, ref: "Post", required: true },
  offeredProducts: [{ type: ObjectId, ref: "Post", required: true }],
  initiator: { type: ObjectId, ref: "User", required: true },
  owner: { type: ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

export default model("Offer", offerSchema);
