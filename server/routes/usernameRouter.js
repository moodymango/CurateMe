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
  //sending new collection title to the frontend to verify creation!
  return res.status(200).json(res.locals.newestCollection);
})
//read user's collections
router.get('/collections', collectionsController.readCollection, (req, res) =>{
  //send client current collections by user
  return res.status(200).json(res.locals.allCollections);
})
//update new collection for user
router.patch('/collections', collectionsController.updateCollection, (req, res) => {
  //send the frontend the updated collection
  return res.status(200).json(res.locals.updated);
});
// //delete new collection for user
router.delete('/collections', collectionsController.deleteCollection, (req, res) => {
  //sends user updated view of total collections
  return res.status(200).json(res.locals.deletedCollection);
})

module.exports = router;
