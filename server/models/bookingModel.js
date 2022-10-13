const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhoneNo: {
      type: String,
      required: true,
    },

    noOfGuests: {
      type: Number,
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    roomNo: {
      type: Number,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
    },
    bookingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
