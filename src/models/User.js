import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, indexe: { unique: true } },
    password: { type: String, required: true }
}, { timestamps: true });

export default new mongoose.model("User", userSchema);