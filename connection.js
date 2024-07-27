const mongoose = require("mongoose");

async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected..."));
}

module.exports = {
  connectMongoDb,
};
