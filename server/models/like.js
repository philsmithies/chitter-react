const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const likeSchema  = new Schema({
  type: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: "tweet"
  },
}, { timestamps: true })

// it will pluralise this name in the db so 'blogs'
const Like = mongoose.model('Like', likeSchema)
module.exports = Like;