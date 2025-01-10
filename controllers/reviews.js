const Listing = require("../Models/Listing");
const Review = require("../Models/review");

module.exports.createReview = async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Successfully added a new review!");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { listingId, reviewId } = req.params;
  const listing = await Listing.findById(listingId);
  listing.reviews.pull(reviewId);
  await Review.findByIdAndDelete(reviewId);
  await listing.save();
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${listingId}`);
};
