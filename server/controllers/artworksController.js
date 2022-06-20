//this controller will serve as my schema for artworks
//require in artworkModel schemas
const Artwork = require('../models/artworkModel');
const User = require('../models/userModel');
const fetch = require('node-fetch');
//WILL COME BACK TO THIS AFTER I FINISH FAVORITES AND COLLECTION
const artworkController = {};
//artworks are saved and updated in the database in order to be referenced in collections and favorites
//so we need to store these works somehow
//GET INDIVIDUAL ARTWORK INFO

//POSTMAN TESTING:
//URL : http://localhost:5050/:username/collections/artworks
//title: Be Who You Areeeeee, For Your Priiiiiide, Don't Hiiiiide
// SAMPLE ARTOWRK ID => 193320
artworkController.artworkInfo = async (req, res, next) => {
  console.log('getting artwork info');
  //only getting info from one piece of art!
  //artwork id comes from  the frontend? either through params or uri, haven't decided.
  const {artworkId} = req.body;
  await fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?fields=image_id,title,artist_title,medium_display,theme_titles,date_display,classification_titles,artwork_type_title`)
    .then(data => data.json())
    .then(artworkData => {
    //need to construct image url so I can save in DB and display on client side later on.
      const imageURLApi = `${artworkData.config.iiif_url}/${artworkData.data.image_id}/full/843,/0/default.jpg`
      // //save url as a new prop on my response obj
      artworkData.data.image = imageURLApi
      //save returned data onto res.locals to persist to next middleware
      res.locals.artInfo = artworkData.data;
      // console.log('art info is =>', res.locals.artInfo)
      next()
    })
    .catch(err => {
      next({
        log: err,
        message: {err: 'Error when retrieving individual artwork data in artworkInfo in artworksController'}
      })
    })
}

// {
//   "artworkId" : "193320"
//  }

//FOR POST
artworkController.addToCollection = async (req, res, next) => {
  //in this case, user will be looking at the rendered artworks with all info available
  //this middleware is triggered when the user clicks add to favorites OR add to collection
  //NOTES FOR FRONTEND
  //so frontend makes a call to www.localhost:/5050/search
  //receives json data from my searchartworks.getArtwork info middle ware!
//https://stackoverflow.com/questions/65729289/the-relationship-between-front-end-and-middleware
  console.log('adding artwork to collection');
  const {username} = req.params
  const collection = req.params.title;
  const {title, artist_title, date_display, image} = res.locals.artInfo
  
  const newArtwork = {
    title,
    artist: artist_title,
    date: date_display,
    image: String(image)
  }
  //like collection, must find user and collection docs 
  //find matching user with matching collection title in collection array, and push artwork into the array
  await User.findOne({username})
    .then(async user => {
      //send 'added to fav/collection' back to client
      //should give me the collection we want to alter
      const collectionDoc = user.collectionArr.filter((doc) =>{
        return doc.title === collection
      }).pop();
      //collection doc represents collection
      //now need to access collectionDoc.artworks
      collectionDoc.artworks.push(newArtwork);
      //save user
      await user.save()
        .then(savedUser => {
          const artworkArr = savedUser.collectionArr
          //now must filter AGAIN
          const newCollection = artworkArr.filter((doc) =>{
            return doc.title === collection
          }).pop();
          res.locals.updatedCollection = newCollection;
        })
        .catch(err => {
          next ({
            log: 'error in saving the updated collection',
            message: {err}
          })
        })
      next();
    })
    .catch(err => {
      next({
        log: 'error in creating reference of this artwork',
        message: {err: err}
      })
    })
}

//FOR GET
artworkController.getArtworks = async (req, res, next) => {
  const {username, title} = req.params;
  await User.findOne({username})
    .then(async user => {
      //send 'added to fav/collection' back to client
      //should give me the collection we want to alter
      const collectionDoc = user.collectionArr.filter((doc) =>{
        return doc.title === title
      }).pop();
      console.log('collection is =>', collectionDoc)
      //collection doc represents collection
      //now need to access collectionDoc.artworks
      res.locals.artworks = collectionDoc.artworks;
      next();
    })
    .catch(err => {
      next({
        log: 'error in creating reference of this artwork',
        message: {err: err}
      })
    })
}

//FOR PATCH
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

//FOR DELETE
artworkController.deleteArtwork = async (req, res, next) =>{
  console.log('deleting from collection');
  const {username, title} = req.params;
  //need to have artwork label to identify which piece to remove
  const {artworkLabel} = req.body;
  //find user 
  await User.findOne({username})
    .then(async user => {
      //find collection to delete from
      const collectionDoc = user.collectionArr.filter((doc) =>{
        return doc.title === title
      }).pop();
      //now iterate filter through collectionDoc.artworks, receiving all works BUT the artwork title matching the label
      const artworks = collectionDoc.artworks;
      const remained = artworks.filter((doc) =>{
        return doc.title !== artworkLabel
      })
      console.log('updated artworks arr is', remained)
      //reassign updated array as new artworks array
      collectionDoc.artworks = remained;
      //now save user
      await user.save()
        .then(savedUser => {
          const artworkArr = savedUser.collectionArr
          const newCollection = artworkArr.filter((doc) =>{
            return doc.title === title
          }).pop();

          res.locals.updatedCollection = newCollection
          console.log('pieces have been deleted from collection',res.locals.updatedCollection)
        })
      next();
    })
    .catch(err => {
      next({
        message: {err: 'error in error in finding user'}
      })
    })
}

module.exports = artworkController;