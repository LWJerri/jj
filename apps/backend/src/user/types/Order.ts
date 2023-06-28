import mongoose from "mongoose";

export type Order = {
  user: mongoose.Schema.Types.ObjectId;
  from: string;
  to: string;
  weight: number;
  fullName: string;
  phone: string;
  createdAt: Date;
};
