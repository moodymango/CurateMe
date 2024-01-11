const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//each user's collection will containing the following:
// {
//     _id: collection_ID,
//     //user written collection title
//     title: collection_title,
//     //username
//     by: username,
//     //written description of collection by user
//     description: written description by user,
//     //likes recieved by other users
//     likes: likes,
//     //array of artworks add to collection when user adds to collection
//     artworks: [
//         //artwork contains the following properties:
//         {
//             title,
//             artist_title,
//             date_display,
//             imageURL,
//             //impression is written by user
//             impression
//         }
//     ]
// }

//in order to save individual artworks in user collections
const artworkSchema = new Schema({
  //all data comes from returned json of api call
  title: { type: String, required: true },
  artist: { type: String, required: true },
  date: { type: Number, required: true },
  image: { type: String, required: true, unique: true },
  //impession is not required, but user will write their impression themselves
  impression: { type: String },
});

//create model for artworkSchema
const Artwork = mongoose.model("Artwork", artworkSchema);

//for user curated collections
const collectionSchema = new Schema({
  //title, description, and
  title: { type: String, required: true, unique: true },
  description: String,
  likes: Number,
  //syntax to reference multiple schemas of artworks
  artworks: [artworkSchema],
  //consider using toJSON to transfrom the returned object to a json document?
  //https://alexanderzeitler.com/articles/mongoose-tojson-toobject-transform-with-subdocuments/
});
//create a model of the collection schema
const Collections = mongoose.model("Collections", collectionSchema);

//in order for user to make a favorite list
const favoritesSchema = new Schema({
  //favorites will just be a collection of the user's favorite works!
  artworks: [{ type: Schema.Types.ObjectId, ref: "Artwork" }],
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = {
  Collections,
  Artwork,
  Favorites,
  collectionSchema,
};
