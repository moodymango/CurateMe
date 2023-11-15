const express = require("express");
const artChicagoApiController = require("../controllers/artChicagoApi");
//remember, routers help modularize code,
//router instance is a complete middleware and routing system
const router = express.Router();

//search by general terms
router.post(
  "/",
  artChicagoApiController.getArtworks,
  artChicagoApiController.getArtworkInfo,
  (req, res) => {
    //what do I want to serve to the front-end? ultimately json array of objects!
    return res.status(200).json(res.locals.artworkInfo);
  }
);
//search by artist
router.post(
  "/artist",
  artChicagoApiController.getArtist,
  artChicagoApiController.getArtworkInfo,
  (req, res) => {
    return res.status(200).json(res.locals.artworkInfo);
  }
);

module.exports = router;
