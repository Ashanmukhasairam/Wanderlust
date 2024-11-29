const express = require("express");
const app = express();
const port = 8080;
const ExpressError = require("./ExpressError");


app.use("/random",(req,res,next) =>{
    console.log("I am only for random");
    next();
});

//logger-MOrgan
const Token = (req,res,next) =>{
    req.time = Date.time;
    if(Token == "giveaccess"){
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
    // console.log(req.method,req.hostname,req.path,req.time);


    
};

app.use("/api",Token, (req,res,next) =>{
    let { token } = req.query;
    if(token == "giveaccess"){
        next();
    }
    res.send("ACESS DENIED!")
})

app.get("/api",(req,res) =>{
    res.send("Hello from API");
})

app.get("/",(req,res) => {
    res.send("Hello World!");
});

    app.get("/random",(req,res) =>{
        res.send("this is a random page");
    });

    app.get("/err", (req,res) =>{
        alsdfj=jkasd;lfk
    })


    app.use((err,req,res,next) =>{
       let {status, message} = err;
       res.status(status).send({msg:message});
        next(err);
    });

//404
// app.use((req,res) =>{
//     res.status(404).send("Not Found");
// })
app.listen(8080,() =>{
    console.log("server is running on port 8080");
})