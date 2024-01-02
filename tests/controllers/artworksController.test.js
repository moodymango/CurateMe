jest.mock("node-fetch");

const fetch = require("node-fetch");
require("jest-fetch-mock").enableMocks();

// const nock = require("nock");
const artChicagoApiController = require("../../server/controllers/artChicagoApi.js");
const postResponseArtApi = require("../testData/postResponseArtApi");
const { Response } = jest.requireActual("node-fetch");

//what kind of behavior might I want to prevent due to client error?
//should throw 400 error if there the search term field is an empty string
//throw a 400 error if the due to mispelling of the search term?
//should retrieve data by search term and send response correctly
//consider possible errors from the server:
//api limit errors, pagination errors, perhaps add throttling to API(reduce # of requests per second if the 3rd party api cannot handle it)
//tefor schema changes - what if API releases new version and updates response schema?
//the average response time or latency of the 3rd party api - want to ensure the response takes less than 3000ms?

//create a  mocked call api value representing a test call to the third party api
describe("fetched artwork tests with mocking", () => {
  test("Should return a list of artworks based on search string", async () => {
    //mock Express Request and Response Objects and next function
    const req = {
      body: { searchReq: "degas" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const mockedNext = jest.fn();
    //create mock data object to return after fetch implementation
    data = postResponseArtApi;
    data.status = jest.fn(() => data);
    data.json = jest.fn().mockResolvedValue(postResponseArtApi.data);
    fetch.mockResolvedValue(new Response(JSON.stringify(data)));
    // fetch.mockResolvedValue(data);
    console.log(
      "is tested function mocked?",
      artChicagoApiController.getArtworksFromApi
    );
    // const test = fetch();
    // console.log("test fetch eval result =>", test);
    const retrievedArtwork = await artChicagoApiController.getArtworksFromApi(
      req,
      res,
      mockedNext
    );
    console.log("fetch result is", retrievedArtwork);
    // mockedNext();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(postResponseArtApi.data);
    // expect(retrievedArtwork.status).toHaveBeenCalledWith(200);
    // expect(retrievedArtwork).toEqual(postResponseArtApi.data);
    // expect(retrievedArtwork.length).toBeGreaterThan(0);
    // retrievedArtwork.forEach((artwork) => {
    //   console.log("individual artwork is", artwork);
    //   expect(artwork).toEqual(
    //     expect.objectContaining({
    //       artist_title: expect.any(String),
    //       title: expect.any(String),
    //       id: expect.any(Number),
    //       image_id: expect.any(String),
    //     })
    //   );
    // });
  });
  //   test("Should fetch requested information by artwork title");
});
