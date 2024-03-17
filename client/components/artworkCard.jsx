import React, { useState } from "react";
import { forwardRef } from "react";
import favoriteArtwork from "./favoriteArtwork.js";

const {
  IMAGE_URL,
  LARGE_IMAGE_URL,
  SMALL_IMAGE_URL,
} = require("../../server/models/config.js");
const ArtworkCard = forwardRef((props, ref) => {
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  //160 small
  //220 px - medium

  // console.log("min and max heights of artworks are", minHeight, maxHeight);

  function checkSize(event) {
    const image = event.target;
    const imageHeight = image.getBoundingClientRect().height;
    const imageWidth = image.getBoundingClientRect().width;
    if (imageHeight > maxHeight) {
      setMaxHeight(imageHeight);
    }
    if (imageHeight < minHeight) {
      setMinHeight(imageHeight);
    }
    // console.log("image width, height", imageWidth, imageHeight);
    let grid = document.getElementsByClassName("query-results"),
      rowGap = parseInt(
        window.getComputedStyle(grid[0]).getPropertyValue("grid-row-gap")
      ),
      rowHeight = parseInt(
        window.getComputedStyle(grid[0]).getPropertyValue("grid-auto-rows")
      );
    const parentEl = image.parentElement;
    const artworkContent = parentEl.parentElement;
    const artworkCard = artworkContent.parentElement;
    // console.log("artwork card is ", artworkCard);
    //new height each artwork card (card height + grid row gap)
    let artworkCardHeight = artworkCard.getBoundingClientRect().height + rowGap;
    //net height of implicit row track (grid row gap + implicit grid row track)
    let netHeight = rowGap + rowHeight;
    //spanning for each artwork card depending on card height
    let rowSpan = Math.ceil(artworkCardHeight / netHeight);
    // let rowSpan = Math.ceil(artworkCardHeight / rowHeight);
    //assign each item a gridRowEnd property with calulated row span
    console.log("element height and rowSpan", artworkCardHeight, rowSpan);
    artworkCardHeight.style.gridRowEnd = "span " + rowSpan;

    // image.classList.add(".artwork_card_max_width");

    //if image is not taking the full dimensions of its parent,
    // if (
    //   image.getBoundingClientRect().width <
    //     parentEl.getBoundingClientRect().width ||
    //   image.getBoundingClientRect().height <
    //     parentEl.getBoundingClientRect().height
    // ) {
    //   image.classList.remove(".artwork_card_max_width");
    //   image.classList.add("artwork_card_max_height");
    // }
    image.style.opacity = 1;
  }
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
          {/* add onClick function that will save artwork to individual collection */}
          <button
            className="favorite-heart"
            type="button"
            onClick={handleFavorite}
          ></button>
        </div>
        <div className="artwork_card_image">
          <img
            onLoad={checkSize}
            src={IMAGE_URL + image_id + SMALL_IMAGE_URL}
            alt={title}
          />
        </div>
        {/* <img
          onLoad={checkSize}
          src={IMAGE_URL + image_id + SMALL_IMAGE_URL}
          alt={title}
        /> */}
        <div id="artwork_info">
          <span id="title">{title}</span>
          <span id="artist">{artist}</span>
        </div>
      </div>
    </div>
  );
});

export default ArtworkCard;
