const mongoose = require("mongoose");
const { config } = require("../config/config.js");

mongoose.connect(
  `mongodb://${config.dataBaseLocation}:${config.portNumber}/${config.dataBaseName}`,
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDb connected successfully");
    } else {
      console.log("Error in Db connection" + err);
    }
  }
);
