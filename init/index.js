const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../Models/Listing.js");

const MONGO_URL = "mongodb+srv://snikM1912:snikM1912@wanderlust.18okj.mongodb.net/";

main().then(() => {
console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
await mongoose.connect(MONGO_URL)
};

const initDB = async () =>{
    await Listing.deleteMany({});
    data.data = data.data.map((obj) => ({...obj, owner: "677dfb2e09f47089732b8dc4"}));
    await Listing.insertMany(data.data);
    console.log("DB initialized");
}

initDB();