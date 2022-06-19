const Collections = require('../models/artworkModel');
//when user creates a collection, this collection must be added in the user doc
const User = require('../models/userModel');
const collectionsController = {};
//this helper function just finds our collection
const findCollection = (title, next) =>{
  Collections.Collections.findById('62aec1bdddbe072d700acf7e')
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
  //collection name, description, and username is coming from user body
  console.log('creating collection');
  const {title, description} = req.body;
  await Collections.Collections.create({title, description})
    .then(async newCollection => {
      //need to save the collections id to reference in user
      res.locals.collectId = newCollection._id;
      console.log('new collection is created and added to user acc =>', res.locals.collectId);
      next()
    })
    .catch(err => {
      next({
        log: 'error in creating a new collection',
        message: {err}
      })
    })
}
collectionsController.updateCollection = async (req, res, next) =>{
  //getting title of the collection from the uri
  console.log('updating collection');
  //CANNOT ACCESS PARAMS OBJECT?
  const wantedUser = req.params.username
  const {description} = req.body;
 console.log('params object is =>', wantedUser);
  //user id for BE WHO ARE colelction to be added to moodymango user
  // 62aec1bdddbe072d700acf7e
  await User.findOne({username: wantedUser})
    .then( async user => {
      console.log('user is => ', user.username)
      //now we call collections
      const {_id} = await findCollection(next);
      //push found id onto collections.
      user.collections.push(_id);
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