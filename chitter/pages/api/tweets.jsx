import { connectToDatabase } from "../../util/mongodb.js";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const tweets = await db.collection("tweets").find({}).toArray();
  res.json(tweets);
};
