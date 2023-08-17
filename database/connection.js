const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://The_Mega_Force:bread@sei.xgav9i3.mongodb.net/item-manager');

mongoose.connection
.on("connected", () => console.log("Connected to Mongoose"))
.on("error", () => console.log("ERROR"))

module.exports = mongoose;