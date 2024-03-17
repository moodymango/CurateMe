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
const generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
tokenController.assignToken = async (req, res, next) => {
  //pull user object from res.locals
  const user = res.locals.userID;
  const accessToken = generateAccessToken(user);
  res
    .status(200)
    .cookie("token", accessToken, { httpOnly: true })
    .json(user.user_name);
};

tokenController.authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (token == null) {
    throw new tokenControllerError(401, "Token is required");
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    throw new tokenControllerError(403, "Please login first");
  }
};

module.exports = tokenController;
