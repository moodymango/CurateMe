import { useEffect, useState, useRef } from "react";
import axios from "axios";
// export default function favoriteArtwork() {
//   //what do I need passed in?
//   //title,artist(artist_title), image_url, date(date_display)

//   //set state for favorite
//   const [isFavorited, setFavorite] = useState(false);
//   const handleFavoriteChange = () => {
//     //change boolean of isFavorited
//     setFavorite((isFavorited) => !isFavorited);
//     //call axios to save the information in the backend
//     //query the api
//     axios.post(
//       "/:user/:title",
//       JSON.stringify({ title, artist_title, image_url, date_display }),
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//       .then((res) => {
//         setResults([...new Set([...searchResults, ...res.data.data])]);
//         //set loading to false now that api call is done
//         setLoading(false);
//         //check if there are more pages to scroll through from the backend
//         if (pageNum !== res.data.pagination.total_pages) {
//           //assign totalPage count to finalpage state
//           setFinalPage(res.data.pagination.total_pages);
//           //reassign setHasMore to true for observer callbac func
//           setHasMore(true);
//         }
//       })
//       .catch((err) => {
//         if (err.response) {
//           setErrMsg(`${err.response.data}`);
//           setError(true);
//         }
//       });
//     )
//   }
//   return { isLoading, error, searchResults, hasMore, errMsg, finalPage };
// }
