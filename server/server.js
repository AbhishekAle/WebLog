import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

const app = express();
dotenv.config();
connectDb();

//middleware
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
app.listen(port, () => console.log(`server started at ${port}`));
