const tokenModel = require(".././model/tokenModel");

module.exports = async (req, res, next) => {
  const token = await tokenModel.findOne({ tokenSting: req.headers.token });
  if (token === null) {
    res.status(401).send({ resMessage: "unauthorized" });
  }
  req.body.userId = token.userId;
  // console.log(token);
  next();
};
