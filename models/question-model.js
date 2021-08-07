const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema(
    {
        qid: { type: String, required: true },
        space: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        answer: { type: [String] },
        up: { type: [String] },
        time: { type: String },
        creatorid: { type: String, required: true },
        creatorName: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('questions', Question);