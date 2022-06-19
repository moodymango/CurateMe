//this controller will serve as my schema for artworks
//require in artworkModel schemas
const Artwork = require('../models/artworkModel');
//WILL COME BACK TO THIS AFTER I FINISH FAVORITES AND COLLECTION
const artworkController = {};
//artworks are saved and updated in the database in order to be referenced in collections and favorites
//so we need to store these works somehow
artworkController.saveArtwork = async (req, res, next) => {
  //in this case, user will be looking at the rendered artworks with all info available
  //this middleware is triggered when the user clicks add to favorites OR add to collection
  //NOTES FOR FRONTEND
  //so frontend makes a call to www.localhost:/5050/search
  //BUT front end
  //receives json data from my searchartworks.getArtwork info middle ware!
//https://stackoverflow.com/questions/65729289/the-relationship-between-front-end-and-middleware

  const {title, artist_title, date_display, imageUrl, impression } = req.body
  await Artwork.create({title, imageUrl, artist: artist_title, date: date_display, impression})
    .then(artworkDoc => {
      //send 'added to fav/collection' back to client
      console.log('sucessfully created an artwork')
      next();
    })
    .catch(err => {
      next({
        log: 'error in creating reference of this artwork',
        message: {err: err}
      })
    })
}

//middleware for user to add their impression to artworks
artworkController.updateImpression = async (req, res, next) =>{
  //frontend will send the title and the artist so that we can find and update the artwork
  const {title, artist, impression} = req.body;
  await Artwork.findOneAndUpdate({title, artist}, {impression}, {new: true})
    .then(updatedRecord => {
      //what if we don't find the record
      if(!updatedRecord) next({log: 'could not locate this artwork'})
      //send back 'saved' to client
      console.log('record has been updated')
      next()
    })
    .catch(err => {
      next({
        log: 'error in finding and updating the specific artwork'
      })
    })
}

//removes artwork from collection or favorites 

module.exports = artworkController;