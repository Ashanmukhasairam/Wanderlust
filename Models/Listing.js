const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
            type: String,
            default: 'https://unsplash.com/photos/a-woman-sitting-on-a-chair-holding-a-camera-xiX2PkgsPn4',
    
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',  
        }
    ],
    owner :{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});


listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
    
   
});


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
