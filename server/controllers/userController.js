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
      //redirect user to their dashboard
      return res.redirect(`/:${username}`);
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
  console.log('logging in')
  const {username, password} = req.body;
  //need to check password from the hashed one saved in the db
  //first find user only by userName
  await User.findOne({username})
    .then(async result => {
      //if we cannot find that user, send back an error
      if(!result) next({message: {err: 'user does not exist'}})
      //now need to compare the hashed password with the one sent by the user
      //MUST AWAIT RESULTS OF BCRYPT COMPARE IN ORDER TO MOVE ON!
      //result doc should have a password property
      const compared = await bcrypt.compare(password, result.password);
      if(compared){
        //will most likely redirect user to their own dashboard
        console.log('logged in')
        return res.redirect(`/:${username}`);
      } else {
        console.log('incorrect pass')
        next({
          message: {err: 'Incorrect password'}
        })
      }
      next()
    })
    .catch(err => next({log: 'error when logging in user', message: {err:err}}));
}
//stretch features:
//ADD FUNCTIONALITY TO UPDATE USER

//ADD FUNCTIONALITY TO DELETE USER

module.exports = userController;