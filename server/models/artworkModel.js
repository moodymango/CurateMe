const mongoose = require('mongoose');
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
const collectionSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  likes: Number,
  //syntax to reference multiple schemas of artworks
  artworks: [{type: Schema.Types.ObjectId, ref: 'Artwork'}]
  //consider using toJSON to transfrom the returned object to a json document?
  //https://alexanderzeitler.com/articles/mongoose-tojson-toobject-transform-with-subdocuments/
})
//create a model of the collection schema





// module.exports = 