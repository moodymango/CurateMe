const db = require("../db/db.js");
const collectionsController = {};
//custom errors for error handling
class collectionsControllerError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.name = "collectionsController Error";
  }
}
//create favorite collection for individual user
collectionsController.createFavorites = async (req, res, next) => {
  const { id } = res.locals.userID;
  console.log("res.locals", id);

  const client = await db.pool.connect();

  const title = "favorites";
  const description = `Favorite artworks`;
  const createFavoriteCollectionQuery = `INSERT INTO collections(user_id, title, description) VALUES($1, $2, $3) RETURNING id;`;
  const createFavoriteParams = [id, title, description];
  try {
    //use SQL transaction
    await client.query("BEGIN");

    const favoriteCollectionData = await client.query(
      createFavoriteCollectionQuery,
      createFavoriteParams
    );
    if (favoriteCollectionData.rowCount < 1) {
      throw new collectionsControllerError(
        404,
        `No favorite collection found by user ${id}`
      );
    }
    //save the id of the collections id for the user
    const collectionObj = favoriteCollectionData.rows[0];
    const collection_id = collectionObj.id;
    //create sentinel artwork node within collections to make ddl circular
    const sentinelArtworkQuery = `INSERT INTO collection_order(artwork_id, collection_id, position, prev_id, next_id) VALUES($1, $2, $3, $4, $5) RETURNING artwork_id`;
    const artworkId = 1;
    const position = 0;
    const prev_id = 1;
    const next_id = 1;
    const sentinelParams = [
      artworkId,
      collection_id,
      position,
      prev_id,
      next_id,
    ];
    const sentinelArtworkData = await client.query(
      sentinelArtworkQuery,
      sentinelParams
    );
    if (sentinelArtworkData.rowCount < 1) {
      throw new collectionsControllerError(
        500,
        "Error when creating sentinel artwork node in collection_order table"
      );
    }
    await client.query("COMMIT");
    return res.status(200).json(res.locals.userID);
  } catch (err) {
    await client.query("ROLLBACK");
    next({
      log: "Error when creating favorite's collection for individual user",
      status: err.status,
      message: err.message,
    });
  }
};

collectionsController.readFavorites = async (req, res, next) => {
  const { user } = req.params;
  const title = "favorites";

  const retrieveFavorites = `SELECT title, description, likes FROM collections WHERE user_id=$1 AND title=$2;`;
  const favoritesParams = [user, title];

  const client = await db.pool.connect();

  try {
    //use SQL transaction
    await client.query("BEGIN");
    const favoritesData = await client.query(
      createFavoriteCollectionQuery,
      createFavoriteParams
    );
    if (favoriteCollectionData.rowCount < 1) {
      throw new collectionsControllerError(
        404,
        `No favorite collection found by user ${id}`
      );
    }
    //save the id of the collections id for the user
    const collectionObj = favoriteCollectionData.rows[0];
    const collection_id = collectionObj.id;
    //create sentinel artwork node within collections to make ddl circular
    const sentinelArtworkQuery = `INSERT INTO collection_order(artwork_id, collection_id, position, prev_id, next_id) VALUES($1, $2, $3, $4, $5) RETURNING artwork_id`;
    const artworkId = 1;
    const position = 0;
    const prev_id = 1;
    const next_id = 1;
    const sentinelParams = [
      artworkId,
      collection_id,
      position,
      prev_id,
      next_id,
    ];
    const sentinelArtworkData = await client.query(
      sentinelArtworkQuery,
      sentinelParams
    );
    if (sentinelArtworkData.rowCount < 1) {
      throw new collectionsControllerError(
        500,
        "Error when creating sentinel artwork node in collection_order table"
      );
    }
    await client.query("COMMIT");
    return res.status(200).json(res.locals.userID);
  } catch (err) {
    await client.query("ROLLBACK");
    next({
      log: "Error when creating favorite's collection for individual user",
      status: err.status,
      message: err.message,
    });
  }
};

