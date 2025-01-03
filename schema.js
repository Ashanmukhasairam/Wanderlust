const Joi = require("joi");

module.exports.reveiwSchema = Joi.object({
    listing: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required(),
    }).required(),
})