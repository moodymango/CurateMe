const express = require("express");
const artChicagoApiController = require("../controllers/artChicagoApi.js");

const router = express.Router();
//user searches by both artist_title and potential title of artwork
router.post("/", artChicagoApiController.getArtworksFromApi);

module.exports = router;
