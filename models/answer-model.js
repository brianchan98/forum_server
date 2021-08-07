const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answer = new Schema(
    {
        aid: { type: String, required: true },
        qid: { type: String, required: true },
        content: { type: String, required: true },
        uid: { type: String, required: true },
        uname: { type: String, required: true },
        time: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('answers', Answer);