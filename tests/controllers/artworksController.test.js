const artworkFunction = require("../../server/controllers/artChicagoApi");

//what kind of behavior might I want to prevent due to client error?
//should throw 400 error if there the search term field is an empty string
//throw a 400 error if the due to mispelling of the search term?
//should retrieve data by search term and send response correctly
//consider possible errors from the server:
//api limit errors, pagination errors, perhaps add throttling to API(reduce # of requests per second if the 3rd party api cannot handle it)
//test for schema changes - what if API releases new version and updates response schema?
//test the average response time or latency of the 3rd party api - want to ensure the response takes less than 3000ms?

//mock the response of external api using a testing library
//create a mocked call api value representing a test call to the third party api
