const cookieController = {};

//cookies allow website to maintain state (can user them for user credentials, or for saving data on artworks?)

cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('ArtsyFarty session', 'true')
  res.cookie('secret', Math.floor(Math.random() * 100))
  next() 
}
cookieController.setSSIDCookie = (req, res, next) => {
  //http only means that client side js cannot access my cookie
  res.cookie('ssid', res.locals.userID, {HttpOnly: true});
  next();
}

module.exports = cookieController;