import React from 'react';
//need to import card components in this file in order to render each artwork card
const ArtworkCard = (props) => {
   //will inherent all necessary properties from search results component
   //THIS FUNCTIONALITY WILL LIVE IN MY SEARCH CONTAINER FUNCTION
   //need to create an add to collection button that adds the artwork to user's specific collection on profile
   //will also need to add a delete button so user is able to delete it from their collection 
   const {
    artist,
    artwork_type ,
    classifications,
    date,
    imageURL,
    title,
    medium,
    artworkId 
    } = props;

    return (
        <div className='search-results'>
            <h1>represents artwork results</h1>
        </div>
    )
}

export default ArtworkCard;