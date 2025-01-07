const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

app.use(cookieParser("Secretingstring"));
//cookie is a key value pair that is stored in the browser and sent to the server with every request made by the browser to the server.
//cookies are stored in the browser in the form of key value pairs. 
//cookies are used to store user information in the browser.

app.get("/getcookies", (req,res) =>{
    res.cookie("name", "anonymous");
    res.cookie("age", "21",{signed: true});
    res.send("cookies set successfully!");
});

app.get("/greet", (req,res) =>{
    let {name = "anonymous"} = req.cookies;
    res.send(`hello, ${name}`);
});

app.get("/", (req,res) =>{
    console.log(req.cookies);
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

