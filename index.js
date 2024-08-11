require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");
const routes = require("./routes/routes");
const authRoutes = require("./routes/auth/routes");
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error); //TODO: check best practice
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(cors());

//use express's json middleware to parse JSON payloads of incoming requests and make it available in req.body
app.use(express.json());

//any req going to /api will be handled by the endpoints defined in routes.js
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
