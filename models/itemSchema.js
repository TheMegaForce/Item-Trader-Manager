const mongoose = require("../database/connection");

const itemSchema = new mongoose.Schema({
    name: String,
    rarity: Number,
    img: String,
    description: String
});

const item = new mongoose.model("Item", itemSchema);

module.exports = item;