const express = require("express");
const router = express.Router({ mergeParams: true });
const artworkController = require("../controllers/artworksController");
const tokenController = require("../controllers/tokenController");

//for http://localhost:5050/:user/collections/
router.post(
  "/collections",
  tokenController.authenticateToken,
  artworkController.addToFavoritesTransaction
);
router.delete(
  "/collections",
  tokenController.authenticateToken,
  artworkController.removeFromFavoritresTransaction
);

module.exports = router;
