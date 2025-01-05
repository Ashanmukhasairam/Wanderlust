const Joi = require("joi");

module.exports.reviewSchema = Joi.object({
    listing: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required(),
    }).required(),
})

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required(),
})