const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyPraser = require("body-parser");
const mongoose = require("mongoose");
dotenv.config();
const endPoint = require("./router");
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(bodyPraser.json());
app.use("/api", endPoint);

mongoose.connect(DB_CONNECTION_STRING, () => {
  console.log("DB CONNECTED");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
