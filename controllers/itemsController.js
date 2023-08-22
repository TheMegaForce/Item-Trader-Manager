const express = require("express");
const router = express.Router();
const itemSchema = require("../models/itemSchema");
const invSchema = require("../models/inventorySchema");


// HOME
router.get("/items", async (req, res) => {
    let inv = await invSchema.findOne()
    .populate("userId")
    .populate("items")
    let items = await itemSchema.find();
    let sessionId = req.session.userId
    let sessionName = req.session.name;
    // if (inv.userId.id == req.session.id) {
        
    // }
    
    // console.log(inv.userId.id);
    
    
    res.render("main.ejs", { items, inv, sessionId, sessionName })
});

// NEW
router.get("/items/new", (req, res) => {
    res.render("new_item.ejs")
})

// DELETE
router.delete("/items/:id", async (req, res) => {
    let itemToDelete = await itemSchema.deleteOne({_id: req.params.id})
    res.redirect("/items")
})

// UPDATE
router.put("/items/:id", async (req, res) => {
    let itemToUpdate = await itemSchema.findOneAndUpdate({_id: req.params.id},
    {
        name: req.body.name,
        rarity: req.body.rarity,
        description: req.body.description,
        img: req.body.img
    })
    res.redirect(`/items/${req.params.id}`)
})

// CREATE ITEM
router.post("/items", async (req, res) => {
    let newItem = await itemSchema.create({
        name: req.body.name,
        rarity: req.body.rarity,
        img: req.body.img,
        description: req.body.description
    })
    res.redirect(`/items/${newItem._id}`)
})

// EDIT
router.get("/items/:id/edit", async (req, res) => {
    let foundItem = await itemSchema.find({_id: req.params.id})
    res.render("edit_item.ejs", { item: foundItem[0] })
})

// SHOW
router.get("/items/:id", async (req, res) => {
    let foundItem = await itemSchema.find({_id: req.params.id})
    res.render("show_item.ejs", { item: foundItem[0] })
});


module.exports = router;