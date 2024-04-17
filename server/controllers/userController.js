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

  let newUser;
  if (email) {
    newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
  } else {
    newUser = new userModel({
      username,
      phoneNumber,
      password: hashedPassword,
    });
  }

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
    if (!validUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      res.status(401).json({ message: "Wrong credentials" });
      return;
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true, sameSite: "None" })
      .status(200)
      .json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

//update user controller

export const updateUser = async (req, res, next) => {
  // Check if the user is authorized to update their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "User not authorized"));
  }

  try {
    // Check if password is provided and hash it if necessary
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // Determine which type of contact information is provided (email or phone number)
    let updatedUserData;
    if (req.body.email) {
      // Update user with email
      updatedUserData = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
    } else if (req.body.phoneNumber) {
      // Update user with phone number
      updatedUserData = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
    } else {
      // If neither email nor phone number is provided, return an error
      return res
        .status(400)
        .json({ error: "Email or phone number is required" });
    }

    // Omit password field from the response
    const { password, ...rest } = updatedUserData._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//getAllUser controller
export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.ststus(500).json({ error: error.message });
  }
};

//getUserById controller
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//logout controller
export const logoutUser = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "user has been logged out." });
};
