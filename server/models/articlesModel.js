import mongoose from "mongoose";

const articlesSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const articlesModel = mongoose.model("Articles", articlesSchema);
export default articlesModel;
