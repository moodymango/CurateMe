import React, { useState, useEffect} from 'react';

const SearchResults = (props) => {
    const {searchResults} = props;
    //going to render an array of smaller card components, each containing artwork info
        //need to iterate through search result array, rendering a new card component each time, making sure to pass down relevant info pertaining to artwork.
    const artworkCards = [];
        artworkCards.forEach((el) => {
            //here is where we will render the artworks, make sure to put a key on to know which to identify
        })
    return (
        <div className='search-results'>
            <h1>represents artwork results</h1>
            {/* {artworkCards} */}
        </div>
    )
}

export default SearchResults;