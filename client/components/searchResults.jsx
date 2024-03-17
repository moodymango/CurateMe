import React from "react";
import ArtworkCard from "./artworkCard.jsx";
import { forwardRef } from "react";
//set spanning for all artwork cards
//calculate height or spanning for any card based on the content wrapper height, row gap of grid, and size of implicit row tracks
// function resizeResultItem(item) {
//   var grid = document.getElementsByClassName("query-results"),
//     rowGap = parseInt(
//       window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
//     ),
//     rowHeight = parseInt(
//       window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
//     );
//   //new height each artwork card (card height + grid row gap)
//   let artworkCardHeight =
//     item.querySelector(".artwork-content").getBoundingClientRect().height +
//     rowGap;
//   //net height of implicit row track (grid row gap + implicit grid row track)
//   let netHeight = rowGap + rowHeight;

//   //spanning for each artwork card depending on card height
//   let rowSpan = Math.ceil(artworkCardHeight, netHeight);
//   //assign each item a gridRowEnd property with calulated row span
//   item.style.gridRowEnd = "span " + rowSpan;
// }
// function resizeResults() {
//   const allCards = document.getElementsByClassName("artwork_card");
//   allCards.forEach((card) => {
//     imagesLoaded(card, (instance) => {
//       let item = instance.elements[0];
//       resizeResultItem(item);
//     });
//   });
// }

const SearchResults = forwardRef((props, ref) => {
  const { searchResults } = props;
  const artworkCards = [];
  // let masonryEvents = ["load", "resize"];
  // masonryEvents.forEach((event) => {
  //   window.addEventListener(event, resizeAllMasonryItems);
  // });
  // resizeResults();
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
  return <div className="query-results">{artworkCards}</div>;
});

export default SearchResults;
