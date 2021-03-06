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

app.post("/signup", async (req, res) => {
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

    let newUser = new userModel({
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

app.post("/signin", async (req, res) => {
  try {
    let resStatus = 200;
    let resMessage = "Success";
    let reqBody = req.body;

    let _userName = reqBody.username;
    let _password = reqBody.password;

    let user = await userModel.findOne({
      username: _userName,
      password: _password,
    });

    if (user == null) {
      resStatus = 400;
      resMessage = "user not found";
      res.status(resStatus).send({ resMessage });
    } else {
      await tokenModel.deleteMany({ userId: user._id });
      let newToken = new tokenModel({
        tokenSting: tokenGen(),
        userId: user._id,
      });
      await newToken.save();

      resMessage = newToken.tokenSting;
      let name = user.name;

      res.status(resStatus).send({ resMessage, name });
    }
  } catch {
    res.status(400).send({ resMessage: "BAD REQUEST" });
  }
});

app.post("/signout", authentication, async (req, res) => {
  const userId = req.body.userId;
  try {
    await tokenModel.deleteMany({ userId });

    const newToken = new tokenModel({ tokenSting: tokenGen(), userId });

    await newToken.save();

    res.status(200).send({ resMessage: "SUCCESS" });
  } catch {
    res.status(400).send({ resMessage: "BAD REQUEST" });
  }
});

app.post("/pokemon", authentication, async (req, res) => {
  const pokemonName = req.body.name;
  const userId = req.body.userId;
  try {
    const targetPokemon = await pokemonModel.findOne({
      ownerId: userId,
      name: pokemonName,
    });
    if (!targetPokemon) {
      const newPokemon = new pokemonModel({
        ownerId: userId,
        name: pokemonName,
        count: 1,
      });
      await newPokemon.save();
    } else {
      await pokemonModel.findOneAndUpdate(
        {
          ownerId: userId,
          name: pokemonName,
        },
        {
          count: targetPokemon["count"] + 1,
        }
      );
    }

    res.status(200).send({ resMessage: "SUCCESS" });
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
