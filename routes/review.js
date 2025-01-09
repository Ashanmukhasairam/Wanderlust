const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Listing = require("../Models/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const Review = require("../Models/review.js");
const { validateReview } = require("../middleware.js");

//Reviews
//post route
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Successfully added a new review!");
    res.redirect(`/listings/${listing.id}`);
  })
);

// Delete Review Route
router.delete(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    const { listingId, reviewId } = req.params;
    const listing = await Listing.findById(listingId);

    // Remove the review from the listing
    listing.reviews.pull(reviewId);

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    // Save the listing after removing the review
    await listing.save();

    req.flash("success", "Successfully deleted the review!");
    res.redirect(`/listings/${listingId}`);
  })
);

module.exports = router;
