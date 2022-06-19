const Session = require('../models/sessionModel');
const sessionController = {};
//check to see if logged in 
//this is mainly used for the /:username endpoints! IF we refactor it that way lmao
sessionController.isLoggedIn = (req, res, next) => {
  const { ssid: cookieId } = req.cookies;
  //if there is no session in from the ssid cookies, then redirect to login
  Session.findOne({ cookieId })
    .then(result =>{
      if(!result) {
        return res.redirect('/login')
      }
      //else user is logged in and we can return next
      next()
    })
    .catch(err => {
      next({
        log: 'error in isLoggedIn session controller',
        message: {err}
      })
    })
};

//start new session and save into db
sessionController.startSession = (req, res, next) => {
  Session.create({cookieId: res.locals.userID, createdAt: new Date()})
    .then(result => {
      console.log('session created =>', result)
    })
    .catch(err => {
      next({
        log: 'error in startSession in session Controller',
        message: {err}
      })
    })
}
module.exports = sessionController;