const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const Items = require("./models/items");
const path = require('path')
const cacheTime = 86400000 * 30
const authRoutes = require("./controllers/authController");
const session = require("express-session");


app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: cacheTime
}))
app.use(session({ secret: "stringofsomething", cookie: { maxAge: 3600000 } }));
app.use(authRoutes);

// SEED


// AUTH CHECK
// app.use((req, res, next) => {
//     if(!req.session.userId) {
//         res.redirect("/login")
//         return
//     }

//     next();
// });

// HOME
app.get("/trade", async (req, res) => {
    console.log(Items[0].img);
    res.render("main.ejs", { items: Items })
});

// NEW
app.get("/items/new", (req, res) => {
    res.render("new_item.ejs")
})

// CREATE
app.post("/items", (req, res) => {
    let newItem = {}
    newItem.name = req.body.name
    newItem.description = req.body.description
    newItem.rarity = req.body.rarity
    newItem.img = req.body.img

})

// EDIT
app.get("/items/:id/edit", (req, res) => {
    const id = req.params.id
    const item = 
    req.render("edit_item.ejs", {})
})


app.listen(PORT, () => console.log("ON PORT:", PORT));