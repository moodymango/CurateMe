const express = require('express');
//will need to have another controller to handle pulling up favorites, collections, and artwork additions
const router = express.Router();
const collectionsController = require('../controllers/collectionsController');
// const { route } = require('./searchArtworks');

//need to access favorites and collections

//need routes to favorites
// router.get('/favorites')
// //need routes to collections
// router.get('/collections')
//create new collection for user
router.post('/collections', collectionsController.createCollection, (req, res) => {
  res.status(200).send('checking if we created collection');
})
//update new collection for user
router.patch('/collections', collectionsController.updateCollection, (req, res) => {
  res.status(200).send('checking if we updated collection');
})
// //delete new collection for user
// router.delete('/collections')

module.exports = router;
