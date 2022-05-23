const express = require("express");
const app = express.Router();
const authentication = require("./middleware/middleWare");
const userModel = require("./model/userModel");
const tokenModel = require("./model/tokenModel");
const pokemonModel = require("./model/pokemonDodel");
const { count } = require("./model/tokenModel");

// TODO : signIn , logIn , การสร้าง token , array ชื่อ pokemon

const rand = function () {
  return Math.random().toString(36).substr(2);
};

const tokenGen = function () {
  return rand() + rand();
};

app.post("/signin", async (req, res) => {
  try {
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
  } catch {
    res.status(400).send({ resMessage: "BAD REQUEST" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let resStatus = 200;
    let resMessage = "Success";
    let reqBody = req.body;

    let _userName = reqBody.username;
    let _password = reqBody.password;

    let user = await userModel.findOne({
      name: _userName,
      password: _password,
    });

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
  } catch {
    res.status(400).send({ resMessage: "BAD REQUEST" });
  }
});

app.post("/pokemon", authentication, async (req, res) => {
  try {
    let resStatus = 200;
    let resMessage = "Success";

    const curUser = await userModel.findOne({ _id: req.body.userId });

    const _name = req.body.name;

    // console.log(`name : ${_name} , id : ${req.body.userModel}`);

    let curPokemon = await pokemonModel.findOne({
      ownerId: req.body.userId,
      name: _name,
    });

    if (curPokemon == null) {
      console.log("CREATE NEW");
      curPokemon = new pokemonModel({
        ownerId: req.body.userId,
        name: _name,
        count: 1,
      });
      await curPokemon.save();
    } else {
      console.log("FOUND");
      await pokemonModel.findOneAndUpdate(
        {
          ownerId: req.body.userId,
          name: _name,
        },
        {
          count: curPokemon["count"] + 1,
        }
      );
    }

    // console.log(`cur user ${curUser}`);
    res.status(resStatus).send({ resMessage });
  } catch {
    res.status(400).send({ resMessage: "BAD REQUEST" });
  }
});

app.get("/pokemon", authentication, async (req, res) => {
  try {
    let resStatus = 200;
    let resMessage = "Success";

    resMessage = await pokemonModel.find(
      { ownerId: req.body.userId },
      { name: 1, count: 1, _id: 0 }
    );

    res.status(resStatus).send({ resMessage });
  } catch {
    res.status(400).send({ resMessage: "BAD REQUEST" });
  }
});

module.exports = app;
