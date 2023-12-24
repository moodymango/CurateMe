const express = require("express");
const artChicagoApiController = require("../controllers/artChicagoApi.js");
//router instance is a complete middleware and routing system
const router = express.Router();

//user searches by both artist_title and potential title of artwork
router.post("/", artChicagoApiController.getArtworksFromApi);
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
