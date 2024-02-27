import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import { forwardRef } from "react";
const {
  IMAGE_URL,
  LARGE_IMAGE_URL,
  SMALL_IMAGE_URL,
} = require("../../server/models/config.js");
const ArtworkCard = forwardRef((props, ref) => {
  //need to create an add to collection button that adds the artwork to user's specific collection on profile
  //will also need to add a delete button so user is able to delete it from their collection
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
  //create state for image api calls
  //assuming I will be getting a url returned from my api call
  const [images, setImages] = useState("");
  const fetchImage = async () => {};
  //only need to display title, artist, date created, and medium,
  //artworkID will be used to save the results from search, which will be done on searchContainer
  return (
    <div className="artwork-cards" ref={ref}>
      {/* seperate div in order to show artwork image */}
      {/* when user clicks on image, will be able to see a larger version */}
      <div id="art-image">
        <img src={IMAGE_URL + image_id + SMALL_IMAGE_URL} alt={title} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="artworkInfo">
          <label htmlFor="title">Title: </label>
          <span id="title">{title}</span>
        </div>
        <div id="artworkInfo">
          <label htmlFor="artist">Artist: </label>
          <span id="artist">{artist}</span>
        </div>
        <div id="artworkInfo">
          <label htmlFor="date">Date Created: </label>
          <span id="date">{date}</span>
        </div>
        <div id="artworkInfo">
          <label htmlFor="medium">Medium: </label>
          <span id="medium">{medium}</span>
        </div>
        <div id="artwork-card-buttons">
          {/* add onClick function that will save artwork to individual collection */}
          <button type="button">Add to Collection </button>
        </div>
      </div>
    </div>
  );
});

export default ArtworkCard;
