import { connectToDatabase } from "../../../util/mongodb";
const { ObjectId } = require("mongodb");

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const user = await db
    .collection("users")
    .find({ _id: ObjectId(req.query.id) })
    .toArray();
  res.json(user);
};
