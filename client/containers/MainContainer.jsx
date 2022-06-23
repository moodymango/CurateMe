import React, { Component } from 'react';

import {Route, Routes} from 'react-router-dom'
//Routes - groups all my routes together, and ensures they take precedence from top to bottom
//Route - focuses on each individual route
//need to create a homepage component and a userpage component as well

//FOLLOW ALONG TO CREATE SPA WITH DIFFERENT COMPONENTS
//https://www.youtube.com/watch?v=I2UBjN5ER4s

//https://www.taniarascia.com/using-react-router-spa/


import Navbar from '../components/navBar.jsx';
import SignUp from '../components/signup.jsx'
import Login from '../components/login.jsx';

class MainContainer extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <div className="container">
          <div className="outerBox">
            {/* <Navbar /> */}
            {/* <SignUp /> */}
            {/* <Login /> */}
          </div>
        </div>
      );
    }
  
  }

  export default MainContainer;