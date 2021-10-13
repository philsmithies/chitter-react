import { connectToDatabase } from "../../../util/mongodb";
const mongoose = require("mongoose");

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = mongoose.Types.ObjectId(req.query);

  const tweet = await db
    .collection("tweets")
    .find({ _id: `${id}` })
    .toArray();

  res.json(tweet);
};
