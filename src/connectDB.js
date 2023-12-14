const mongoose = require("mongoose");
require('dotenv').config()

const uri =
  process.env.MONGODB_URI
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);

    console.log("Connected to MongoDB");

    mongoose.connection.on("disconnected", () => {
      console.log("Lost MongoDB connection");
    });

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
