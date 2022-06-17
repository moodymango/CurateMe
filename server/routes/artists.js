const express = require('express');
const artChicagoApiController = require('../controllers/artChicagoApi')
//remember, routers help modularize code,
//router instance is a complete middleware and routing system
const router = express.Router();

router.get('/', artChicagoApiController.getBlackArtworks, (req, res) =>{
  //what do I want to serve to the front-end? ultimately json data containing the artwork images
  //when users clic 
  return res.status(200).send('Just logging my artists')
})

module.exports = router;