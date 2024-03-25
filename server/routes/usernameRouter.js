const express = require("express");
const router = express.Router({ mergeParams: true });
const artworkController = require("../controllers/artworksController");
const tokenController = require("../controllers/tokenController");
const collectionsController = require("../controllers/collectionsController");

//for http://localhost:5050/:user/collections/
router.get(
  "/collections",
  tokenController.authenticateToken,
  collectionsController.readFavorites
);
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
