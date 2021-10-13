import { connectToDatabase } from "../../../util/mongodb";
const { ObjectId } = require("mongodb");

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const tweet = await db
    .collection("tweets")
    .find({ _id: ObjectId(req.query.id) })
    .toArray();
  res.json(tweet);
};
