// import { connectToDatabase } from "../../util/mongodb.js";
// import Tweet from "../../models/tweet";

// export default async (req, res) => {
//   const { db } = await connectToDatabase();
//   const tweets = await Tweet.find();
//   // const tweets = await db
//   //   .collection("tweets")
//   //   .find({})
//   //   // .populate("author")
//   //   // .sort({ createdAt: "desc" })
//   //   .toArray();
//   res.json(tweets);
// };

import dbConnect from "../../lib/dbConnect";
import Tweet from "../../models/tweet";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const tweets = await Tweet.find({});
        res.status(200).json(tweets);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const tweet = await Tweet.create(req.body);

        res.status(201).json({ success: true, data: tweet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
