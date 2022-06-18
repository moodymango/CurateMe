const express = require('express');
//REQUIRE IN ANY NECESSARY NATIVE MODULES
const path = require('path');

//require in all my routers
const artRouter = require('./routes/searchArtworks');
const userController = require('./controllers/userController');

//start our express server
const app = express();
//establish a port
const port = process.env.PORT || 3000;

//parse all req body info
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//remember to define all route handlers from most specific to least

//this is to serve to the homepage, need to add some functionality where if the user loads more and clicks a button, more artworks will populate

//route to handle user sign-up/login
app.get('/signup', (req, res) => {
  // res.sendFile(path.resolve(__dirname, HTML FOR SIGN UP));
});
app.get('/login', (req, res) => {
  // res.sendFile(path.resolve(__dirname, HTML FOR LOGIN));
})
app.post('/signup', userController.createUser, (req, res) => {
  // what should happen here on successful sign up?
  // res.redirect(200, 'HTML FOR CONGRATS, NOW LOG IN')

});


/**
* login
*/
app.post('/login', userController.verifyUser, (req, res) => {
  // what should happen here on successful log in?
  //redirect to the user's personal dashboard
  res.redirect(200, 'DASHBOARD');
});

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
