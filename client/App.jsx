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

import React, { Component, useState, useEffect  } from 'react';

//tips on react router 
//https://ui.dev/react-router-cannot-get-url-refresh
//must wrap entire app component in BrowserRouter to make sure it is rendered at the root of my element hierachy
import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Homepage from './components/homepage.jsx'
import UserPage from './components/userpage.jsx';
//  import MainContainer from './containers/MainContainer.jsx';
//need to make search bar and search collections from 
import SearchContainer from './containers/searchContainer.jsx';
import Navbar from './components/navBar.jsx';
import SignUp from './components/signup.jsx'
import Login from './components/login.jsx'
//  import MainContainer from './containers/MainContainer.jsx';

const App = (props) => {
  //need an is logged state in order to keep track of whether or not user is logged in
  const [isLogged, setLogged] = useState(false);
  const handleLog = () =>{
    //sets isLogged to true
    setLogged(true)
  }

  return (
    <main>
      <Router>
      <Navbar />
        <Switch>
          <Route exact path = '/' component={Homepage} />
          <Route exact path = '/search' component={SearchContainer} /> 
          {/* <Route path = "/signup" component = {SignUp} />
          <Route path = "/login" component = {Login} /> */}
            <Route path = "/signup"
            render={() =>
              <SignUp
              
              />
            }
          />
          <Route path = "/login"
            render={() =>
              <Login

              />
            }
          />
          {/* <Route exact path = '/:username/collections/:title' component={} /> */}
          <Route exact path = '/:username/collections' component={UserPage} /> 
           <Route  exact path = '/:username' component={UserPage} />
        </Switch> 
      </Router>
    </main>
  );
}

  
export default App;