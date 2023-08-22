const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

// LOGIN
router.get('/login', (req, res) => {
    res.render('auth/login.ejs');
});

router.post('/login', async (req, res) => {
    let userToLogin = await User.findOne({ username: req.body.username });
    if (userToLogin) {
        bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
            if (result) {
                req.session.userId = userToLogin._id;
                req.session.name = userToLogin.name;
                res.redirect("/items");
            } else {
                res.send("Incorrect Password");
            };
        });
    };
});

// SIGN UP
router.post('/signup', async (req, res) => {
    if (req.body.username && req.body.password) {
        let plainTextPassword = req.body.password
        bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
            req.body.password = hashedPassword;
            let newUser = await User.create(req.body);
            res.send(newUser);
        });
    };
});

router.get('/signup', (req, res) => {
    res.redirect('/login');
});

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login")
});

module.exports = router;