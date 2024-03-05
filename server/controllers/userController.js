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
  //case sensitivity
  //reassign all values from the req.body to lowercase values before storing in db
  caseUsername = username.toLowerCase();
  casePassword = password.toLowerCase();
  caseFirstName = firstName.toLowerCase();
  caseLastName = lastName.toLowerCase();
  //encrypt password prior to saving in db
  const hashedPass = await bcrypt.hash(casePassword, saltRounds);

  const text = `INSERT INTO users(first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING id;`;
  const params = [caseFirstName, caseLastName, caseUsername, casePassword];
  try {
    await db.query(text, params).then((data) => {
      res.locals.userID = data.rows[0];
      return res.sendStatus(200).send(res.locals.userId);
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
  //receiving username and pass from the req body
  console.log("logging in");
  let { username, password } = req.body;
  //case sensitivity
  //reassign all values from the req.body to lowercase values
  caseUsername = username.toLowerCase();
  casePassword = password.toLowerCase();
  //need to check password from the hashed one saved in the db
  //first find user by username
  const text = `SELECT id, first_name, password FROM users WHERE username=$1`;
  const params = [caseUsername];

  try {
    console.log("finding user by username");
    await db.query(text, params).then(async (data) => {
      //if we cannot find the user, send back an error stating user not found by that username
      if (!data.rows.length) {
        throw new userControllerError(
          401,
          `User not found by that username: ${username}`
        );
      } else {
        //save pass from user
        const userPass = data.rows[0].password;
        //check password from db with hashed ps
        const compared = await bcrypt.compare(casePassword, userPass);
        //if compared is truthy, log the user in
        if (compared) {
          res.locals.userId = data.rows[0].id;
          return res.sendStatus(200).send(res.locals.userId);
        } else {
          //throw error stating that user has given the wrong password
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

// //middleware for login to verify user
// userController.verifyUser = async (req, res, next) => {
//   //receiving username and pass from the req body
//   console.log("logging in");
//   const { username, password } = req.body;
//   //need to check password from the hashed one saved in the db
//   //first find user only by userName
//   await User.findOne({ username })
//     .then(async (result) => {
//       //if we cannot find that user, send back an error
//       if (!result) next({ message: { err: "user does not exist" } });
//       //now need to compare the hashed password with the one sent by the user
//       //MUST AWAIT RESULTS OF BCRYPT COMPARE IN ORDER TO MOVE ON!
//       //result doc should have a password property
//       const compared = await bcrypt.compare(password, result.password);
//       if (compared) {
//         //saveUser id onto res.locals for set SSID middleware
//         res.locals.userId = result._id;
//         console.log("userId is =>", res.locals.userId);
//         //CAN I DO THIS ON THE FRONTEND? - /will most likely redirect user to their own dashboard
//         return res.status(200).send(res.locals.userId);
//         // return res.redirect(`/:${username}`);
//       } else {
//         console.log("incorrect pass");
//         return res.status(401).send("Incorrct password");
//       }
//     })
//     .catch((err) =>
//       next({ log: "error when logging in user", message: { err: err } })
//     );
// };

//stretch features:
//ADD FUNCTIONALITY TO UPDATE USER

//ADD FUNCTIONALITY TO DELETE USER

module.exports = userController;
