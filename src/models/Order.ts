import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artwork" }],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Order =
  mongoose.models?.Order || mongoose.model("Order", OrderSchema);
