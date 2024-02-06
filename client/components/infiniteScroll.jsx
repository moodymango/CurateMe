import React, { useState, useEffect, useRef } from "react";
//import child components like search results
import SearchContainer from "../containers/searchContainer";
const InfiniteScroll = (props) => {
  // set up initial state by including variable to keep track of the curr page number, loading categories, and error indicatora
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //checks if user has reached the bottom of the page and call fetchData if necessary

  const handleScroll = () => {};
  return <div></div>;
};

export default InfiniteScroll;
