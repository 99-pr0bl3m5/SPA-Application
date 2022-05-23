const tokenModel = require(".././model/tokenModel");

module.exports = async (req, res, next) => {
  const token = await tokenModel.findOne({ tokenSting: req.headers.token });
  if (token === null) {
    res.status(401).send({ resMessage: "unauthorized" });
  } else {
    req.body.userId = token.userId;
    try {
      next();
    } catch {
      res.status(400).send({ resMessage: "bad request !" });
    }
  }
};
