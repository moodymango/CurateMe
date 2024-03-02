import { useEffect, useState, useRef } from "react";
import axios from "axios";
//@source - webdevsimplified infinite scroll with react tutorial
export default function useArtworkSearch(
  searchReq,
  categoryField,
  pageNum,
  didSubmit
) {
  const hasPageBeenRendered = useRef({
    usrDidSubmit: false,
    usrFirstLoad: false,
  });

  //set load flags, initialize as true b/c we will load inside our app
  const [isLoading, setLoading] = useState(true);
  //set error messaging
  const [errMsg, setErrMsg] = useState("");
  //set initial state of results
  const [searchResults, setResults] = useState([]);
  //checks when we get to the end of the paginations, we don't want to keep calling our function once we've reached the end of the results
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setResults([]);
  }, [searchReq]);
  useEffect(() => {
    console.log("category field is ", categoryField);
    if (hasPageBeenRendered.current["usrFirstLoad"]) {
      //everytime we make request, set loading to be true
      setLoading(true);
      setError(false);
      //query the api
      axios
        .post(
          "/search",
          JSON.stringify({ searchReq, categoryField, pageNum }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => {
          setResults([...new Set([...searchResults, ...res.data.data])]);
          //set loading to false now that api call is done
          setLoading(false);
          //check if there are more pages to scroll through from the backend
          if (pageNum !== res.data.pagination.total_pages) {
            //reassign setHasMore to true for observer callbac func
            setHasMore(true);
          }
        })
        .catch((err) => {
          if (err.response) {
            setErrMsg(`${err.response.data}`);
            setError(true);
          }
          //call useEffect for every change in didSubmit and pageNum state
        });
    }
    hasPageBeenRendered.current["usrFirstLoad"] = true;
    //cancel additional requests to api since every new character to searchReq is causing useEffect to change
  }, [didSubmit, pageNum]);
  //return all the state from our hook
  return { isLoading, error, searchResults, hasMore, errMsg };
}
