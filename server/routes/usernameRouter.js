const express = require("express");
const router = express.Router({ mergeParams: true });
const artworkController = require("../controllers/artworksController");
const { route } = require("./searchArtworks");

//for http://localhost:5050/:user/collections/favorites
router.post(
  "/collections/",
  artworkController.addToFavoritesTransaction
  //   (req, res) => {
  //     //sending new artwork title to the frontend to verify creation!
  //     return res.status(200).json("Hello");
  //   }
);
//read all the artworks in the user's collection
//need to get :title param from uri
// router.get("/collections/:title", artworkController.getArtworks, (req, res) => {
//   //send client current collections arr by user
//   return res.status(200).json(res.locals.artworks);
// });

//deletes the unwanted artwork from user's collection
// router.delete(
//   "/collections/:title",
//   artworkController.deleteArtwork,
//   (req, res) => {
//     //sends user updated view of total collections
//     return res.status(200).json(res.locals.updatedCollection);
//   }
// );

//MIGHT BE A STRETCH FEATURE - NOT SUITABLE FOR MVP
// ////allows user to add impression of the piece, so the ONLY prop of artwork object changing is impression
// router.patch("/collections/:title", (req, res) => {
//   //send the frontend the updated collection
//   return res.status(200).json(res.locals.updated);
// });

//for http://localhost:5050/:username/collections
//create new collection for user
// router.post(
//   "/collections",
//   collectionsController.createCollection,
//   (req, res) => {
//     //sending new collection title to the frontend to verify creation!
//     return res.status(200).json(res.locals.newestCollection);
//   }
// );
//read user's collections
// router.get("/collections", collectionsController.readCollection, (req, res) => {
//   //send client current collections by user
//   return res.status(200).send(res.locals.allCollections);
// });
//update new collection for user
// router.patch(
//   "/collections",
//   collectionsController.updateCollection,
//   (req, res) => {
//     //send the frontend the updated collection
//     return res.status(200).json(res.locals.updated);
//   }
// );
// //delete new collection for user
// router.delete(
//   "/collections",
//   collectionsController.deleteCollection,
//   (req, res) => {
//     //sends user updated view of total collections
//     return res.status(200).json(res.locals.deletedCollection);
//   }
// );

module.exports = router;
