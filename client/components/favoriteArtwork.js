import { useState, useEffect, useRef } from "react";
import axios from "axios";
export default function favoriteArtwork(
  artworkId,
  title,
  artist_title,
  medium,
  date_display,
  image_id,
  isFavorited
) {
  //set load flags, initialize as true b/c we will load inside our app
  const [isLoading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const initialRender = useRef(true);
  useEffect(() => {
    setLoading(true);
    setError(false);
    if (!initialRender.current) {
      if (isFavorited) {
        //query the api
        axios
          .post(
            "/:user/collections",
            JSON.stringify({
              artworkId,
              title,
              artist_title,
              medium,
              date_display,
              image_id,
            }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("We did it, hooray!");
          })
          .catch((err) => {
            if (err.response) {
              setErrMsg(`${err.response.data}`);
              setError(true);
            }
          });
      } else {
        console.log("UNFAVORITED");
        //else remove from user favorite collection
        // axios.delete(
        //   "/:user/collections",
        //   JSON.stringify({
        //     id,
        //     title,
        //     artist_title,
        //     medium,
        //     date_display,
        //     image_id,
        //   }),
        //   {
        //     headers: { "Content-Type": "application/json" },
        //     withCredentials: true,
        //   }
        //     .then((res) => {
        //       console.log("Artwork was removed from the user favorites", res.data);
        //     })
        //     .catch((err) => {
        //       if (err.response) {
        //         setErrMsg(`${err.response.data}`);
        //         setError(true);
        //       }
        //     })
        // );
      }
    }
    initialRender.current = false;
  }, [isFavorited]);
  return { isLoading, error, errMsg };
}
