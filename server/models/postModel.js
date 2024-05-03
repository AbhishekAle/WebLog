import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
      sparse: true,
    },
    posts: [
      {
        type: String,
        sparse: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User", // Name of the User model
      required: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
