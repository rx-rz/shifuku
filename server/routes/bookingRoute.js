const express = require("express");
const {
  deleteBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  createBooking,
} = require("../controllers/bookingController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/", createBooking);

router.use(requireAuth);

router.get("/", getAllBookings);

router.get("/:id", getSingleBooking);

router.delete("/:id", deleteBooking);

router.patch("/:id", updateBooking);

module.exports = router;
