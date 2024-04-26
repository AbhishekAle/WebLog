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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
