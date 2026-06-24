const mongoose = require("mongoose");
const ContentSchma = new mongoose.Schema({
hero :{type :String,default:""},
overview :{type :String,default:""},
amenities :{type :String,default:""},
about:{type :String,default:""},
connectivity :{type :String,default:""},
construction :{type :String,default:""},
faq:{type :String,default:""},
});

module.exports = mongoose.model("Content",ContentSchma);