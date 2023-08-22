const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const itemSchema = require("./models/itemSchema");
const invSchema = require("./models/inventorySchema")
const path = require('path')
const cacheTime = 86400000 * 30
const authRoutes = require("./controllers/authController");
const itemsRoutes = require("./controllers/itemsController")
const boxRoutes = require("./controllers/boxController")
const invRoutes = require("./controllers/invController")
const session = require("express-session");
// const session = require("cookie-session");
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

// SEED
// DO FIRST -----------------------------------------
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
        },
        {
            name: "Burning Flames Team Captain",
            rarity: 6,
            img: "https://steamuserimages-a.akamaihd.net/ugc/3299195982091997493/77DA5D5C71D99DD81C560FF3581EF4B4D7008B5C/",
            description: "Your head is on fire..."
        }
    ]);
    res.send(seededItems)
})

// AUTH CHECK
app.use((req, res, next) => {
    if(!req.session.userId) {
        res.redirect("/login")
        return
    }

    next();
});

app.use(itemsRoutes)

app.use(invRoutes)

app.use(boxRoutes)


app.listen(PORT, () => console.log("ON PORT:", PORT));