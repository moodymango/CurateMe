const express = require('express');
const artChicagoApiController = require('../controllers/MetApi')
//remember, routers help modularize code,
//router instance is a complete middleware and routing system
const router = express.Router();

router.get('/', artChicagoApiController.getBlackArtists, (req, res) =>{
  //want to send info as json data tho
  return res.status(200).send('Just logging my artists')
})

module.exports = router;