const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyPraser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const endPoint = require("./router");
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => {
    console.log(`Can't Connect To Database ${err}`);
    process.exit(0);
  });

var whitelist = ['http://spa.local']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(bodyPraser.json());
app.use(cors(corsOptions));
app.use("/api", endPoint);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
