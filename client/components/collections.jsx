import React, { useState, useEffect} from 'react';

//need to import card components in this file in order to render each artwork card
const CollectionsCard = (props) => {
   //will inherent all necessary properties from search results component
   //THIS FUNCTIONALITY WILL LIVE IN MY SEARCH CONTAINER FUNCTION
   //need to create an add to collection button that adds the artwork to user's specific collection on profile
   //will also need to add a delete button so user is able to delete it from their collection 
   const {
   title, 
   description
    } = props;

    //only need to display title, artist, date created, and medium,
    //artworkID will be used to save the results from search, which will be done on searchContainer
    return (
        <div className='artwork-cards'>
            {/* seperate div in order to show artwork image */}
            {/* when user clicks on image, will be able to see a larger version */}
            <div style = {{display: 'flex', flexDirection: 'column'}}>
                <div id="collectionsInfo" >
                    <label htmlFor="title">Title: </label> 
                    <span id="title">{title}</span>
                </div>
                <div id="collectionsInfo" >
                    <label htmlFor="info">Description: </label>
                    <span id="info">{description}</span>
                </div>
            </div>
        </div>
    )
}

export default CollectionsCard;