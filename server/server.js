const express = require('express');
//REQUIRE IN ANY NECESSARY NATIVE MODULES
const path = require('path');

//require in all my routers
const artistRouter = require('../server/routes/artists');

//start our express server
const app = express();
//establish a port
const port = process.env.PORT || 3000;

//parse all req body info
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sign-up router
// app.get('/signup', (req, res) => {
//   //need to serve static html file to client
//   // res.status(200).sendFile(path.resolve(__dirname, 'filepath'))
// })
// app.post('/signup', (req, res) => {
//   //need to add middleware to create user, maybe set up cookies if we have time to authenticate?
// })
// //sign-in router
// app.post('/login', (req, res) => {
//   //add middleware to verify if the user exists in the database, maybe set a unique cookie, etc
// })


//remember to define all route handlers from most specific to least

//this is to serve to the homepage, need to add some functionality where if the user loads more and clicks a button, more artworks will populate
app.use('/search', artistRouter);





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
