import React from 'react';
//need to import card components in this file in order to render each artwork card
const ArtworkCard = (props) => {
   //will inherent all necessary properties from search results component
   //need to create an add to collection button that adds the artwork to user's specific collection on profile
   //will also need to add a delete button so user is able to delete it from their collection 
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
                medium_display
            } = artObj;
            console.log('artwork obj is =>', artObj)
        })
    return (
        <div className='search-results'>
            <h1>represents artwork results</h1>
            {/* {artworkCards} */}
        </div>
    )
}

export default SearchResults;