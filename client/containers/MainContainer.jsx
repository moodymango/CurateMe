import React, { Component } from 'react';
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
            <Login />
                <p>Curate Your Own Collection</p>
          </div>
        </div>
      );
    }
  
  }

  export default MainContainer;