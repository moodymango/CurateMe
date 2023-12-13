module.exports = {
  //URLS for Images
  IMAGE_URL: "https://www.artic.edu/iiif/2/",
  LARGE_IMAGE_URL: "/full/843,/0/default.jpg",
  SMALL_IMAGE_URL: "/full/200,/0/default.jpg",
  //general info link
  ARTWORK_URL: "https://api.artic.edu/api/v1/artworks/search?params=",
  //field section for Elasticsearch
  ARTWORK_FIELDS: [
    "id",
    "title",
    "date_display",
    "artist_display",
    "artist_title",
    "place_of_origin",
    "dimensions",
    "medium_display",
    "inscriptions",
    "is_public_domain",
    " style_title",
    "classification_title",
    "image_id",
    " config",
  ],
  timeout: function (seconds) {
    return new Promise(function (_, reject) {
      // Setting s ms time
      setTimeout(function () {
        reject(new Error(`Request timed out after ${seconds} seconds`));
      }, seconds * 1000);
    });
  },
};
