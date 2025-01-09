const Listing = require("./Models/Listing.js");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./Models/review.js");

module.exports.isLoggedIn= (req, res, next) => {
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be signed in to create a new listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl   = async (req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  console.log(res.locals.currUser._id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    
    req.flash("error","You do not have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body.listing);
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req,res,next) =>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  else{
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { listingId, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  console.log(review.author);
  console.log(res.locals.currUser._listingId);
  console.log(review.author.equals(req.user._id));
  if(!review.author.equals(req.user._id)){
    req.flash("error","You are not the author of this review!");
    return res.redirect(`/listings/${listingId}`);
  }
  next();
};