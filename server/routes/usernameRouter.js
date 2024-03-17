const express = require("express");
const router = express.Router({ mergeParams: true });
const artworkController = require("../controllers/artworksController");
const tokenController = require("../controllers/tokenController");
const { route } = require("./searchArtworks");

//for http://localhost:5050/:user/collections/
router.post(
  "/collections",
  tokenController.authenticateToken,
  artworkController.addToFavoritesTransaction
  //   (req, res) => {
  //     //sending new artwork title to the frontend to verify creation!
  //     return res.status(200).json("Hello");
  //   }
);

module.exports = router;
