const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const Item = require("./models/item");
const path = require('path')
const cacheTime = 86400000 * 30


app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: cacheTime
}))


app.get("/", async (req, res) => {
    let d = await fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
    let f = await d.json()
    res.render("main.ejs", { skins: f })
});

app.get("/seed", async (req, res) => {
});


app.listen(PORT, () => console.log("ON PORT:", PORT));