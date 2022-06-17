//make requests via axios to see what kind of data we are working with for this app.
//REFACTOR MAYBE USING AXIOS?
// const axios = require('axios')
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
//for example of fetch, look at unit 9
const artChicagoApiController = {}

//helper function to get individual artwork information(used in almost every middleware)
artChicagoApiController.getArtworkInfo =  (req, res, next) => {
//each middleware will give an array of artwork ids that will be persisted res.locals
//this middleware iterates through the artwork ids received from the previous middleware to request specific information about the pieces.
  console.log('getting info on artworks')
  res.locals.artworkInfo = [];
  res.locals.artworks.forEach(async (artworkId, idx) =>{
    await fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?fields=image_id,title,artist_title,medium_display,theme_titles,date_display,classification_titles,artwork_type_title`)
      .then(data => data.json())
      .then(artworkData => {
        //need to construct image url so I can save in DB and display on client side later on.
        const imageURLApi = `${artworkData.config.iiif_url}/${artworkData.data.image_id}/full/843,/0/default.jpg`
        // //save url as a new prop on my response obj
        artworkData.data.imageURL = imageURLApi
        // //push each response onto res.locals
        //if we've reached the end of our artworks id array, send populated res.locals.artworkInfo array to final middleware else, keep pushing
        if(idx === res.locals.artworks.length - 1){
          return next()
        } else{
          res.locals.artworkInfo.push(artworkData.data)
        }
      })
      .catch(err => {
        next({
          log: 'Error when retrieving individual artwork data in getArtworkInfo',
          message: {err: err}
        })
      })
  })
}

artChicagoApiController.getArtworks = async (req, res, next) => {
  console.log('grabbing artworks by search term')
  //WORKING VERSION
  //get the search term from the res.body
  //now need a way to save the page number and persist that data for pagination (so the user can load more images upon request)
  const {searchReq, page} = req.body;
  //what do I want to serve to the front-end? ultimately json data containing the artwork image, title, 
  await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchReq}&limit=10&page=${page}`)
    .then(data => data.json())
    .then(dataObj => {
      //instantiate empty arr on artworks prop of res.locals
      res.locals.artworks = [];
      //data found in dataObj.data 
      //must iterate through this array of objs in order to get individual obj id from each one
      dataObj.data.forEach((record) =>{
        //push each object id into res.locals.artworks
        res.locals.artworks.push(record.id)
      })
      next()
    })
    .catch(err => {
      next({
        log: 'Error when retrieving collection of artworks data in getArtworks',
        message: {err: err}
      })
    })
}
//middleware to get artist, ideally returns all the artworks from that individual artist
artChicagoApiController.getArtist = async (req, res, next) => {
  const {searchReq, page} = req.body;
  //what do I want to serve to the front-end? ultimately json data containing the artwork image, title, 
  await fetch(`https://api.artic.edu/api/v1/artists/search?q=${searchReq}&limit=15&page=${page}`)
    .then(data => data.json())
    .then(artistObj => {
      console.log('artistObj is=> ', artistObj.data)
      next();
    })
    .catch(err => {
      next({
        log: 'artChicagController had error',
        message: {err: err}
      })
    })
}

// //what do I want to serve to the front-end? ultimately json data containing the artwork image, title, 
// await fetch('https://api.artic.edu/api/v1/artworks/search?q=africanamerican&limit=15&page=2')
//   .then(data => data.json())
//   .then(dataObj => {
//     //now need a way to save the page number and persist that data for pagination (so the user can load more images upon request)
//     console.log('current page is', dataObj.pagination);
//     res.locals.paginationPage = dataObj.pagination.current_page
//     //expecting to see an array of objects
//     dataObj.data.forEach( async (artWork) => {
//       //maybe do a nested fetch request for every piece of artwork so that we may add it do the database in order to get the artwork info
//       const {id} = artWork;
//       //want artist name, related subject themes, thumbnail(for images), category
//       //date display for a description of the time this was made, and the time of creation
//       await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=image_id,title,artist_title,medium_display,theme_titles,date_display,classification_titles,artwork_type_title`)
//         .then(data => data.json())
//         //think I may need to build out some 
//         .then(artworkData => {
//           console.log({
//             artist: artworkData.data.artist_title,
//             title: artworkData.data.title,
//             themes: artworkData.data.theme_titles,
//             type: artworkData.data.artwork_type_title
//           })
//           //THE FOLLOWING DATA IS ACCESSED VIA artworkData.data => Title, date_display, medium, artist name, and most importantly, theme titles!!
//           //need to construct image url so I can save in DB and display on client side later on.
//           const imageURLApi = `${artworkData.config.iiif_url}/${artworkData.data.image_id}/full/843,/0/default.jpg`
//         })
//         .catch(err => {
//           next({
//             log: 'Error when retrieving individual artwork data in getBlackArt',
//             message: {err: err}
//           })
//         })
//       console.log(artWork.title)
//     })
//     next();
//   })
//   .catch(err => {
//     next({
//       log: 'artChicagController had error',
//       message: {err: err}
//     })
//   })

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