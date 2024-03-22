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
  //call stored procedure to create user and user favorite collection
  const createUserandFavoritesQuery =
    "CALL create_user_transaction($1, $2, $3, $4);";
  const params = [caseUsername, hashedPass, caseFirstName, caseLastName];
  const client = await db.pool.connect();
  try {
    await client.query(createUserandFavoritesQuery, params).then((data) => {
      res.status(200).json("User account created!");
    });
    client.release();
  } catch (err) {
    client.release();
    console.log("db error looks like ", err);
    next({
      log: `${err}`,
    });
  }
};

//middleware for login to verify user
userController.verifyUser = async (req, res, next) => {
  let { username, password } = req.body;
  //case sensitivity
  caseUsername = username.toLowerCase();
  casePassword = password.toLowerCase();
  const findUserQuery = `SELECT * FROM locate_user_by_username($1)`;
  const params = [caseUsername];

  try {
    await db.query(findUserQuery, params).then(async (data) => {
      if (!data.rowCount) {
        throw new userControllerError(
          401,
          `User not found by that username: ${username}`
        );
      } else {
        const userPass = data.rows[0].user_password;
        //authenticate user
        const compared = await bcrypt.compare(casePassword, userPass);
        if (compared) {
          const id = data.rows[0].user_id;
          const user_name = data.rows[0].user_first_name;
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
      log: `${err}` || "Error when retrieving user by username and password",
      status: err.status,
      message: err.message,
    });
  }
};

//stretch features:
//ADD FUNCTIONALITY TO UPDATE USER
//ADD FUNCTIONALITY TO DELETE USER

module.exports = userController;
