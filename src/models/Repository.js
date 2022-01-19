import mongoose from "mongoose";

const repositoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default new mongoose.model("Repository", repositoriesSchema);