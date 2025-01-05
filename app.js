  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const path =  require("path") 
  const methodOverride = require("method-override");
  const ejsMate = require("ejs-mate");
  app.use(express.static('public'));

  const ExpressError = require("./utils/ExpressError");
  



  const listings = require("./routes/listing.js");
  const reviews = require("./routes/review.js");


  const MONGO_URL = 'mongodb+srv://snikM1912:snikM1912@wanderlust.18okj.mongodb.net/';

  main().catch(err => console.log(err));

  async function main() {
    await mongoose.connect(MONGO_URL)
  };

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({extended : true}));
  app.use(methodOverride("_method"));
  app.engine("ejs",ejsMate);
  app.use(express.static(path.join(__dirname,"/public")))


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*",(req,res,next) =>{
  next(new ExpressError(404,"page not found!"));
})

  app.use((err,req,res,next) =>{
    let {statuscode =500,message="something went wrong"} = err;
    res.status(statuscode).render("error.ejs" ,{err});
  });

  app.listen(8080, () => {
      console.log("app is listening to the port 8080");
  });

