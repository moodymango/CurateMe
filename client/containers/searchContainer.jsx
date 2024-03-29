import React, { useState, useRef, useCallback } from "react";
import useArtworkSearch from "../components/useArtworkSeach.js";
import SearchResults from "../components/searchResults.jsx";
const SearchContainer = () => {
  //set initial state of search bar to empty string
  const [searchReq, setSearch] = useState("");
  const [categoryField, setCategoryField] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [didSubmit, setDidSubmit] = useState(false);
  const { searchResults, isLoading, error, hasMore, errMsg, finalPage } =
    useArtworkSearch(searchReq, categoryField, pageNum, didSubmit);
  //initially undefined
  const observer = useRef();
  //attach reference to the very last artwork el is shown on the screen,
  //then we update page number by 1
  const lastArtworkElementRef = useCallback(
    (node) => {
      //check isLoading, we dont want to trigger infinite scrolling
      if (isLoading) return;
      //if we have hit the last page of our function, do not trigger infinite scrolling
      if (pageNum === finalPage) return;
      //want to disconnect the observer from prev last el
      if (observer.current) observer.current.disconnect();
      //set current observer
      observer.current = new IntersectionObserver((entries) => {
        //want to check if our last element is on the page, and we are not on the last page of pagination
        if (entries[0].isIntersecting && hasMore) {
          //if so, reassign page num to page num + 1
          setPageNum(pageNum + 1);
        }
      });
      //if something is our last element, we want to make sure our observer is observing it
      if (node) observer.current.observe(node);
    },
    // need to return the dependencies of the useCallback hook
    [isLoading, hasMore]
  );
  //Sets state for searchQ and also resets page number to 1
  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
    setPageNum(1);
    setDidSubmit(false);
  }
  //handle submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);
  };
  //function to capture value of radio buttons
  const handleChange = (e) => {
    setCategoryField(e.target.value);
    setPageNum(1);
    setDidSubmit(false);
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
          <div id="search-btn-and-bar">
            <div id="search-bar">
              <input
                title="searchReq"
                type="search"
                id="search_input"
                onChange={handleSearch}
                value={searchReq}
                placeholder="Search your favorite artist"
              />
            </div>
          </div>
        </div>
      </form>
      <div id="search-results">
        <div>
          {error ? (
            <div>
              <h1 id="error-msg">{errMsg}</h1>{" "}
            </div>
          ) : (
            <div>
              <SearchResults
                searchResults={searchResults}
                ref={lastArtworkElementRef}
              ></SearchResults>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchContainer;
