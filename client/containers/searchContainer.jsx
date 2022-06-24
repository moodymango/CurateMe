import React, { useState, useEffect} from 'react';
import axios from '../components/api/axios';

//import children components
import SearchResults from '../components/searchResults.jsx';

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
            const apiResults = await axios.post('/search',
              //need to provide payload(data we're sending to backend)
              //need to make sure the properties match the properties i've defined in my backend
              JSON.stringify({searchReq}),
              {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
              })
              //save response data to searchResults state array
              //I am successfully saving state, but only saving 5 pieces when I should be saving 10.
              setResults(apiResults.data);
            //  setResults(searchResults => [...searchResults, apiResults.data])
          }
          catch (err) {
            if(err.response){
              setErrMsg('Search failed');
            } else if(err.reponse?.status === 400) {
              setErrMsg('Try a different term')
            } 
          }
    }
  //allows user to make calls via the api!
  const handleSubmit = async (e) => {
    e.preventDefault();
    //will make call to axios to make call to backend and set state
     fetchData();
     //now need to pass down search results state to child component for this site
  }
    return (
      // <h1>Hello World </h1>
      //SEARCH BAR, since for some reason we cannot find the search component??
      <div className='search-component'>

          <form id = "search-form" role = "search" onSubmit = {handleSubmit}>
            <label htmlFor='search'>
            <input title ="search for art" type = 'search' id = "search" onChange={(e) => setSearch(e.target.value)} value={searchReq} placeholder ="Degas" />
            </label>
            <button type = 'submit'>Search</button>
          </form>
          <div id ="search-results">
            <SearchResults searchResults = {searchResults} />
          </div>
      </div>
      
    )
}
export default SearchContainer;