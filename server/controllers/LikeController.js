let LikeModal = require("../models/like.js");

let LikeController = {
  find: async (req, res) => {
    let found = await LikeModal.find({ id: req.params.id });
    res.json(found);
  },
  all: async (req, res) => {
    let getAllLikes = await LikeModal.find();
    res.json(getAllLikes);
  },
  create: async (req, res) => {
    let newLike = new LikeModal(req.body);
    console.log(req.body);
    let savedTweet = await newLike.save();
    res.json(savedTweet);
  },
};

module.exports = LikeController;
