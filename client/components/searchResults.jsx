import React from "react";
import ArtworkCard from "./artworkCard.jsx";
import { forwardRef } from "react";
import Masonry from "react-masonry-component";

const SearchResults = forwardRef((props, ref) => {
  const { searchResults } = props;
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
    if (idx + 1 === searchResults.length) {
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
          artworkId={id}
          ref={ref}
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
          artworkId={id}
        />
      );
    }
  });
  return (
    <Masonry
      className="query-results"
      disableImagesLoaded={false}
      columnWidth={250}
      gutter={10}
    >
      {artworkCards}
    </Masonry>
  );
});

export default SearchResults;
