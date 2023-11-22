// Dependencies
const express = require("express");
require("dotenv").config();
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

// Db connection
const dbConnection = require("./utils/dbConnect");

// Routes
const reviewRoutes = require("./routes/reviewRoute");

app.use("/api", reviewRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Database connection

app.listen(process.env.PORT, () => {
  console.log(`app was listening on port ${process.env.PORT}`);
});
