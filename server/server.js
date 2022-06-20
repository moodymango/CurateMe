//requiring in "dotenv" in order to save my connection 
require('dotenv').config();
const express = require('express');
//REQUIRE IN ANY NECESSARY NATIVE MODULES
const path = require('path');
const mongoose = require('mongoose');
//in order to read properties off the cookie obj in req.cookies?
const cookieParser = require('cookie-parser');
//require in all my routers
const artRouter = require('./routes/searchArtworks');
const usernamerRouter = require('./routes/usernameRouter');
const userController = require('./controllers/userController');
//cookie controllers
// const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');

//start our express server
const app = express();
//establish a port
const port = process.env.PORT || 3000;
//connection to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// { useNewUrlParser: true, useUnifiedTopology: true }
//this connects to our database
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

//parse all req body info
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//able to read cookies as object
app.use(cookieParser());

//remember to define all route handlers from most specific to least

//route to serve homepage

//route to handle user sign-up/login
// app.get('/signup',  (req, res) => {
//   // res.sendFile(path.resolve(__dirname, HTML FOR SIGN UP));
// });
// app.get('/login', (req, res) => {
//   // res.sendFile(path.resolve(__dirname, HTML FOR LOGIN));
// })

app.post('/signup', userController.createUser)
app.post('/login', userController.verifyUser)

//LOGIN WITH COOKIES, go back and work on if we have some time!
// app.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
//   return res.redirect('/dashboard');
// });
// // /**
// // * login
// // */
// app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
//   return res.redirect('/dashboard');
// });

//need to have a redirect for user dashboard (will just be the username) 
//here we will have router to handle favorites and collections
//source for postman testing
//https://community.postman.com/t/what-is-api-paths/21818/2
app.use('/:username', usernamerRouter);


//route for any searches for specific artworks
app.use('/search', artRouter);



//catch all route handler for any requests made to unknown routes
app.all('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {err: 'An unknown error occured'}
  }
  const errObj = Object.assign(defaultErr, err);
  res.status(errObj.status).send(errObj.message)
});

//make sure app is listening on some type of port
app.listen(port, () =>{
  console.log(`Server is listening on port ${port}`)
});
