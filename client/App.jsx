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
import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Homepage from './components/homepage.jsx'
import UserPage from './components/userpage.jsx';

//  import MainContainer from './containers/MainContainer.jsx';
//need to make search bar and search collections from 
import SearchContainer from './containers/searchContainer.jsx';
import Temp from './components/temp.jsx'

import Navbar from './components/navBar.jsx';
//  import MainContainer from './containers/MainContainer.jsx';

const App = (props) => {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path = '/' component={Homepage} />
          <Route exact path = '/search' component={SearchContainer} /> 
          <Route exact path = '/:username' component={UserPage} />
          {/* //this route will go to different collections */}
          {/* <Route path="/username/:title" element={<UserCollections/>} /> */}
        </Switch> 
      </Router>
    </main>
  );
}

  
export default App;