const express = require('express');
//REQUIRE IN ANY NECESSARY NATIVE MODULES
const path = require('path');

//require in all my routers
const artistRouter = require('../server/routes/artists');

//start our express server
const app = express();
//establish a port
const port = process.env.PORT || 3000;
//want to check if i ignored files
//parse all req body info
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//remember to define all route handlers from most specific to least
app.use('/blackArt', artistRouter);



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
