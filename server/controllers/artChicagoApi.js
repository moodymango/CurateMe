//make requests via axios to see what kind of data we are working with for this app.
//REFACTOR MAYBE USING AXIOS?
// const axios = require('axios')
const fetch = require('node-fetch');
//for example of fetch, look at unit 9
const artChicagoApiController = {}

artChicagoApiController.getBlackArtworks = async (req, res, next) => {
  console.log('grabbing artworks')
  //WORKING VERSION
  //what do I want to serve to the front-end? ultimately json data containing the artwork image, title, 
  await fetch('https://api.artic.edu/api/v1/artworks/search?q=africanamerican')
    .then(data => data.json())
    .then(dataObj => {
    //expecting to see an array of objects
      dataObj.data.forEach( async (artWork) => {
        //maybe do a nested fetch request for every piece of artwork so that we may add it do the database in order to get the artwork info
        const {id} = artWork;
        //want artist name, related subject themes, thumbnail(for images), category
        //date display for a description of the time this was made, and the time of creation
        await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=image_id,title,artist_title,medium_display,theme_titles,date_display,classification_titles`)
          .then(data => data.json())
          .then(artworkData => {
            //THE FOLLOWING DATA IS ACCESSED VIA artworkData.data => Title, date_display, medium, artist name, and most importantly, theme titles!!
            //need to construct image url so I can save in DB and display on client side later on.
            const imageURLApi = `${artworkData.config.iiif_url}/${artworkData.data.image_id}/full/843,/0/default.jpg`
            
          })
          .catch(err => {
            next({
              log: 'Error when retrieving individual artwork data in getBlackArt',
              message: {err: err}
            })
          })
        console.log(artWork.title)
      })
      next();
    })
    .catch(err => {
      next({
        log: 'artChicagController had error',
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

// artChicagoApiController.getArtworkInfo = async (req, res, next) => {
//   //when user clicks on the artwork image, frontend will capture object ID
//   //need objectID to send fetch request to 
// }
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