const express = require("express");
const {
  deleteRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  createRoom,
} = require("../controllers/roomController");

const router = express.Router();

router.get("/", getAllRooms);

router.get("/:id", getSingleRoom);

router.post("/", createRoom);

router.delete("/:id", deleteRoom);

router.patch("/:id", updateRoom);

module.exports = router;
