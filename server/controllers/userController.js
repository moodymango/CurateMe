//require in userModel from models folder here
const User = require('../models/userModel');
//must require bcrypt in order to hash password
const bcrypt = require('bcrypt');

const userController = {};
//middleware to create user

//ENCRYPTION OF PASSWORD happens in create user
const saltRounds = 10;
userController.createUser = async (req, res, next) => {
  // write code here
  console.log('req.body --> ', req.body);
  //will get user, pass, and users email from the req body
  const { username, password, email, firstName, lastName} = req.body;
  //hash password before storing in the database

  const hashedPass =  await bcrypt.hash(password, saltRounds);
  await User.create({username, password: hashedPass, email, firstName, lastName})
    .then(newUser => {
      //thanks for logging in chum
      //send back a response to client, your account has been created!
      console.log('new user is=>', newUser);
      next()
    })
    .catch(err => {
      next({
        log: 'error in creating new user in userController',
        message: {err: err}
      })
    })
}
//middleware for login to verify user 
userController.verifyUser = async (req, res, next) => {
//receiving username and pass from the req body
  const {username, password} = req.body;
  //need to check password from the hashed one saved in the db
  //first find user only by userName
  await User.findOne({username})
    .then(result => {
      //now need to compare the hashed password with the one sent by the user
      //result doc should have a password property
      const compared = (bcrypt.compare(password, result.password));
      if(compared){
        console.log('correct pass, youre logged in')
      } else {
        console.log('incorrect password')
      }
      next()
      console.log('result -->', result);
    })
    .catch(err => console.log(err));
}
//stretch features:
//ADD FUNCTIONALITY TO UPDATE USER

//ADD FUNCTIONALITY TO DELETE USER

module.exports = userController;