const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//the way I want to save this data hinges on the way the user interacts with the interface
//scroll, and they are immediately able to see 10 - 12 images, but as avoid making too many fetch calls to my server, 
// as a result, would like to save

// module.exports = 