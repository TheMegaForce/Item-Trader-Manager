const mongoose = require("../database/connection");

const invSchema = new mongoose.Schema({
    userId: { ref: "User", type: mongoose.Schema.Types.ObjectId },
    items: [{ ref: "Item", type: mongoose.Schema.Types.ObjectId }]
});

const inventory = new mongoose.model("Inventory", invSchema);

module.exports = inventory;