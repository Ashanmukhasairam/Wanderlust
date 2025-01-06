const express = require('express');
const app = express();
const port = 3000;
const session = require("express-session");
const flash = require("connect-flash");

app.use(session({
    secret: "secretingstring",
    resave :false,
    saveUninitialized: true}
));
app.use(flash())


app.get("/register",(req,res) =>{
    let {name= "anonymous"} =req.query;
    req.session.name = name;
    res.redirect("/hello");
});

app.get("/hello",(req,res) =>{
    res.send((`hello, ${req.session.name}`));
});







// app.get("/test", (req,res) =>{
//     res.send("test successful!");

// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});