import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

export const signUpUser = asyncHandler(async (req, res) => {
  //Get JSON body from request [x]
  const {
    body: { name, email, password, character, newsletter },
  } = req;
  //Check if the user already exists [x]
  const found = await User.findOne({ email });
  if (found) throw new ErrorResponse("Email already taken");
  //Hash the password [x]
  const hash = await bcrypt.hash(password, 5);
  //Create a new user in the database [x]
  const { _id } = await User.create({
    name,
    email,
    password: hash,
    character,
    newsletter,
  });
  //Sign a token (with the user id) [x]
  const token = jwt.sign({ _id }, process.env.JWT_SECRET);
  //Return token [x]
  res.status(201).json({ token });
});

export const updateUser = asyncHandler(async (req, res) => {
  //Get JSON body from request [x]
  const {
    body: { id, name, email, password, character },
  } = req;
  try {
    //Check if the user already exists [x]
    // const found = await User.findOne({ email });
    // if (found) throw new ErrorResponse("Email already taken");
    //Hash the password [x]
    const hash = await bcrypt.hash(password, 5);
    //Create a new user in the database [x]
    const result = password
      ? await User.findByIdAndUpdate(id, {
          name,
          email,
          password: hash,
          character,
        })
      : await User.findByIdAndUpdate(id, {
          name,
          email,
          character,
        });
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong " + err });
  }
});

export const signInUser = asyncHandler(async (req, res) => {
  //Get JSON body from request [x]
  const {
    body: { email, password },
  } = req;
  //Check if the user exists [x]
  const found = await User.findOne({ email }).select("+password");
  if (!found) throw new ErrorResponse("User does not exist");
  //Compare passwords [x]
  const match = await bcrypt.compare(password, found.password);
  if (!match) throw new ErrorResponse("Password is incorrect");
  //Sign a token (with the user id) [x]
  const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET);
  //Return token [x]
  res.status(201).json({ token });
});

export const getUser = (req, res) => {
  console.log(req.user);
  res.json(req.user);
};
