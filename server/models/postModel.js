import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
    },
    posts: [
      {
        type: String,
      },
    ],
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
