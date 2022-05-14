const express = require("express");
const app = express.Router();
const authentication = require("./middleware/middleWare");
const userModel = require("./model/userModel");
const tokenModel = require("./model/tokenModel");

// TODO : signIn , logIn , การสร้าง token , array ชื่อ pokemon

const rand = function () {
  return Math.random().toString(36).substr(2);
};

const tokenGen = function () {
  return rand() + rand();
};

app.post("/signin", async (req, res) => {
  let resStatus = 200;
  let resMessage = "Success";

  let _name = req.body.name || "";
  let _userName = req.body.username || "";
  let _password = req.body.password || "";

  if (_name === "" || _userName === "" || _password === "") {
    resStatus = 400;
    resMessage = "bad request";
    res.status(resStatus).send({ resMessage });
  }

  let newUser = userModel({
    name: _name,
    userName: _userName,
    password: _password,
  });

  await newUser.save();

  res.status(resStatus).send({ resMessage });
});

app.post("/login", async (req, res) => {
  let resStatus = 200;
  let resMessage = "Success";
  let reqBody = req.body;

  let _userName = reqBody.username;
  let _password = reqBody.password;

  let user = await userModel.findOne({ name: _userName, password: _password });

  if (user == null) {
    resStatus = 400;
    resMessage = "user not found";
    res.status(resStatus).send({ resMessage });
  }

  await tokenModel.deleteMany({ userId: user._id });
  let newToken = tokenModel({ tokenSting: tokenGen(), userId: user._id });
  await newToken.save();

  resMessage = newToken.tokenSting;

  res.status(resStatus).send({ resMessage });
});

app.post("/pokemon", authentication, (req, res) => {
  let resStatus = 200;
  let resMessage = "Success";

  res.status(resStatus).send({ resMessage });
});

app.get("/pokemon", authentication, (req, res) => {
  let resStatus = 200;
  let resMessage = "Success";

  res.status(resStatus).send({ resMessage });
});

module.exports = app;
