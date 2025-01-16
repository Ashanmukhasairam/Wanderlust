const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Listing = require("../Models/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const listingController = require("../controllers/listing.js");

router
  .route("/")
  //Index Route
  .get(wrapAsync(listingController.index))
  //create Route
  // .post(isLoggedIn, wrapAsync(listingController.createListing));
  .post(upload.single('listing[image]'), (req,res) =>{
    res.send(req.file);
  });

router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router
  .route("/:id")
  //show route
  .get(wrapAsync(listingController.showListing))
  //Update Route
  .put(isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
  //Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
