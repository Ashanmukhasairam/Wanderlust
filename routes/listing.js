const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Listing = require("../Models/Listing.js");
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const {listingSchema, reveiwSchema } = require("../schema.js")


const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    }
    else{
      next();
    }
  };
  

//Index Route
router.get("/", async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })


//new Route
router.get("/new", (req,res) =>{
  res.render("listings/new.ejs");
});

//show route
router.get("/:id", async (req, res, next) => {
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
router.post("/", async (req,res,next) =>{
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
router.get("/:id/edit", async(req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});

})

//Update Route
router.put("/:id", wrapAsync(async (req,res) =>{
  if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
  }

  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
}));


//Delete Route
router.delete("/:id", wrapAsync(async(req,res) =>{
  let {id} =  req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings")
}));



module.exports = router;