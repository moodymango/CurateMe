import React, { useState, useEffect} from 'react';
import axios from '../components/api/axios';

//import children components


const SearchContainer= (props) => {
    //set initial state of search bar to empty string
    const [searchReq, setSearch] = useState('');
    const [searchReqArtist, setArtistSearch] = useState('');
    //set initial state of results (which should be an array of objs)
    const [searchResults, setResults] = useState([]);
    //set error messaging 
    const [errMsg, setErrMsg] = useState('');
    //make async function to fetch data
     const fetchData = async () => {
        try{
            //within axios.post, need to define search url for backend
            const searchResults = await axios.post('/search',
              //need to provide payload(data we're sending to backend)
              //need to make sure the properties match the properties i've defined in my backend
              JSON.stringify({searchReq}),
              {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
              })
              //receiving an array of artworks, iterate through response and push to state
              searchResults.forEach((el) =>{
                setResults([...searchResults, el])
              })
            //will trigger a rendering of search results 
            console.log('results are =>', searchResults);
          }
          catch (err) {
            if(!err.response){
              setErrMsg('No server response')
            } else if(err.reponse?.status === 400) {
              setErrMsg('Try a different term')
            } else {
              setErrMsg('Search failed')
            }
          }
    }
  //allows user to make calls via the api!
  const handleSubmit = async (e) => {
    e.preventDefault();
    //will make call to axios to make call to backend
    fetchData()
  }
    return (

      //SEARCH BAR, since for some reason we cannot find the search component??
      <form role = "search" onSubmit = {handleSubmit}>
      <label htmlFor='search'>
      <input title ="search for art" type = 'search' id = "search" onChange={(e) => setSearch(e.target.value)} value={searchReq}  > </input>
      </label>
      <button type = 'submit'>Search</button>
    </form>
    )
}
export default SearchContainer;