const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomType: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  roomStatus: {
    type: String,
    required: true,
  },
  roomUrl: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("room", roomSchema);
