import { useEffect, useState } from "react";
import axios from "axios";
const controller = new AbortController();
//@source - webdevsimplified infinite scroll with react tutorial
export default function useArtworkSearch(
  searchReq,
  categoryField,
  pageNum,
  didSubmit
) {
  //set load flags, initialize as true b/c we will load inside our app
  const [isLoading, setLoading] = useState(true);
  //set error messaging
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  //set initial state of results
  const [searchResults, setResults] = useState([]);
  //checks when we get to the end of the paginations, we don't want to keep calling our function once we've reached the end of the results
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setResults([]);
  }, [didSubmit]);
  useEffect(() => {
    //everytime we make request, set loading to be true
    setLoading(true);
    setError(false);
    console.log("we are sending a request now");
    console.log("search body is ", searchReq, categoryField, pageNum);
    //query the api
    try {
      //within axios.post, need to define search url for backend
      axios
        .post(
          "/search",
          JSON.stringify({ searchReq, categoryField, pageNum }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            signal: controller.signal,
          }
        )
        .then((res) => {
          setResults([...searchResults, ...res.data]);
          console.log("setting search results ", searchResults);
          console.log("total page number is ", res.pagination.total_pages);
          setHasMore(pageNum === res.pagination.total_pages);
          //no longer fetching data
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
        });
    } catch (err) {
      if (err.response) {
        setErrMsg(`${err.response.data}`);
      }
    }
    //cancel additional requests to api since every new character to searchReq is causing useEffect to change
  }, [didSubmit, pageNum]);
  //return all the state from our hook
  return { isLoading, error, searchResults, hasMore, errMsg };
}
