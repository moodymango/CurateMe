const express = require('express');
//will need to have another controller to handle pulling up favorites, collections, and artwork additions
const router = express.Router({mergeParams: true});
const collectionsController = require('../controllers/collectionsController');
// const { route } = require('./searchArtworks');

//need to access favorites and collections

//need routes to favorites
// router.get('/favorites')

//create new collection for user
router.post('/collections', collectionsController.createCollection, (req, res) => {
  return res.status(200).send('checking if we created collection');
})
//read user's collections
router.get('/collections', collectionsController.readCollection, (req, res) =>{
  //sending back an array of collections of users
  // return res.status(200).send('reading collections');
  return res.status(200).json(res.locals.allCollections);
})
//update new collection for user
router.patch('/collections', collectionsController.updateCollection, (req, res) => {
  return res.status(200).send('checking if we updated collection');
})
// //delete new collection for user
// router.delete('/collections')

module.exports = router;
