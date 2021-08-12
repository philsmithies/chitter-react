let UserModel = require('../models/user.js')

let UserController = {
  find: async (req, res) => {
    let found = await UserModel.find({username:  req.params.username})
    res.json(found)
  },
  all: async (req, res) => {
    let allUsers = await UserModel.find()
    res.json(allUsers)
  },
  create: async(req, res) => {
    let newUser = new UserModel(req.body)
    let savedUser = await newUser.savedUser()    
    res.json(savedUser)
  },
  getAllTweets: async (req, res) => {
    let foundUser = await UserModel.find({username: req.params.username}).populate("tweets")
    res.json(foundUser)
  }
}

module.exports = UserController