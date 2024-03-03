import mongoose from "mongoose";

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
