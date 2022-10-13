const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid User ID provided" });
    }
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. User could not be fetched" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Users could not be fetched" });
  }
};

const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNo, role } = req.body;

  try {
    const { user, exists } = await User.signup(
      email,
      password,
      firstName,
      lastName,
      phoneNo,
      role
    );
    if (exists) {
      return res.status(404).json({ error: "Email already in use." });
    }

    const token = createToken(user._id);
    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      error:
        "An error occured. Account could not be created. Please try again.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, match } = await User.login(email, password);
    if (!user || !match) {
      res
        .status(404)
        .json({ error: "Invalid login credentials. Please try again" });
    } else {
      //create token
      const token = createToken(user._id);
      res.status(200).json({ user, token });
    }
  } catch (error) {
    res
      .status(404)
      .json({ error: "Invalid login credentials. Please try again." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid User ID provided" });
    }
    const user = await User.findByIdAndUpdate({ _id: id }, { ...req.body });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({
        error: "An error occured. User with the provided ID does not exist.",
      });
    }
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. User could not be updated" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid User ID provided" });
    }
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json(user);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. User could not be deleted" });
  }
};

module.exports = {
  getSingleUser,
  signupUser,
  updateUser,
  loginUser,
  deleteUser,
  getAllUsers,
};
