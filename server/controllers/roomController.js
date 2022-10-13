const Room = require("../models/roomModel");
const mongoose = require("mongoose");

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    return res.status(200).json(rooms);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Rooms cannot be fetched" });
  }
};

const createRoom = async (req, res) => {
  const { roomType, roomNumber, roomStatus, roomPrice, roomUrl } = req.body;
  try {
    const room = await Room.create({
      roomType,
      roomNumber,
      roomPrice,
      roomStatus,
      roomUrl
    });
    return res.status(200).json(room);
  } catch (err) {
    return res.status(404).json({
      error: "An error occured. Room could not be created",
    });
  }
};

const getSingleRoom = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid Room ID provided" });
    }
    const room = await Room.findById(id);
    return res.status(200).json(room);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Room could not be fetched" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid Room ID provided" });
    }
    const room = await Room.findByIdAndDelete(id);
    return res.status(200).json(room);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Room could not be deleted" });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid Room ID provided" });
    }
    const room = await Room.findOneAndUpdate({ _id: id }, { ...req.body });
    if (room) {
      return res.status(200).json(room);
    } else {
      return res.status(404).json({
        error: "An error occured. Room with the provided ID does not exist.",
      });
    }
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Room could not be updated" });
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
