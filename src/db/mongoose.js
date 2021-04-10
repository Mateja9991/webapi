const { initEnvironment } = require("../../utils/initializeEnvironment");
const mongoose = require("mongoose");
initEnvironment();

const {
  MONGO_USERNAME,
  MONGO_URL,
  MONGO_PASSWORD,
  MONGO_SOURCE,
  MONGO_DB,
} = process.env;

const MONGO_DB_URL = `mongodb://${MONGO_URL}:27017/${MONGO_DB}`;

mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    authSource: MONGO_SOURCE,
  })
  .then(() => {
    console.log("Connected");
  });

module.exports = mongoose;
