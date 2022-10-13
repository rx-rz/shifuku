const express = require("express");
const {
  getSingleUser,
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:id", getSingleUser);

router.get("/", getAllUsers);

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
