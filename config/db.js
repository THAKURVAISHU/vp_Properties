const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO URI:", process.env.MONGO_URI); 

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error", error);
    process.exit(1);
  }
};

module.exports = connectDB;