import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
