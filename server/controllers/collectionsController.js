const Collections = require('../models/artworkModel');
//when user creates a collection, this collection must be added in the user doc
const User = require('../models/userModel');
const collectionsController = {};
//this helper function just finds our collection
//FOR POSTMON
//{
//   "description" : "A celebration of Black and Brown queer pride"
// }

const findCollection = (next, title, description) =>{
  Collections.Collections.findOne({title})
    .then(collection => {
    //collection is collections
      console.log('found collection')
    })
    .catch(err => {
      next({
        message: {err: 'error in pushing collection to user'}
      })
    })
}

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
      //can maybe send back object id to frontend and store this information for later backend use
      //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
      // https://stackoverflow.com/questions/36690982/accessing-a-sub-document-id-after-save-mongoose
      //https://stackoverflow.com/questions/33929007/in-mongodb-not-able-to-find-sub-documents-based-on-ids
      console.log('See if we have a new collection for user => ', user.collectionArr)
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
  const {username} = req.params
  console.log('reading collections')
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
//   "oldTitle": "Be Who You Areeeeee, For Your Priiiiiide",
// "newTitle": "Be Who You Areeeeee, For Your Priiiiiide, Don't Hiiiiide",
// "description": "A celebration of Black and brown queer pride",
//  "likes": 23
// }
collectionsController.updateCollection = async (req, res, next) =>{
  //getting title of the collection from the uri
  console.log('updating collection');
  const {username} = req.params
  //will need the old title of the piece from front-end
  //get description and title of the collection when the user clicks update
  const {description, newTitle, oldTitle, likes} = req.body;
  const updatedCollection = {
    description,
    newTitle,
    likes
  }
  //push found id onto collections.
  // await User.findOne({username})
  //   .then( async user => {
  //     console.log('user is =>', user);
  //     var arrCollections = user.collectionArr.title(oldTitle)
  //     console.log('user collections is =>', arrCollections)
  //     arrCollections.set(updatedCollection);
  //     user.save()
  //       .then(saved =>
  //         console.log('collection arr has been updated')
  //       )
  //       .catch(err =>{
  //         next({
  //           message: {err: 'error in saving the updated user doc after collection update'}
  //         })
  //       })
  //     next()
  //   })
  //   .catch(err => {
  //     next({
  //       message: {err: 'error in error in finding user'}
  //     })
  //   })
  await User.findOne({username, 'collectionsArr.title': oldTitle})
    .then( async user => {
      console.log('updated Collections array is', user.collectionArr)
      next();
    })
    .catch(err => {
      next({
        message: {err: 'error in error in finding user'}
      })
    })
  // await User.findOneAndUpdate({username, 'collectionsArr.title': oldTitle}, { $set: { 'collectionArr.$.description': description, 'collectionArr.$.title': newTitle, 'collectionArr.$.likes': likes}}, {new: true, upsert: true})
  //   .then( async user => {
  //     console.log('updated Collections array is', user.collectionArr)
  //     next();
  //   })
  //   .catch(err => {
  //     next({
  //       message: {err: 'error in error in finding user'}
  //     })
  //   })
}
//LOL COLLECTION WAS NOT ADDED TO USER ACC NEED TO FIX THIS!!

module.exports = collectionsController;