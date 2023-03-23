import mongoose from "mongoose";

export interface Semi extends mongoose.Document {
    numberId:string;
}

export const model = mongoose.model<Semi>("Semi", new mongoose.Schema({
  numberId: {
    type: String,
    required: true,
  },
}));
