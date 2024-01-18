import React, { useState, useEffect, useRef } from "react";
import axios from "../components/api/axios";

//import children components
import SearchResults from "../components/searchResults.jsx";

const SearchContainer = (props) => {
  //set initial state of search bar to empty string
  const [searchReq, setSearch] = useState("");
  const [categoryField, setCategoryField] = useState("");
  //set initial state of results (which should be an array of objs)
  const [searchResults, setResults] = useState([]);
  const resultsArr = useRef([]);
  //set error messaging
  const [errMsg, setErrMsg] = useState("");
  //make async function to fetch data
  const fetchData = async () => {
    try {
      //within axios.post, need to define search url for backend
      const apiResults = await axios.post(
        "/search",
        //need to provide payload(data we're sending to backend)
        //need to make sure the properties match the properties i've defined in my backend
        JSON.stringify({ searchReq, categoryField }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //save response data to searchResults state array
      //I am successfully saving state, but only saving 5 pieces when I should be saving 10.
      setResults(apiResults.data);
      // let dataArr = apiResults.data
      // dataArr.forEach((el) => {
      //   resultsArr.current.push(el);
      // })
      // console.log('array is =>', resultsArr.current)
    } catch (err) {
      if (err.response) {
        setErrMsg(`${err.response.data}`);
      } else if (err.response.status === 404) {
        setErrMsg(`${err.response.data}`);
      }
    }
  };
  //allows user to make calls via the api
  const handleSubmit = async (e) => {
    e.preventDefault();
    radioValue();
    //will make call to axios to make call to backend and set state
    fetchData();
    //now need to pass down search results state to child component for this site
  };
  const radioValue = () => {
    console.log("is radioButtons working...");
    const getRadioBtns = document.getElementsByName("categoryField");
    for (let i = 0; i < getRadioBtns.length; i++) {
      console.log("radio buttons are", getRadioBtns[i]);
      console.log("radio buttons checked maybe>", getRadioBtns[i].checked);
      if (getRadioBtns[i].checked) setCategoryField(getRadioBtns[i].value);
    }
  };

  return (
    <div className="search-component">
      <form id="search-form" role="search" onSubmit={handleSubmit}>
        <div id="search-input">
          <div id="radio-categoryField">
            <input
              type="radio"
              id="artist_title"
              name="categoryField"
              value="artist_title"
            />
            <label htmlFor="artist_title">Artist Name</label>
            <input type="radio" id="title" name="categoryField" value="title" />
            <label htmlFor="title">Artwork Title</label>
          </div>
          <div id="search-button&bar">
            <div id="search-bar">
              <input
                title="searchReq"
                type="search"
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                value={searchReq}
                placeholder="Degas?"
              />
            </div>
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
      <div id="search-results">
        {searchResults.length ? (
          <SearchResults searchResults={searchResults} />
        ) : (
          <h2>{errMsg}</h2>
        )}
      </div>
    </div>
  );
};
export default SearchContainer;
