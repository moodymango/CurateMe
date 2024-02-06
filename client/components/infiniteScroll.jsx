import React, { useState, useEffect, useRef } from "react";
//import child components like search results
import SearchResults from "../components/searchResults.jsx";
const InfiniteScroll = (props) => {
  const { pageNum, handleSubmit, searchResults } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //checks if user has reached the bottom of the page and call fetchData if necessary
  // @source - https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom-not-just-the-window-but-any-element
  const handleScroll = () => {
    //if how much has been scrolled down (scroll top) and height of the visible window (window.height)are equal to the total height of the document, we have reached the bottom of the page
    if (
      document.documentElement.scrollTop() + window.height() ==
      document.height()
    ) {
      //want to update page num by 1, and then call fetchData function again
      setPageNum((pageNum += 1));
    }
    handleSubmit();
    //want to call my fetch data function again with same params as last time
  };
  //add scroll event listener and remove whent the component is unmounted
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div>
      <SearchResults searchResults={searchResults}></SearchResults>
    </div>
  );
};

export default InfiniteScroll;
