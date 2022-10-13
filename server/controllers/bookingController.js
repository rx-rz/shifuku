const Booking = require("../models/bookingModel");
const express = require("express");

const mongoose = require("mongoose");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Bookings cannot be fetched" });
  }
};

const createBooking = async (req, res) => {
  const {
    customerName,
    customerPhoneNo,
    noOfGuests,
    checkIn,
    bookingPrice,
    checkOut,
    bookingStatus,
    roomType,
    roomNo,
    paymentId,
    roomId,
  } = req.body;
  try {
    const booking = await Booking.create({
      customerName,
      customerPhoneNo,
      bookingPrice,
      noOfGuests,
      checkIn,
      checkOut,
      bookingStatus,
      roomType,
      roomNo,
      paymentId,
      roomId,
    });
    return res.status(200).json(booking);
  } catch (err) {
    return res.json({
      error: "An error occured. Booking could not be created",
    });
  }
};

const getSingleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid Booking ID provided" });
    }
    const booking = await Booking.findById(id);
    return res.status(200).json(booking);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Booking could not be fetched" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid Booking ID provided" });
    }
    const booking = await Booking.findByIdAndDelete(id);
    return res.status(200).json(booking);
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Booking could not be deleted" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "An error occured. Invalid Booking ID provided" });
    }
    const booking = await Booking.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (booking) {
      return res.status(200).json(booking);
    } else {
      return res.status(404).json({
        error: "An error occured. Booking with the provided ID does not exist.",
      });
    }
  } catch (err) {
    res
      .status(404)
      .json({ error: "An error occured. Booking could not be updated" });
  }
};

module.exports = {
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  createBooking,
};
