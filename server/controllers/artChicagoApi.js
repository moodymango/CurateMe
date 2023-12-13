const fetch = require("node-fetch");
const artChicagoApiController = {};
const {
  ARTWORK_URL,
  ARTWORK_FIELDS,
  IMAGE_URL,
  LARGE_IMAGE_URL,
  SMALL_IMAGE_URL,
  timeout,
} = require("../models/config.js");

//build headers w/ proper authentication as request by source institution
const myHeaders = new fetch.Headers({
  "Content-Type": "application/json",
  "AIC-User-Agent": "Artsy Fartsy (artsyfartsy.duv@gmail.com)",
});
//query build from elastic search according to API
const queryBuild = function (searchQ, categtoryField = "artist_title") {
  console.log("searchq is", searchQ);
  console.log("category is", categtoryField);
  return {
    query: {
      //combine multiple queries into one request
      bool: {
        must: [
          {
            //ensure that I am only using artworks tagged as public domanin
            term: {
              is_public_domain: true,
            },
          },
          {
            //keyword that allows me to search via full-text search
            match: {
              //if I wanted to add functionality to search by artist, would have to make the key for this property dynamic, and add artist_title
              [categtoryField]: {
                query: searchQ,
              },
            },
          },
        ],
      },
    },
    //retrieves specific fields in the search response
    //returns each value in a standardized way that matches the mapping
    fields: ARTWORK_FIELDS,
    limit: 50,
  };
};
//helper function to get individual artwork information(used in almost every middleware)
//consider following this advice in order to optimize the following
// https://stackoverflow.com/questions/60710423/fetch-in-fetch-inside-a-loop-js
artChicagoApiController.getArtworkInfo = (req, res, next) => {
  //each middleware will give an array of artwork ids that will be persisted res.locals
  //this middleware iterates through the artwork ids received from the previous middleware to request specific information about the pieces.
  console.log("getting info on artworks");
  res.locals.artworkInfo = [];
  // console.log('sample id is =>', res.locals.artworks[0])
  res.locals.artworks.forEach(async (artworkId, idx) => {
    await fetch(
      `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=image_id,title,artist_title,medium_display,theme_titles,date_display,classification_titles,artwork_type_title`
    )
      .then((data) => data.json())
      .then((artworkData) => {
        //need to construct image url so I can save in DB and display on client side later on.
        const imageURLApi = `${artworkData.config.iiif_url}/${artworkData.data.image_id}/full/200,/0/default.jpg`;
        const largeImage = `${artworkData.config.iiif_url}/${artworkData.data.image_id}/full/600,/0/default.jpg`;
        // //save url as a new prop on my response obj
        artworkData.data.imageURL = imageURLApi;
        artworkData.data.largeImageURL = largeImage;
        //add artworkId to the response object as well - this is so we can make another fetch request in case user chooses to add it collection
        artworkData.data.artworkId = artworkId;
        // //push each response onto res.locals
        //if we've reached the end of our artworks id array, send populated res.locals.artworkInfo array to final middleware else, keep pushing
        if (idx === res.locals.artworks.length - 1) {
          console.log("finished grabbing");
          return next();
        } else {
          res.locals.artworkInfo.push(artworkData.data);
        }
      })
      .catch((err) => {
        next({
          log: "Error when retrieving individual artwork data in getArtworkInfo",
          message: { err: err },
        });
      });
  });
};
artChicagoApiController.getArtworks = async (req, res, next) => {
  console.log("grabbing artworks by search term");
  const { searchReq } = req.body;
  //build query using elasticsearch syntax
  const query = queryBuild(searchReq);
  //pass minified URL encoded json
  const URLEncodeQuery = encodeURIComponent(JSON.stringify(query));
  const url = `${ARTWORK_URL}${URLEncodeQuery}`;
  try {
    const res = await Promise.race([
      // { headers: { [REQUEST_HEADER_AGENT]: REQUEST_HEADER_INFO } }
      fetch(url, { headers: myHeaders }),
      timeout(4),
    ]);
    const data = await res.json();
    //data I want is contained in data.data array. Each artwork is represented in an object
    console.log("data is =>", data);
  } catch (err) {
    console.log(err);
  }
};
//   await fetch(url)
//     .then((data) => data.json())
//     .then((dataObj) => {
//       console.log("...data grabbed", dataObj);
//       //instantiate empty arr on artworks prop of res.locals
//       res.locals.artworks = [];
//       //data found in dataObj.data
//       //must iterate through this array of objs in order to get individual obj id from each one
//       dataObj.data.forEach((record) => {
//         //push each object id into res.locals.artworks
//         res.locals.artworks.push(record.id);
//       });
//       //if the artworks array is empty, need to send back an error message
//       if (res.locals.artworks.length === 0) {
//         res.send(400).send("Sorry, could not find any artworks with this term");
//       }
//       console.log("artworks are =>", res.locals.artworks);
//       next();
//     })
//     .catch((err) => {
//       next({
//         log: "Error when retrieving collection of artworks data in getArtworks",
//         message: { err: err },
//       });
//     });
// };
//middleware to get artist, ideally returns all the artworks from that individual artist
artChicagoApiController.getArtist = async (req, res, next) => {
  const { searchReq } = req.body;
  //what do I want to serve to the front-end? ultimately json data containing the artwork image, title,
  await fetch(
    `https://api.artic.edu/api/v1/artists/search?q=${searchReq}[is_artist]=true&fields=artwork_ids,title`
  )
    .then((data) => data.json())
    .then((artistObj) => {
      res.locals.artworks = [];
      //artist I am looking for is typically the first el
      const artist = artistObj.data[0];
      //get first 10 pieces by this artist
      for (let i = 0; i <= 10; i++) {
        res.locals.artworks.push(artist.artwork_ids[i]);
      }
      console.log("artists works are =>", res.locals.artworks);
      next();
    })
    .catch((err) => {
      next({
        log: "artChicagController had error",
        message: { err: err },
      });
    });
};

module.exports = artChicagoApiController;
