const {connectDB} = require("./db")
const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors")
const path = require("path")
const bookingRoutes = require("./routes/bookingRoute");
const userRoutes = require("./routes/userRoute");
const roomRoutes = require("./routes/roomRoute");

const app = express();
app.use(express.json());
app.use(cors())
dotenv.config({path: ".env"})

app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);
app.use(express.static(path.join(__dirname, "../client/build")))
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connected to db and listening on port 4000");
    })
})