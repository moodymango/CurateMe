import React from "react";
import ArtworkCard from "./artworkCard.jsx";
const SearchResults = (props) => {
  const { searchResults, lastArtworkElementRef } = props;
  const artworkCards = [];
  searchResults.forEach((artObj, idx) => {
    const {
      artist_title,
      artwork_type_title,
      classification_titles,
      date_display,
      image_id,
      title,
      medium_display,
      id,
    } = artObj;
    //if we have reached the last element in the arr, attach the ref tag
    if (idx + 1 === searchResults) {
      artworkCards.push(
        <ArtworkCard
          key={id}
          artist={artist_title}
          artwork_type={artwork_type_title}
          classifications={classification_titles}
          date={date_display}
          image_id={image_id}
          title={title}
          medium={medium_display}
          id={id}
          ref={lastArtworkElementRef}
        />
      );
    } else {
      artworkCards.push(
        <ArtworkCard
          key={id}
          artist={artist_title}
          artwork_type={artwork_type_title}
          classifications={classification_titles}
          date={date_display}
          image_id={image_id}
          title={title}
          medium={medium_display}
          id={id}
        />
      );
    }
  });
  return <div className="search-results">{artworkCards}</div>;
};

export default SearchResults;
