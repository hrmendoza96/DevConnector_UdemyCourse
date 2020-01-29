const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("ERROR IN MONGO:" + err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;