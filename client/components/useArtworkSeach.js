import { useEffect, useState } from "react";
import axios from "../components/api/axios";
const controller = new AbortController();

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
  }, [searchReq]);
  useEffect(() => {
    //everytime we make request, set loading to be true
    setLoading(true);
    setError(false);
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
          setResults((prevBooks) => {
            [...new Set([...prevBooks, ...res.data])];
          });
          console.log("total page number is ", res.pagination.total_pages);
          setHasMore(pageNum === res.pagination.total_pages);
          //no longer fetching data
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    } catch (err) {
      if (err.response) {
        setErrMsg(`${err.response.data}`);
      }
    }
    //cancel additional requests to api since every new character to str search is causing useEffect to change
    return () => controller.abort();
  }, [didSubmit, pageNum]);
  //return all the state from our hook
  return { isLoading, error, searchResults, hasMore, errMsg };
}
