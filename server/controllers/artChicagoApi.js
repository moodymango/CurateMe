const fetch = require("node-fetch");
const artChicagoApiController = {};
const {
  ARTWORK_URL,
  ARTWORK_FIELDS,
  IMAGE_URL,
  LARGE_IMAGE_URL,
  SMALL_IMAGE_URL,
} = require("../models/config.js");
//custom errors for error handling
class artChicagoApiFetchError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.name = "artChicagoApiError";
  }
}
//build headers w/ proper authentication as request by source institution
const myHeaders = new fetch.Headers({
  "Content-Type": "application/json",
  "AIC-User-Agent": "Artsy Fartsy (artsyfartsy.duv@gmail.com)",
});

//Time and and Query Build Function Adapted from Artispyr from Adamcrombie:
//https://github.com/adamcrombie/Artispyr/blob/master/src/js/model.js
function timeout(seconds) {
  return new Promise(function (_, reject) {
    // Setting s in ms time
    setTimeout(function () {
      reject(
        new artChicagoApiFetchError(
          `Request timed out after ${seconds} seconds`,
          504
        )
      );
    }, seconds * 1000);
  });
}
//query build from elastic search according to API
const queryBuild = function (
  searchQ,
  categtoryField = "artist_title",
  pageNum = 1
) {
  return {
    query: {
      //combines multiple queries into one request
      bool: {
        must: [
          {
            //ensure that I am only using artworks tagged as public domanin
            term: {
              is_public_domain: true,
            },
          },
          {
            //match keyword that allows me to search via full-text search
            match: {
              [categtoryField]: {
                query: searchQ,
              },
            },
          },
        ],
      },
    },
    //retrieves specific fields in the search response
    fields: ARTWORK_FIELDS,
    limit: 10,
    page: pageNum,
  };
};
artChicagoApiController.getArtworksFromApi = async (req, response, next) => {
  const { searchReq, categoryField, pageNum } = req.body;
  //build query using elasticsearch syntax
  const query = queryBuild(searchReq, categoryField, pageNum);
  //pass minified URL encoded json
  const URLEncodeQuery = encodeURIComponent(JSON.stringify(query));
  const url = `${ARTWORK_URL}${URLEncodeQuery}`;
  try {
    const res = await Promise.race([
      fetch(url, { headers: myHeaders }),
      timeout(4),
    ]);
    if (res.ok) {
      const data = await res.json();
      //data I want is contained in data => {pagination, data properties as the most important} object. Each artwork is represented in an object
      if (data.length === 0 || data.data.length === 0) {
        console.log("testing should be throwing error");
        throw new artChicagoApiFetchError(
          404,
          `No artworks found by query: ${searchReq}`
        );
      }
      response.status(200).json(data);
    } else {
      //throw error to execute catch block if the fetch response failed
      throw new artChicagoApiFetchError(500, "Art Chicago Api Service Down");
    }
  } catch (err) {
    console.log("error is", err);
    next({
      log: "Error when retrieving artwork by search string",
      status: err.status,
      message: err.message,
    });
  }
};

//DEFUNCT FUNCTIONS
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

module.exports = artChicagoApiController;
