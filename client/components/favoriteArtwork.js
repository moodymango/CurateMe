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
  const [isFavorited, setFavorite] = useState(false);
  const [wasAdded, setWasAdded] = useState(false);
  const handleFavoriteChange = () => {
    setFavorite((isFavorited) => !isFavorited);
    //query the api
    axios.post(
      "/:user/:title",
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
  };
  return { isFavorited, wasAdded };
}
