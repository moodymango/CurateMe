import React, { useState, useEffect} from 'react';
import axios from './api/axios';
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
    artworkId,
    largeImageURL
    } = props;
    //create state for image api calls
    //assuming I will be getting a url returned from my api call
    const [images, setImages] = useState('')
    const fetchImage = async () => {

    }
    //only need to display title, artist, date created, and medium,
    //artworkID will be used to save the results from search, which will be done on searchContainer
    return (
        <div className='search-results'>
            {/* seperate div in order to show artwork image */}
            {/* when user clicks on image, will be able to see a larger version */}
            <div id = "art-image">
                <img src ={imageURL} alt={title}/>
            </div>
            <div className="artworkCard" style = {{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="title">Title: </label>
                <span id="title">{title}</span>
                <label htmlFor="artist">Artist: </label>
                <span id="artist">{artist}</span>
                <label htmlFor="date">Date Created:</label>
                <span id="date">{date}</span>
                <label htmlFor="medium">Medium:</label>
                <span id="medium">{medium}</span>
                <div id = "artwork-card-buttons">
                    {/* add onClick function that will save artwork to individual collection */}
                    <button type = 'button'  >Add to Collection </button>
                </div>
            </div>
        </div>
    )
}

export default ArtworkCard;