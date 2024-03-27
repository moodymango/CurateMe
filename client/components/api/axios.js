import axios from "axios";
//we set up this config so that all calls made will require the uri for the http calls, without full url
//set base url for full application so we don't have to keep typing this elsewhere
export default axios.create({
  //developer mode:
  // baseURL: "http://localhost:8080/",
  //production mode:
  baseURL: "http://localhost:5050/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