// collectionsController.createCollection = async (req, res, next) =>{
//   //collection name, description coming from user body
//   console.log('creating collection');
//   const {title, description} = req.body;
//   const newCollection = {
//     title,
//     description
//   }
//   const { username } = req.params;
//   //look for the existing user first and push the new collection into the
//   await User.findOneAndUpdate({username}, {$push: {collectionArr: newCollection}}, {new:true, upsert: true})
//     .then( async user => {
//       console.log('user is =>', user);
//       //can maybe send back object id to frontend and store this information for later backend use
//       //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
//       // https://stackoverflow.com/questions/36690982/accessing-a-sub-document-id-after-save-mongoose
//       //https://stackoverflow.com/questions/33929007/in-mongodb-not-able-to-find-sub-documents-based-on-ids
//       //only sending the title to frontend for now!
//       res.locals.newestCollection = title
//       console.log('new arr is =>', user.collectionArr)
//       next();
//     })
//     .catch(err => {
//       next({
//         message: {err: 'error in error in finding user'}
//       })
//     })
// }

//middleware for user to see their collections
// collectionsController.readCollection = (req, res, next) =>{
//   console.log('reading collections')
//   const {username} = req.params
//   console.log('user is =>', username)
//   User.findOne({username})
//     .then( async user => {
//       //send collections array to to frontend
//       res.locals.allCollections = user.collectionArr
//       return next();
//     })
//     .catch(err => {
//       next({
//         log: err,
//         message: {err: 'error in error in finding user'}
//       })
//     })
// }

// collectionsController.updateCollection = async (req, res, next) =>{
//   //getting title of the collection from the uri
//   console.log('updating collection');
//   const {username} = req.params
//   //will need the old title of the piece from front-end
//   //get description and title of the collection when the user clicks update
//   const {description, newTitle, oldTitle, likes} = req.body;
//   let title;
//   //ensures we won't break middleware if user doesn't want to update their title
//   if (!newTitle) {title = oldTitle}
//   else {title = newTitle}
//   const updatedCollection = {
//     description,
//     likes,
//     title
//   }

//   await User.findOne({username})
//     .then( async user => {
//       console.log(user.username);
//       // console.log('updated Collections array is', user.collectionArr)
//       //https://stackoverflow.com/questions/21142524/mongodb-mongoose-how-to-find-subdocument-in-found-document
//       //get the collection subdocument
//       const collection = user.collectionArr.filter((doc) =>{
//         return doc.title === `${oldTitle}`
//       }).pop();
//       console.log('desired updated doc is =>', collection)
//       //inset updates into collection
//       collection.set(updatedCollection);
//       await user.save()
//         .then(savedUser => {
//           const newCollection = savedUser.collectionArr.filter((doc) =>{
//             return doc.title === `${title}`
//           }).pop();
//           //return newly saved collection to frontend
//           res.locals.updated = newCollection;
//           console.log('updated collection is =>', res.locals.updated);
//         })
//         .catch(err =>{
//           next({
//             message: {err: 'error in saving the updated user doc after collection update'}
//           })
//         })
//       next();
//     })
//     .catch(err => {
//       next({
//         message: {err: 'error in error in finding user'}
//       })
//     })
// }
//delete a user's collection
// collectionsController.deleteCollection = async (req, res, next) => {
//   //will be receiving collection title from the req body
//   const {title} = req.body;
//   const {username} = req.params
//   //need to find user and update
//   //https://stackoverflow.com/questions/26252569/mongoose-delete-subdocument-array-item
//   await User.findOneAndUpdate({username},{$pull: {'collectionArr': {title}} }, {new:true, upsert: true})
//     .then(async user => {
//       res.locals.deletedCollection = user.collectionArr
//       console.log('new arr is =>', res.locals.deletedCollection)
//       next();
//     })
//     .catch(err => {
//       next({
//         message: {err: 'error in error in finding user'}
//       })
//     })
// }

module.exports = collectionsController;
