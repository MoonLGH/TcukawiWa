import mongoose from "mongoose";
export const model = mongoose.model("Semi", new mongoose.Schema({
    numberId: {
        type: String,
        required: true,
    },
}));
