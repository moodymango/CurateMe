const db = require("../db/db.js");
const bcrypt = require("bcrypt");
const userController = {};
//custom error for error handling
class userControllerError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.name = "userControllerError";
  }
}
//middleware to create user
userController.createUser = async (req, res, next) => {
  const saltRounds = 10;
  let { username, password, firstName, lastName } = req.body;
  caseUsername = username.toLowerCase();
  casePassword = password.toLowerCase();
  caseFirstName = firstName.toLowerCase();
  caseLastName = lastName.toLowerCase();
  //encrypt password prior to saving in db
  const hashedPass = await bcrypt.hash(casePassword, saltRounds);

  const text = `INSERT INTO users(first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING id, first_name;`;
  const params = [caseFirstName, caseLastName, caseUsername, hashedPass];
  try {
    await db.query(text, params).then((data) => {
      res.locals.userID = data.rows[0];
      next();
    });
  } catch (err) {
    next({
      log: "Error when creating new user account",
      status: err.status,
      message: err.message,
    });
  }
};

//middleware for login to verify user
userController.verifyUser = async (req, res, next) => {
  let { username, password } = req.body;
  //case sensitivity
  caseUsername = username.toLowerCase();
  casePassword = password.toLowerCase();
  const text = `SELECT id, first_name, password FROM users WHERE username=$1`;
  const params = [caseUsername];
  try {
    await db.query(text, params).then(async (data) => {
      if (!data.rows.length) {
        throw new userControllerError(
          401,
          `User not found by that username: ${username}`
        );
      } else {
        const userPass = data.rows[0].password;
        //authenticate user
        const compared = await bcrypt.compare(casePassword, userPass);
        if (compared) {
          const id = data.rows[0].id;
          const user_name = data.rows[0].first_name;
          const user = { id, user_name };
          res.locals.userID = user;
          next();
        } else {
          throw new userControllerError(401, `Incorrect Password: ${password}`);
        }
      }
    });
  } catch (err) {
    next({
      log: "Error when retrieving user by username and password",
      status: err.status,
      message: err.message,
    });
  }
};

//stretch features:
//ADD FUNCTIONALITY TO UPDATE USER
//ADD FUNCTIONALITY TO DELETE USER

module.exports = userController;
