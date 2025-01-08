const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");

router.get("/signup", (req,res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup",async(req,res)=>{
    let {username,email,password} = req.body;
    const newUser = new User({username,email});
    const RegisteredUser = await User.register(newUser,password);
    req.flash("success","Welcome to Wanderlust");
    res.redirect("/listings");

});

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",(req,res)=>{
    res.send("Login Route");
});

module.exports = router;