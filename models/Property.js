const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title:String,
    location:String,
    bhk:Number,
    price:Number
});
module.exports = mongoose.model("Property",propertySchema);