/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description 
 *
 * ************************************
 */

 import React, { Component } from 'react';
 //must wrap entire app component in BrowserRouter to make sure it is rendered at the root of my element hierachy
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Homepage from './components/homepage.jsx'
 import UserPage from './components/userpage.jsx';
 //need to make search results and user collections page

 
 import Navbar from './components/navBar.jsx';
 import MainContainer from './containers/MainContainer.jsx';

 class App extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <div>
          {/* //make sure all pages see navbar */}
          {/* <Router>
          <Navbar />
          <Routes>
          </Routes>
          </Router> */}

        {/* depending on if user is logged in or not, will see their own individual userpage */}

          <Routes>
            <Route exact path = '/' element= {<Homepage/>}/>
            {/* <Route path="/search" element= {<SearchResults/>} /> */}
            <Route path="/:username" element= {<UserPage/>} />
            {/* //this route will go to different collections */}
            {/* <Route path="/username/:title" element={<UserCollections/>} /> */}
          </Routes>
        </div>
      );
    }
  }
  
  export default App;