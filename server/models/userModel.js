import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      String,
      required: true,
    },
    email: {
      String,
      required: true,
    },
    password: {
      String,
      required: true,
    },
  },
  { timeStamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
