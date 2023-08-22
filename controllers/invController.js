const express = require("express");
const router = express.Router();
const invSchema = require("../models/inventorySchema");
const itemSchema = require("../models/itemSchema");

// CREATE INV SEED
router.get("/inventory/seed", async (req, res) => {
    let foundItem = await itemSchema.findOne({name: "Ghostly Gibus"})
    let foundId = foundItem._id
    let newInv = await invSchema.create([
        {
            userId: req.session.userId,
            items: foundId
        }
    ])
    res.redirect("/inventory")
})

// SHOW INV
router.get("/inventory", async (req, res) => {
    let foundInv = await invSchema.findOne({userId: req.session.userId})
    .populate("userId")
    .populate("items")
    res.render("showAllItems.ejs", {inv: foundInv})
})

module.exports = router;