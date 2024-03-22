const express = require("express");
const artChicagoApiController = require("../controllers/artChicagoApi.js");

const router = express.Router();
router.post("/", artChicagoApiController.getArtworksFromApi);

module.exports = router;
