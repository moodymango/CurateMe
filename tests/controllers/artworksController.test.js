jest.mock("node-fetch");
const fetch = require("node-fetch");
const artChicagoApiController = require("../../server/controllers/artChicagoApi.js");
const postResponseArtApi = require("../testData/postResponseArtApi");
const { Response } = jest.requireActual("node-fetch");

//consider possible errors from the server:
//api limit errors, pagination errors, perhaps add throttling to API(reduce # of requests per second if the 3rd party api cannot handle it)
//schema changes - what if API releases new version and updates response schema?

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
    await artChicagoApiController.getArtworksFromApi(req, res, mockedNext);
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
  //what if external API is down?
  test("Should throw an error if the api service is down", async () => {
    //mock Express Request and Response Objects and next function
    const req = {
      body: { searchReq: "Manet" },
    };
    const serverErr = new Error("Art Chicago Api Service Down");
    serverErr.status = 500;
    const res = {
      json: jest.fn().mockRejectedValue(serverErr),
      status: jest.fn(() => res),
    };
    const mockedNext = jest.fn();
    fetch.mockRejectedValue(serverErr);
    await artChicagoApiController.getArtworksFromApi(req, res, mockedNext);
    //test that next has been called with error object
    expect(mockedNext).toHaveBeenCalledTimes(1);
    const mockedNextArg = mockedNext.mock.calls[0][0];
    expect(mockedNextArg).toEqual(
      expect.objectContaining({
        status: 500,
        message: "Art Chicago Api Service Down",
      })
    );
  });
  //what if external api finds nothing for the query?
  test("Should throw a 404 error if query returns a 404", async () => {
    expect.assertions(2);
    //mock Express Request and Response Objects and next function
    const req = {
      body: { searchReq: "Donna Noble" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const mockedNext = jest.fn();
    //mock failed fetch response with empty object
    fetch.mockResolvedValue(
      new Response(JSON.stringify(postResponseArtApi.noData))
    );
    await artChicagoApiController.getArtworksFromApi(req, res, mockedNext);
    //test that next has been called with error object
    expect(mockedNext).toHaveBeenCalledTimes(1);
    const mockedNextArg = mockedNext.mock.calls[0][0];
    expect(mockedNextArg).toEqual(
      expect.objectContaining({
        status: 404,
        message: "No artworks found by query: Donna Noble",
      })
    );
  });
  //what if the external api takes too long and response times out?
  test("Should throw a 504 error if server takes too long to service client request", async () => {
    const req = {
      body: { searchReq: "Gauguin" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const serverErr = new Error("Request timed out after 4 seconds");
    serverErr.status = 504;

    const mockedNext = jest.fn();

    fetch.mockRejectedValue(serverErr);
    await artChicagoApiController.getArtworksFromApi(req, res, mockedNext);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    const mockedNextArg = mockedNext.mock.calls[0][0];
    expect(mockedNextArg).toEqual(
      expect.objectContaining({
        status: 504,
        message: "Request timed out after 4 seconds",
      })
    );
  });
});
