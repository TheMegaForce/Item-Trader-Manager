const express = require("express");
const router = express.Router();
const itemSchema = require("../models/itemSchema");
const invSchema = require("../models/inventorySchema");


router.get("/lootbox", (req, res) => {
    res.render("lootbox/show_lootbox.ejs")
})

router.get("/lootbox/founditem", async (req, res) => {
    // Get a random entry
    var random = Math.floor(Math.random() * (await itemSchema.count()))
    // query all users but only fetch one offset by our random #
    let randomItem = await itemSchema.findOne().skip(random)

    const foundInv = await invSchema.findOne({userId: req.session.userId})
    // .populate("userId")
    // .populate("items")

    
    foundInv.items.push(randomItem.id)
    await foundInv.save()
    

    res.redirect(`/items/${randomItem.id}`);
})


module.exports = router;