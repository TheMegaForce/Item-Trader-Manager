const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const itemSchema = require("./models/itemSchema");
const path = require('path')
const cacheTime = 86400000 * 30
const authRoutes = require("./controllers/authController");
const session = require("express-session");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
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

// AUTH CHECK
// app.use((req, res, next) => {
//     if(!req.session.userId) {
//         res.redirect("/login")
//         return
//     }

//     next();
// });

// SEED
app.get("/seed", async (req, res) => {
    let seededItems = await itemSchema.create([
        {
            name: "Ghostly Gibus",
            rarity: 1,
            img: "https://media.steampowered.com/apps/440/icons/ghostly_gibus_demo_large.8ad991f3508316565497b7db83f6151be0ee3933.png",
            description: "Your first and most precious item"
        },
        {
            name: "Gold Rocket",
            rarity: 5,
            img: "https://static.wikia.nocookie.net/teamfortress/images/4/4e/Item_icon_Australium_Rocket_Launcher.png",
            description: "This weapon is mine"
        }
    ]);
    res.send(seededItems)
})

// HOME
app.get("/items", async (req, res) => {
    let items = await itemSchema.find();
    res.render("main.ejs", { items })
});

// NEW
app.get("/items/new", (req, res) => {
    res.render("new_item.ejs")
})

// UPDATE
app.put("/items/:id", async (req, res) => {
    let itemToUpdate = await itemSchema.findOneAndUpdate({_id: req.params.id},
    { name: req.body.name})
    res.redirect("/items")
})

// CREATE
app.post("/items", async (req, res) => {
    let newItem = await itemSchema.create({
        name: req.body.name,
        rarity: req.body.rarity,
        img: req.body.img,
        description: req.body.description
    })
    res.send(newItem)
})

// EDIT
app.get("/items/:id/edit", async (req, res) => {
    let foundItem = await itemSchema.find({_id: req.params.id})
    res.render("edit_item.ejs", { item: foundItem[0] })
})

// SHOW
app.get("/items/:id", async (req, res) => {
    let foundItem = await itemSchema.find({_id: req.params.id})
    res.render("show_item.ejs", { item: foundItem[0] })
});

app.listen(PORT, () => console.log("ON PORT:", PORT));