const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

mongoose.connection
.on("connected", () => console.log("Connected to Mongoose"))
.on("error", () => console.log("ERROR"))

module.exports = mongoose;