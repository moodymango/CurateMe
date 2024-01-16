//require in userModel from models folder here
//mongoose
const User = require("../models/userModel");
const db = require("../db/db.js");
const bcrypt = require("bcrypt");
const userController = {};
//custom errors for error handling
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
  const { username, password, firstName, lastName } = req.body;
  //encrypt password prior to saving in db
  const hashedPass = await bcrypt.hash(password, saltRounds);
  const text =
    "INSERT INTO user(first_name, last_name, username, password) VALUES($1, $2, $3, $4)";
  const params = [
    req.body.firstName,
    req.body.lastName,
    req.body.username,
    hashedPass,
  ];
  try {
    const { rows } = await db.query(text, params);
    console.log("rows look like", rows);
  } catch (err) {
    next({
      log: "Error in creating new user in userController.js",
      message: "Error in creating new user",
      status: 500,
    });
  }
};
// userController.createUser = async (req, res, next) => {
//   // write code here
//   console.log("creating user...");
//   //will get user, pass, and users email from the req body
//   const { username, password, email, firstName, lastName } = req.body;
//   //hash password before storing in the database
//   const hashedPass = await bcrypt.hash(password, saltRounds);
//   await User.create({
//     username,
//     password: hashedPass,
//     email,
//     firstName,
//     lastName,
//   })
//     .then((newUser) => {
//       //persist userID to setSSID cookie middleware
//       res.locals.userId = newUser._id;
//       // console.log('user id is =>', res.locals.userId)
//       console.log("new user is =>", newUser);
//       //CAN I DO THIS ON THE FRONTEND? - /will most likely redirect user to their own dashboard
//       return res.status(200).send(res.locals.userId);
//       // return res.redirect(`/:${username}`);
//     })
//     .catch((err) => {
//       next({
//         log: "error in creating new user in userController",
//         message: { err: err },
//       });
//     });
// };
//middleware for login to verify user
userController.verifyUser = async (req, res, next) => {
  //receiving username and pass from the req body
  console.log("logging in");
  const { username, password } = req.body;
  //need to check password from the hashed one saved in the db
  //first find user only by userName
  await User.findOne({ username })
    .then(async (result) => {
      //if we cannot find that user, send back an error
      if (!result) next({ message: { err: "user does not exist" } });
      //now need to compare the hashed password with the one sent by the user
      //MUST AWAIT RESULTS OF BCRYPT COMPARE IN ORDER TO MOVE ON!
      //result doc should have a password property
      const compared = await bcrypt.compare(password, result.password);
      if (compared) {
        //saveUser id onto res.locals for set SSID middleware
        res.locals.userId = result._id;
        console.log("userId is =>", res.locals.userId);
        //CAN I DO THIS ON THE FRONTEND? - /will most likely redirect user to their own dashboard
        return res.status(200).send(res.locals.userId);
        // return res.redirect(`/:${username}`);
      } else {
        console.log("incorrect pass");
        return res.status(401).send("Incorrct password");
      }
    })
    .catch((err) =>
      next({ log: "error when logging in user", message: { err: err } })
    );
};
//stretch features:
//ADD FUNCTIONALITY TO UPDATE USER

//ADD FUNCTIONALITY TO DELETE USER

module.exports = userController;
