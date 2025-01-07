  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const Listing = require("./Models/Listing.js");
  const path =  require("path")
  const methodOverride = require("method-override");
  const ejsMate = require("ejs-mate");
  app.use(express.static('public'));
  const wrapAsync =require("./utils/wrapAsync.js");
  const ExpressError = require("./utils/ExpressError");
  const {listingSchema, reviewSchema } = require("./schema.js")
  const Review = require("./Models/review.js");
  const reviews =  require("./routes/review.js");
  const listings = require("./routes/listing.js");
  const session = require("express-session");
  const flash = require("connect-flash");
const exp = require("constants");


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

  const sessionOptions = {
    secret :"mysupersecretcode",
    resave : false,
    saveUninitialized :true,
    cookie: {
      expires : Date.now() + 1000*60*60*24*7,
      maxAge : 1000*60*60*24*7,
      httpOnly : true,
    }
  };

  app.use(session(sessionOptions));
  app.use(flash());

app.get("/", (req,res) =>{
  res.render("home.ejs");
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/listings/:listingId/reviews/:reviewId",reviews);



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

