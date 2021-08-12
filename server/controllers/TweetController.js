let TweetModel = require('../models/tweet.js')

let TweetController = {
  find: async (req, res) => {
    // sort this id
    let found = await TweetModel.find({id:  req.params.id})
    res.json(found)
  },
  all: async (req, res) => {
    let getAllTweets = await TweetModel.find()
    res.json(getAllTweets)
  },
  create: async(req, res) => {
    let newTweet = new TweetModel(req.body)
    console.log(req.body)
    let savedTweet = await newTweet.save()    
    res.json(savedTweet)
  }
}

module.exports = TweetController
