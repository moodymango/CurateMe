//make requests via axios to see what kind of data we are working with for this app.
//REFACTOR MAYBE USING AXIOS?
// const axios = require('axios')
const fetch = require('node-fetch');
//for example of fetch, look at unit 9
const artChicagoApiController = {}

artChicagoApiController.getBlackArtists = async (req, res, next) => {
  console.log('grabbing artworks')
  //WORKING VERSION
  await fetch('https://api.artic.edu/api/v1/artworks/search?q=africanamerican')
    .then(data => data.json())
    .then(dataObj => {
    //     //expecting to see an array of objects
      console.log('data is => ',dataObj)
      dataObj.data.forEach((artWork) => {
        //each artwork has an api link
        console.log(artWork.title)
      })
      next();
    })
    .catch(err => {
      next({
        log: 'metApiController had error',
        message: {err: err}
      })
    })

  //AXIOS ASYNC AWAIT, not working?
  // try {
  //   const dataObj =  await axios.get('https://api.artic.edu/api/v1/artworks/search?q=africanamerican');
  //   //expecting to see an array of objects
  //   dataObj.data.forEach((artWork) => {
  //     console.log(artWork.title)
  //   })
  //   return next();
  // }
  // catch (err) {
  //   next({
  //     log: 'metApiController had error',
  //     message: {err: 'something aint right'}
  //   })
  // }
}

//.GET 
// axios.get('https://api.artic.edu/api/v1/artworks/search?q=monet')
// //don't need to parse json data with axios
//   .then(dataObj => {
//     //expecting to see an array of objects
//     dataObj.data.forEach((artWork) => {
//       console.log(artWork.title)
//     })
//     next();
//   })
//   .catch(err => {
//     next({
//       log: 'metApiController had error',
//       message: {err: err}
//     })
//   })

module.exports = artChicagoApiController;