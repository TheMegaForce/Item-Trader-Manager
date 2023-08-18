const mongoose = require("../database/connection");

const itemSchema = new mongoose.Schema({
    name: String,
    rarity: String,
    img: String,
    description: String
});

const item = new mongoose.model("Item", itemSchema);

module.exports = item;