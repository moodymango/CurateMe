import React, { useState, useEffect, useRef } from "react";
import axios from "../components/api/axios";

//import children components
import SearchResults from "../components/searchResults.jsx";
import InfiniteScroll from "../components/infiniteScroll.jsx";
const SearchContainer = (props) => {
  //set initial state of search bar to empty string
  const [searchReq, setSearch] = useState("");
  const [categoryField, setCategoryField] = useState("");
  const [pageNum, setPageNum] = useState(0);
  //set initial state of results (which should be an array of objs)
  const [searchResults, setResults] = useState([]);
  //set error messaging
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    //make async function to fetch data
    async function fetchData() {
      try {
        //within axios.post, need to define search url for backend
        const apiResults = await axios.post(
          "/search",
          JSON.stringify({ searchReq, categoryField, pageNum }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        //update state by calling setResults with callbacl form
        //create new array containing the first parts I already had, and the results from the API
        setResults((searchResults) => [...searchResults, ...apiResults.data]);
      } catch (err) {
        if (err.response) {
          setErrMsg(`${err.response.data}`);
        }
      }
    }
    fetchData();
  }, [pageNum]);
  //handle submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //page number will only update  when the handle submit function runs, which in turn will trigger our useEffect hook
    setPageNum(1);
  };
  //function to change page
  const changePage = () => {
    setPageNum(pageNum + 1);
  };
  //function to capture value of radio buttons
  const handleChange = (e) => {
    setCategoryField(e.target.value);
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
              onChange={handleChange}
              checked={categoryField === "artist_title"}
            />
            <label htmlFor="artist_title">Artist Name</label>
            <input
              type="radio"
              id="title"
              name="categoryField"
              value="title"
              checked={categoryField === "title"}
              onChange={handleChange}
            />
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
        {pageNum === 1 ? (
          //ideally would prefer to display infinite scroll here since search results will be nested within this function
          <InfiniteScroll
            handleSubmit={handleSubmit}
            changePage={changePage}
            pageNum={pageNum}
            searchResults={searchResults}
          >
            {" "}
          </InfiniteScroll>
        ) : (
          // <SearchResults searchResults={searchResults} />
          <h2>{errMsg}</h2>
        )}
      </div>
    </div>
  );
};
export default SearchContainer;
