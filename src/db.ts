import mongoose from "mongoose";

const { accessibleRecordsPlugin } = require("@casl/mongoose");
mongoose.plugin(accessibleRecordsPlugin);

const connectToDb = async () => {
  const uri = "mongodb://localhost:27017/casl";
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDb;
