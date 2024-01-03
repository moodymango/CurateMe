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
    //mock return value of the fetch invocation
    fetch.mockResolvedValue(new Response(JSON.stringify(postResponseArtApi)));
    const retrievedArtwork = await artChicagoApiController.getArtworksFromApi(
      req,
      res,
      mockedNext
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(postResponseArtApi.data);
    const mockedJsonArg = res.json.mock.calls[0][0];
    mockedJsonArg.forEach((artwork) => {
      expect(artwork).toEqual(
        expect.objectContaining({
          artist_title: expect.any(String),
          title: expect.any(String),
          id: expect.any(Number),
          image_id: expect.any(String),
        })
      );
    });
  });
  test("Should throw an error if the service is down", async () => {});
});
