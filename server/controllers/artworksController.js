const db = require("../db/db.js");
const artworkController = {};
// @desc        Add a Transaction
// @route       CREATE /:user/collections/favorites
artworkController.addToFavoritesTransaction = async (req, res, next) => {
  const { user } = req.params;
  const { title, artist_title, image_url, date_display } = req.body;
  //insert new artwork into the db
  const insertArtworkQuery = `INSERT INTO artworks(title, artist_title, date_display, image_url) VALUES($1, $2, $3, $4) RETURNING id;`;
  const insertArtworkParams = [title, artist_title, date_display, image_url];
  //find user favorites collection by id
  const collection_title = "favorites";
  const findUserFavoritesQuery = `SELECT id FROM collections WHERE user_id=$1 AND title=$2;`;
  const findFavortiesParams = [user, collection_title];
  //insert artwork and collection id into collection_order table
  const insertArtworkAndCollectionID = `INSERT INTO collection_order()`;

  try {
  } catch (err) {
    await db.query("ROLLBACK");
    next({
      log: "Error when retrieving user by username and password",
      status: err.status,
      message: err.message,
    });
  }
};

// //FOR POST
// artworkController.addToCollection = async (req, res, next) => {
//   //in this case, user will be looking at the rendered artworks with all info available
//   //this middleware is triggered when the user clicks add to favorites OR add to collection
//   //NOTES FOR FRONTEND
//   //so frontend makes a call to www.localhost:/5050/search
//   //receives json data from my searchartworks.getArtwork info middle ware!
// //https://stackoverflow.com/questions/65729289/the-relationship-between-front-end-and-middleware
//   console.log('adding artwork to collection');
//   const {username} = req.params
//   const collection = req.params.title;
//   const {title, artist_title, date_display, image} = res.locals.artInfo

//   const newArtwork = {
//     title,
//     artist: artist_title,
//     date: date_display,
//     image: String(image)
//   }
//   //like collection, must find user and collection docs
//   //find matching user with matching collection title in collection array, and push artwork into the array
//   await User.findOne({username})
//     .then(async user => {
//       //send 'added to fav/collection' back to client
//       //should give me the collection we want to alter
//       const collectionDoc = user.collectionArr.filter((doc) =>{
//         return doc.title === collection
//       }).pop();
//       //collection doc represents collection
//       //now need to access collectionDoc.artworks
//       collectionDoc.artworks.push(newArtwork);
//       //save user
//       await user.save()
//         .then(savedUser => {
//           const artworkArr = savedUser.collectionArr
//           //now must filter AGAIN
//           const newCollection = artworkArr.filter((doc) =>{
//             return doc.title === collection
//           }).pop();
//           res.locals.updatedCollection = newCollection;
//         })
//         .catch(err => {
//           next ({
//             log: 'error in saving the updated collection',
//             message: {err}
//           })
//         })
//       next();
//     })
//     .catch(err => {
//       next({
//         log: 'error in creating reference of this artwork',
//         message: {err: err}
//       })
//     })
// }

// //FOR GET
// artworkController.getArtworks = async (req, res, next) => {
//   const {username, title} = req.params;
//   await User.findOne({username})
//     .then(async user => {
//       //send 'added to fav/collection' back to client
//       //should give me the collection we want to alter
//       const collectionDoc = user.collectionArr.filter((doc) =>{
//         return doc.title === title
//       }).pop();
//       console.log('collection is =>', collectionDoc)
//       //collection doc represents collection
//       //now need to access collectionDoc.artworks
//       res.locals.artworks = collectionDoc.artworks;
//       next();
//     })
//     .catch(err => {
//       next({
//         log: 'error in creating reference of this artwork',
//         message: {err: err}
//       })
//     })
// }

// //FOR PATCH
// //middleware for user to add their impression to artworks
// artworkController.updateImpression = async (req, res, next) =>{
//   //frontend will send the title and the artist so that we can find and update the artwork
//   const {title, artist, impression} = req.body;
//   await Artwork.findOneAndUpdate({title, artist}, {impression}, {new: true})
//     .then(updatedRecord => {
//       //what if we don't find the record
//       if(!updatedRecord) next({log: 'could not locate this artwork'})
//       //send back 'saved' to client
//       console.log('record has been updated')
//       next()
//     })
//     .catch(err => {
//       next({
//         log: 'error in finding and updating the specific artwork'
//       })
//     })
// }

// //FOR DELETE
// artworkController.deleteArtwork = async (req, res, next) =>{
//   console.log('deleting from collection');
//   const {username, title} = req.params;
//   //need to have artwork label to identify which piece to remove
//   const {artworkLabel} = req.body;
//   //find user
//   await User.findOne({username})
//     .then(async user => {
//       //find collection to delete from
//       const collectionDoc = user.collectionArr.filter((doc) =>{
//         return doc.title === title
//       }).pop();
//       //now iterate filter through collectionDoc.artworks, receiving all works BUT the artwork title matching the label
//       const artworks = collectionDoc.artworks;
//       const remained = artworks.filter((doc) =>{
//         return doc.title !== artworkLabel
//       })
//       console.log('updated artworks arr is', remained)
//       //reassign updated array as new artworks array
//       collectionDoc.artworks = remained;
//       //now save user
//       await user.save()
//         .then(savedUser => {
//           const artworkArr = savedUser.collectionArr
//           const newCollection = artworkArr.filter((doc) =>{
//             return doc.title === title
//           }).pop();

//           res.locals.updatedCollection = newCollection
//           console.log('pieces have been deleted from collection',res.locals.updatedCollection)
//         })
//       next();
//     })
//     .catch(err => {
//       next({
//         message: {err: 'error in error in finding user'}
//       })
//     })
// }

// module.exports = artworkController;
