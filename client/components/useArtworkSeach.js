import { useEffect, useState, useRef } from "react";
import axios from "axios";
//@source - webdevsimplified infinite scroll with react tutorial
export default function useArtworkSearch(
  searchReq,
  categoryField,
  pageNum,
  didSubmit
) {
  const hasPageBeenRendered = useRef(false);
  const userDidSubmit = useRef(false);
  if (didSubmit === true) {
    userDidSubmit.current = true;
  }
  //set load flags, initialize as true b/c we will load inside our app
  const [isLoading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [searchResults, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [finalPage, setFinalPage] = useState(1);
  const [error, setError] = useState(false);
  useEffect(() => {
    userDidSubmit.current = false;
    setResults([]);
  }, [searchReq, categoryField]);

  useEffect(() => {
    if (hasPageBeenRendered.current) {
      if (userDidSubmit.current) {
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
              //assign totalPage count to finalpage state
              setFinalPage(res.data.pagination.total_pages);
              //reassign setHasMore to true for observer callbac func
              setHasMore(true);
            }
          })
          .catch((err) => {
            if (err.response) {
              setErrMsg(`${err.response.data}`);
              setError(true);
            }
          });
      }
      userDidSubmit.current = false;
    }
    hasPageBeenRendered.current = true;
    //call useEffect for every change in didSubmit and pageNum state
  }, [didSubmit, pageNum]);
  //return all the state from our hook
  return { isLoading, error, searchResults, hasMore, errMsg, finalPage };
}
