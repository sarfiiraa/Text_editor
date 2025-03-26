// import mongoose from "mongoose";
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    webViewLink: { type: String, required: true },
    ownerEmail: { type: String, required: true }, // To associate files with users
    createdAt: { type: Date, default: Date.now },
});

// const MetaFile1=mongoose.model("MetaFile1", fileSchema);
module.exports = mongoose.model("MetaFile1", fileSchema);
