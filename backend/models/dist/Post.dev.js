"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PostSchema = new Schema({
  file: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('uploadFile', PostSchema);