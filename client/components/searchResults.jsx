import React from 'react';
//need to import card components in this file in order to render each artwork card
import ArtworkCard from './artworkCard.jsx';
const SearchResults = (props) => {
    const {searchResults} = props;
    //going to render an array of smaller card components, each containing artwork info
        //need to iterate through search result array, rendering a new card component each time, making sure to pass down relevant info pertaining to artwork.
    const artworkCards = [];
        searchResults.forEach((artObj) => {
            //here is where we will render the artworks, make sure to put a key on to know which to identify
            //destructure each artObj  during each iteration, and pass those same properties from the object to the card component
            const {
                artist_title, 
                artwork_type_title,
                classification_titles,
                date_display,
                imageURL,
                title,
                medium_display,
                artworkId
            } = artObj;

            artworkCards.push(
            <ArtworkCard 
                artist = {artist_title}
                artwork_type = {artwork_type_title}
                classifications = {classification_titles}
                date = {date_display}
                imageURL = {imageURL}
                title = {title}
                medium = {medium_display}
                artworkId = {artworkId}
            />)
        })
    return (
        <div className='search-results'>
            <h1>represents artwork results</h1>
            {artworkCards}
        </div>
    )
}

export default SearchResults;