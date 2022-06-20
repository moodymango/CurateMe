//this controller will serve as my schema for artworks
//require in artworkModel schemas
const Artwork = require('../models/artworkModel');
const User = require('../models/userModel');
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
      artworkData.data.imageURL = imageURLApi
      //save returned data onto res.locals to persist to next middleware
      res.locals.artInfo = artworkData.data;
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

  console.log('user is and collection is  =>', {username, collection})
  const {title, artist_title, date_display, imageUrl, impression } = res.locals.artInfo
  const newArtwork = {
    title,
    artist: artist_title,
    date: date_display,
    imageUrl,
    impression
  }
  //like collection, must find user and collection docs 
  //find matching user with matching collection title in collection array, and push artwork into the array
  await User.findOneAndUpdate({username, 'collectionArr.title' : collection}, {$push: {'collectionArr.$.artworks': newArtwork}}, {new:true, upsert: true})
    .then(user => {
      //send 'added to fav/collection' back to client
      console.log('sucessfully created an artwork =>', user.collectionArr.artworks)
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
  res.locals.urlParams = title
  console.log(res.locals.urlParams);
  next();
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


module.exports = artworkController;