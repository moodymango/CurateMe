//user docs should look like the following:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {collectionSchema} = require('./artworkModel')
//do I need to install bcrypt in here as well?
//user doc should contain the following data for each user
// {
//     username,
//     password,
//     email,
//     firstname,
//     lastName,
//     favorites,
//     collections: []
// }

const userSchema = new Schema({
  //unique true, makes sure there are no duplicate usernames
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  //Each user has an array of collections, and each of these is a collection schema, not the model itself
  collectionArr: [collectionSchema]
  // collections: [{type: Schema.Types.ObjectId, ref: 'Collections'}],
  // favorites: {type: Schema.Types.ObjectId, ref: 'Favorites'}

})

const User = mongoose.model('User', userSchema);

module.exports = User;

