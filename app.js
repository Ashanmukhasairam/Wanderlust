  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const Listing = require("./Models/Listing.js");
  const path =  require("path")
  const methodoverride = require("method-override");
  const ejsMate = require("ejs-mate");
  app.use(express.static('public'));
  const wrapAsync =require("./utils/wrapAsync.js");
  const ExpressError = require("./utils/ExpressError");
  const {listingSchema, reveiwSchema } = require("./schema.js")
  const Review = require("./Models/review.js");



  const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

  main().catch(err => console.log(err));

  async function main() {
    await mongoose.connect(MONGO_URL)
  };

  app.use(express)


  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({extended : true}));
  app.use(methodoverride("_method"));
  app.engine("ejs",ejsMate);
  app.use(express.static(path.join(__dirname,"/public")))


//validating Reviews

const validateReview = (req,res,next) =>{
  let {error} = Review.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  else{
    next();
  }
};

//Index Route
  app.get("/listings", async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })


//new Route
app.get("/listings/new", (req,res) =>{
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res, next) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ExpressError(400, "Invalid ID format"));
  }

  try {
    const listing = await Listing.findById(id).populate("reviews");

    // If the listing does not exist
    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    res.render("listings/show.ejs", { listing });
  } catch (err) {
    next(err); // Pass the error to the error handler middleware
  }
});


//create route
app.post("/listings", async (req,res,next) =>{
  try
  {
  if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
  }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}catch(err){
  next(err);
}
});


//Edit Route
app.get("/listings/:id/edit", async(req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});

})

//Update Route
app.put("/listings/:id", wrapAsync(async (req,res) =>{
  if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
  }

  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
}));


//Delete Route
app.delete("/listings/:id", wrapAsync(async(req,res) =>{
  let {id} =  req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings")
}));


//Reviews
//post route
app.post("/listings/:id/reviews", validateReview,wrapAsync(async(req,res,next) =>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("new review saved");
  res.redirect(`/listings/${listing.id}`);

}));


// Delete Review Route
app.delete("/listings/:listingId/reviews/:reviewId", wrapAsync(async (req, res) => {
  const { listingId, reviewId } = req.params;
  const listing = await Listing.findById(listingId);

  // Remove the review from the listing
  listing.reviews.pull(reviewId);

  // Delete the review
  await Review.findByIdAndDelete(reviewId);

  // Save the listing after removing the review
  await listing.save();

  res.redirect(`/listings/${listingId}`);
}));




  // app.get("/testListing", async (req,res) =>{
  //   let SampleListing = new Listing({
  //     title : "My New villa",
  //     description : "By the Beach",
  //     price : 1200,
  //     location : "guntur, AP",
  //     country : "India",
  //   });

  //   await SampleListing.save();
  //   console.log("sample was saved");
  //   res.send("successful testing");
  // })



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

