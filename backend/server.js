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

app.use(bodyPraser.json());
app.use(cors());
app.use("/api", endPoint);

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

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
