const {connectDB} = require("./db")
const dotenv = require("dotenv")
const express = require("express");
const mongoose = require("mongoose");

const bookingRoutes = require("./routes/bookingRoute");
const userRoutes = require("./routes/userRoute");
const roomRoutes = require("./routes/roomRoute");

const app = express();
app.use(express.json());
dotenv.config({path: ".env"})
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connected to db and listening on port 4000");
    })
})
// const PORT = process.env.PORT || 5000
// const mode = process.env.NODE_ENV
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log("connected to db and listening on port 4000");
//     });
//   })
// app.listen(process.env.PORT, () => {
//     console.log("connected to db and listening on port 4000");
// })
//   .catch((err) => console.log(err));
app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);
