// //URLS for Images
// export const IMAGE_URL = "https://www.artic.edu/iiif/2/";
// export const LARGE_IMAGE_URL = "/full/843,/0/default.jpg";
// export const SMALL_IMAGE_URL = "/full/200,/0/default.jpg";
// //authentication
// export const REQUEST_HEADER_AGENT = "AIC-User-Agent";
// export const REQUEST_HEADER_INFO = "Artsy Fartsy (artsyfartsy@gmail.com)";
// //general info link
// export const ARTWORK_URL =
//   "https://api.artic.edu/api/v1/artworks/search?params=";

module.exports = {
  //URLS for Images
  IMAGE_URL: "https://www.artic.edu/iiif/2/",
  LARGE_IMAGE_URL: "/full/843,/0/default.jpg",
  SMALL_IMAGE_URL: "/full/200,/0/default.jpg",
  //authentication
  REQUEST_HEADER_AGENT: "AIC-User-Agent",
  REQUEST_HEADER_INFO: "Artsy Fartsy (artsyfartsy.duv@gmail.com)",
  //general info link
  ARTWORK_URL: "https://api.artic.edu/api/v1/artworks/search?params=",
  ARTWORK_FIELDS: `
  id,
  title,
  date_display,
  artist_display,
  artist_title,
  place_of_origin,
  dimensions,
  medium_display,
  inscriptions,
  is_public_domain,
  style_title,
  classification_title,
  image_id,
  config
`,
  timeout: function (seconds) {
    return new Promise(function (_, reject) {
      // Setting s ms time
      setTimeout(function () {
        reject(new Error(`Request timed out after ${seconds} seconds`));
      }, seconds * 1000);
    });
  },
};
