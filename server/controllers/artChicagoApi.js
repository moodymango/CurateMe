//make requests via axios to see what kind of data we are working with for this app.
//REFACTOR MAYBE USING AXIOS?
// const axios = require('axios')
const fetch = require('node-fetch');
//for example of fetch, look at unit 9
const artChicagoApiController = {}

//helper function to get individual artwork information(used in almost every middleware)
artChicagoApiController.getArtworkInfo =  (req, res, next) => {
//each middleware will give an array of artwork ids that will be persisted res.locals
//this middleware iterates through the artwork ids received from the previous middleware to request specific information about the pieces.
  console.log('getting info on artworks')
  res.locals.artworkInfo = [];
  // console.log('sample id is =>', res.locals.artworks[0])
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
          console.log('finished grabbing')
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
      //if the artworks array is empty, need to send back an error message
      if(res.locals.artworks.length === 0){
        res.send(400).send('Sorry, could not find any artworks with this term')
      }
      console.log('artworks are =>', res.locals.artworks)
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
  const {searchReq} = req.body;
  //what do I want to serve to the front-end? ultimately json data containing the artwork image, title, 
  await fetch(`https://api.artic.edu/api/v1/artists/search?q=${searchReq}[is_artist]=true&fields=artwork_ids,title`)
    .then(data => data.json())
    .then(artistObj => {
      res.locals.artworks = [];
      //artist I am looking for is typically the first el
      const artist = artistObj.data[0];
      //get first 10 pieces by this artist
      for (let i = 0; i <= 10; i++) {
        res.locals.artworks.push(artist.artwork_ids[i]);
      }
      console.log('artists works are =>', res.locals.artworks)
      next();
    })
    .catch(err => {
      next({
        log: 'artChicagController had error',
        message: {err: err}
      })
    })
}


module.exports = artChicagoApiController;