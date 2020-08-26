const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('uploadFile', PostSchema)
