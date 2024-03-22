import React, { useState } from "react";
import { forwardRef } from "react";
import favoriteArtwork from "./favoriteArtwork.js";

const {
  IMAGE_URL,
  LARGE_IMAGE_URL,
  SMALL_IMAGE_URL,
} = require("../../server/models/config.js");
const ArtworkCard = forwardRef((props, ref) => {
  const {
    artist,
    artwork_type,
    classifications,
    date,
    image_id,
    title,
    medium,
    artworkId,
  } = props;
  //set state for favorited
  const [isFavorited, setIsFavorited] = useState(false);
  const { isLoading, errMsg, error } = favoriteArtwork(
    artworkId,
    title,
    artist,
    medium,
    date,
    image_id,
    isFavorited
  );
  const handleFavorite = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle("liked");
    setIsFavorited((prevFavorite) => !prevFavorite);
  };
  return (
    <div className="artwork_card" ref={ref}>
      <div className="artwork-content">
        <div id="artwork-card-buttons">
          <button
            className="favorite-heart"
            type="button"
            onClick={handleFavorite}
          ></button>
        </div>
        <div className="artwork_card_image">
          <img src={IMAGE_URL + image_id + SMALL_IMAGE_URL} alt={title} />
        </div>
        <div id="artwork_info">
          <span id="title">{title}</span>
          <span id="artist">{artist}</span>
        </div>
      </div>
    </div>
  );
});

export default ArtworkCard;
