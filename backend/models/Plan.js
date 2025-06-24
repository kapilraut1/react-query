import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  billingCycle: String,
  isActive: Boolean,
  serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

export default mongoose.model("Plan", planSchema);
