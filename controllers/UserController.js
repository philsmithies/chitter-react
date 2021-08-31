let UserModel = require('../models/user.js')
let TweetModel = require('../models/tweet.js')

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
    let savedUser = await newUser.save()    
    res.json(savedUser)
  },
  getAllTweets: async (req, res) => {
    const reqUser = await UserModel.findOne({ username: req.params.username });
    let foundUser = await TweetModel.find({author: reqUser._id}).populate("author").sort({ createdAt: 'desc' })
    res.json(foundUser)
  },
  update: async (req, res) => {
    let found = await UserModel.findOneAndUpdate({username:  req.params.username}, 
      {bio: req.body.bio, bioPhotoId: req.body.bioPhotoId, fullName: req.body.fullName}
      )
    console.log(res)
    res.send("Bio Updated")
  },
}


module.exports = UserController