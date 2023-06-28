import * as mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  weight: { type: Number, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: {
    type: Date,
    default: function currentTime() {
      return new Date().toISOString();
    },
    required: true,
  },
});
