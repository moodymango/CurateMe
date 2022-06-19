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
      console.log('See if we have a new collection for user => ', user.collectionArr)
      next();
    })
    .catch(err => {
      next({
        message: {err: 'error in error in finding user'}
      })
    })
  // await Collections.Collections.create({title, description})
  //   .then(async newCollection => {
  //     //need to save the collections id to reference in user
  //     res.locals.collectId = newCollection._id;
  //     console.log('new collection is created and added to user acc =>', res.locals.collectId);
  //     next()
  //   })
  //   .catch(err => {
  //     next({
  //       log: 'error in creating a new collection',
  //       message: {err}
  //     })
  //   })
}
collectionsController.updateCollection = async (req, res, next) =>{
  //getting title of the collection from the uri
  console.log('updating collection');
  const {username} = req.params
  //get description and title of the collection when the user clicks update
  const {description, title} = req.body;
  console.log('params object is =>', username);
  //will have to find the collection doc in question in the user's acc
  //users.collections
  const foundCollection = await findCollection(next, title, description);
  //push found id onto collections.
  await User.findOneAndUpdate({username}, { $push: { collections: description}}, {new: true, upsert: true})
    .then( async user => {
      console.log('user is => ', user.username)
      next();
    })
    .catch(err => {
      next({
        message: {err: 'error in error in finding user'}
      })
    })
}
//LOL COLLECTION WAS NOT ADDED TO USER ACC NEED TO FIX THIS!!

module.exports = collectionsController;