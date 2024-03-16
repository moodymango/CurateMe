import { useState } from "react";
import axios from "axios";
export default function favoriteArtwork(
  id,
  title,
  artist_title,
  medium,
  date_display,
  image_id
) {
  //set state for favorited
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteChange = () => {
    setFavorite((isFavorited) => !isFavorited);
    //if is favorited is true, add to user favorite collection
    if (isFavorited) {
      //query the api
      axios.post(
        "/:user/collections",
        JSON.stringify({
          id,
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
          .then((res) => {
            console.log("Artwork was added to the user favorites", res.data);
          })
          .catch((err) => {
            if (err.response) {
              setErrMsg(`${err.response.data}`);
              setError(true);
            }
          })
      );
    } else {
      //else remove from user favorite collection
      axios.delete(
        "/:user/collections",
        JSON.stringify({
          id,
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
          .then((res) => {
            console.log(
              "Artwork was removed from the user favorites",
              res.data
            );
          })
          .catch((err) => {
            if (err.response) {
              setErrMsg(`${err.response.data}`);
              setError(true);
            }
          })
      );
    }
  };
  return { isFavorited };
}
