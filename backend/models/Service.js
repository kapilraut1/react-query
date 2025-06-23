import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  logoUrl: String,
});

export default mongoose.model("Service", serviceSchema);
