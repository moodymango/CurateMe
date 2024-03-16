require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenController = {};

//custom error for error handling
class tokenControllerError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.name = "tokenControllerError";
  }
}

tokenController.assignToken = async (req, res, next) => {
  //pull user object from res.locals
  const user = res.locals.userID;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({ accessToken: accessToken });
};

tokenController.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    throw new tokenControllerError(401, "Token is required");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new tokenControllerError(403, "Token is no longer valid");
    }
    req.user = user;
    next();
  });
};

module.exports = tokenController;
