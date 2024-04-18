import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(cors());
dotenv.config();
connectDb();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const port = process.env.PORT;
app.listen(port, () => console.log(`server started at ${port}`));

//routes
app.use("/api", userRoute);
