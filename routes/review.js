const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });
const { listingSchema, reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const Review = require("../Models/review.js");
const Listing = require("../Models/Listing.js");
const Joi = require("joi");

//validating Reviews
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Reviews
//post route
router.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    res.redirect(`/listings/${listing.id}`);
}));

// Delete Review Route
router.delete("/listings/:listingId/reviews/:reviewId", wrapAsync(async (req, res) => {
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

module.exports = router;
