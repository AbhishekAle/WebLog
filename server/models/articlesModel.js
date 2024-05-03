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
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User", // Name of the User model
      required: true,
    },
  },
  { timestamps: true }
);

const articlesModel = mongoose.model("Articles", articlesSchema);
export default articlesModel;
