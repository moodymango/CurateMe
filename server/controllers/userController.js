//require in userModel from models folder here
//maybe bcrypy too?
const userController = {};
//middleware to create user
userController.createUser = (req, res, next) => {
  // write code here
  console.log('req.body --> ', req.body);
  //will get user, pass, and users email from the req body
  const { username, password, email, firstName, lastName} = req.body;
    
//   User.create({username, password, email}, (err, user) =>{
//     if(err) {
//       return res.render('../client/signup');
//     } else{
//       res.locals.user = user; 
//       return next()
//     }
//   })
}
//middleware for login to verify user 
userController.verifyUser = (req, res, next) => {
//receiving username and pass from the req body
  const {username, password} = req.body;
  //need to define userModel
  // User.findOne({username: username, password: password})
  //     .then(result => {
  //       if (result.length === 0) res.redirect('/signup');
  //       else return next();
  //       console.log('result -->', result);
  //     })
  //     .catch(err => console.log(err));
}

module.exportsU