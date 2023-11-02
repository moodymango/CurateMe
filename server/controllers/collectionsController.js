const Collections = require('../models/artworkModel');
//when user creates a collection, this collection must be added in the user doc
const User = require('../models/userModel');
const collectionsController = {};
//this helper function just finds our collection
//FOR POSTMON
//{
//   "description" : "A celebration of Black and Brown queer pride"
// }
collectionsController.createCollection = async (req, res, next) =>{
  //collection name, description coming from user body
  console.log('creating collection');
  const {title, description} = req.body;
  const newCollection = {
    title,
    description
  }
  const { username } = req.params;
  //look for the existing user first and push the new collection into the 
  await User.findOneAndUpdate({username}, {$push: {collectionArr: newCollection}}, {new:true, upsert: true})
    .then( async user => {
      console.log('user is =>', user);
      //can maybe send back object id to frontend and store this information for later backend use
      //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
      // https://stackoverflow.com/questions/36690982/accessing-a-sub-document-id-after-save-mongoose
      //https://stackoverflow.com/questions/33929007/in-mongodb-not-able-to-find-sub-documents-based-on-ids
      //only sending the title to frontend for now!
      res.locals.newestCollection = title
      console.log('new arr is =>', user.collectionArr)
      next();
    })
    .catch(err => {
      next({
        message: {err: 'error in error in finding user'}
      })
    })
}
// {
//   "title": "Be Who You Areeeeee, For Your Priiiiiide",
// }
//middleware for user to see their collections
collectionsController.readCollection = (req, res, next) =>{
  console.log('reading collections')
  const {username} = req.params
  console.log('user is =>', username)
  User.findOne({username})
    .then( async user => {
      //send collections array to to frontend
      res.locals.allCollections = user.collectionArr
      return next();
    })
    .catch(err => {
      next({
        log: err,
        message: {err: 'error in error in finding user'}
      })
    })
}

//POSTMAN TESTING PURPOSES
// {
//   "oldTitle": "Glory of Nature",
// "newTitle": 'A Celebration of Nature',
// "description": "Scenes in nature"
// }
collectionsController.updateCollection = async (req, res, next) =>{
  //getting title of the collection from the uri
  console.log('updating collection');
  const {username} = req.params
  //will need the old title of the piece from front-end
  //get description and title of the collection when the user clicks update
  const {description, newTitle, oldTitle, likes} = req.body;
  let title;
  //ensures we won't break middleware if user doesn't want to update their title
  if (!newTitle) {title = oldTitle}
  else {title = newTitle}
  const updatedCollection = {
    description, 
    likes, 
    title
  }

  await User.findOne({username})
    .then( async user => {
      console.log(user.username);
      // console.log('updated Collections array is', user.collectionArr)
      //https://stackoverflow.com/questions/21142524/mongodb-mongoose-how-to-find-subdocument-in-found-document
      //get the collection subdocument
      const collection = user.collectionArr.filter((doc) =>{
        return doc.title === `${oldTitle}`
      }).pop();
      console.log('desired updated doc is =>', collection)
      //inset updates into collection
      collection.set(updatedCollection);
      await user.save()
        .then(savedUser => {
          const newCollection = savedUser.collectionArr.filter((doc) =>{
            return doc.title === `${title}`
          }).pop();
          //return newly saved collection to frontend
          res.locals.updated = newCollection;
          console.log('updated collection is =>', res.locals.updated);
        })
        .catch(err =>{
          next({
            message: {err: 'error in saving the updated user doc after collection update'}
          })
        })
      next();
    })
    .catch(err => {
      next({
        message: {err: 'error in error in finding user'}
      })
    })
}
//delete a user's collection
collectionsController.deleteCollection = async (req, res, next) => {
  //will be receiving collection title from the req body
  const {title} = req.body;
  const {username} = req.params
  //need to find user and update
  //https://stackoverflow.com/questions/26252569/mongoose-delete-subdocument-array-item
  await User.findOneAndUpdate({username},{$pull: {'collectionArr': {title}} }, {new:true, upsert: true})
    .then(async user => {
      res.locals.deletedCollection = user.collectionArr
      console.log('new arr is =>', res.locals.deletedCollection)
      next();
    })
    .catch(err => {
      next({
        message: {err: 'error in error in finding user'}
      })
    })
}

module.exports = collectionsController;