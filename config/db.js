const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("MONGODB_URI");

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to DB...");
  } catch (err) {
    console.log("DB", err);
  }
};

module.exports = connectDB;
