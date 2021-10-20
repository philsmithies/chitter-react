const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "Please enter your Name"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [2, "Password too short"],
    },
    bio: {
      type: String,
    },
    publicId: String,
    bioPhotoId: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
