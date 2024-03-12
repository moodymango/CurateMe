import React, { useState } from "react";
import axios from "./api/axios";
import { forwardRef } from "react";
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
  const [images, setImages] = useState("");
  const fetchImage = async () => {};

  const handleFavorite = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle("liked");
  };
  return (
    <div className="artwork_card" ref={ref}>
      <div id="artwork-card-buttons">
        {/* add onClick function that will save artwork to individual collection */}
        <button
          className="favorite-heart"
          type="button"
          onClick={handleFavorite}
        ></button>
      </div>
      <div
        id="art-image"
        style={{
          backgroundImage: `${IMAGE_URL}${image_id}${SMALL_IMAGE_URL}`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <img src={IMAGE_URL + image_id + SMALL_IMAGE_URL} alt={title} />
      </div>
      <div id="artwork_info">
        <span id="title">{title}</span>
        <span id="artist">{artist}</span>
      </div>
    </div>
  );
});

export default ArtworkCard;
