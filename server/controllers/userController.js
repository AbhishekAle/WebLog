import userModel from "../models/userModel.js";
import { errorHandler } from "../middleware/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register controller
export const registerUser = async (req, res, next) => {
  const { username, email, phoneNumber, password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new userModel({
    username,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

//login controller
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await userModel.findOne({ username });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true, sameSite: "None" })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//logout controller
export const logoutUser = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "user has been logged out." });
};
