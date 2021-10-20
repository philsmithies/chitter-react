const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

// it will pluralize this name in the db so it equals 'tweets'
export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);
