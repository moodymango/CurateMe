const express = require('express');
//will need to have another controller to handle pulling up favorites, collections, and artwork additions
const router = express.Router({mergeParams: true});
const collectionsController = require('../controllers/collectionsController');
const artworkController = require('../controllers/artworksController')
// const { route } = require('./searchArtworks');

//need to access favorites and collections
//need routes that handle the individual artworks pertaining to each collection
//title of the collection for queries will come from req.params

//for http://localhost:5050/:username/collections/artworks
router.post('/collections/:title', artworkController.artworkInfo, artworkController.addToCollection, (req, res) => {
  //sending new artwork title to the frontend to verify creation!
  return res.status(200).send('updating collection')
})
//read all the artworks in the user's collection
//need to get :title param from uri
router.get('/collections/:title', artworkController.getArtworks, (req, res) =>{
  //send client current collections arr by user
  return res.status(200).send(res.locals.artworks)
})
//MIGHT BE A STRETCH FEATURE
////allows user to add impression of the piece, so the ONLY prop of artwork object changing is impression
router.patch('/collections/:artwork',  (req, res) => {
  //send the frontend the updated collection
  return res.status(200).json(res.locals.updated);
});
//deletes the unwanted artwork from user's collection
router.delete('/collections/:title', artworkController.deleteArtwork, (req, res) => {
  //sends user updated view of total collections
  return res.status(200).send('deleting artworks');
})

//for http://localhost:5050/:username/collections
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
