let TweetModel = require('../models/user.js')

let TweetController = {
  all: async (req, res) => {
    let allUsers = await TweetModel.find()
    res.json(allUsers)
  },
  create: async(req, res) => {
    let newTweet = new TweetModel(req.body)
    let savedTweet = await newTweet.savedUser()    
    res.json(savedTweet)
  }
}

module.exports = TweetController