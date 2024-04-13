import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      sparse: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
