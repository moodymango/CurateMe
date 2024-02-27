import React, { useState, useEffect, useRef } from "react";
//import child components like search results
import SearchResults from "../components/searchResults.jsx";
const InfiniteScroll = (props) => {
  const { isLoading, fetchData, handleSubmit, searchResults } = props;
  //checks if user has reached the bottom of the page and call fetchData if necessary
  // @source - https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom-not-just-the-window-but-any-element
  // @source - https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/ - from scratch implementation
  const handleScroll = (e) => {
    console.log("handle scroll is working");
    if (
      //if how much has been scrolled down (scroll top) and height of the visible window (window.height)are equal to the total height of the document, we have reached the bottom of the page
      window.innerHeight + document.documentElement.scrollTop ==
      document.documentElement.offsetHeight
    ) {
      //invoke fetch data function
      // fetchData();
      console.log("HEY IM SCROLLING HERE");
    }
  };
  //add scroll event listener and remove when component is unmounted
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);
  return <div></div>;
};

export default InfiniteScroll;
