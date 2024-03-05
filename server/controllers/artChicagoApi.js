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
      if (data.length === 0 || data.data.length === 0) {
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
    next({
      log: "Error when retrieving artwork by search string",
      status: err.status,
      message: err.message,
    });
  }
};

module.exports = artChicagoApiController;
