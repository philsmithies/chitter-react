let TweetModel = require('../models/tweet.js')

let TweetController = {
  find: async (req, res) => {
    // sort this id
    let found = await TweetModel.find({_id:  req.params._id}).populate('author')
    res.json(found)
  },
  all: async (req, res) => {
    let getAllTweets = await TweetModel.find().populate('author')
    res.json(getAllTweets)
  },
  create: async(req, res) => {
    req.body.author = req.user._id;
    let newTweet = new TweetModel(req.body)
    console.log(req.body)
    let savedTweet = await newTweet.save()    
    res.json(savedTweet)
  }
}

module.exports = TweetController
