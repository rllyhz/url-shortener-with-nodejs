const mongoose = require('mongoose'),
  shortid = require('shortid'),
  config = require('config')

const urlSchema = mongoose.Schema({
  longUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Url', urlSchema)