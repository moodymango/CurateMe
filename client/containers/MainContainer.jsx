import React, { Component } from 'react';
import Navbar from '../components/navBar.jsx';
import SignUp from '../components/signup.jsx'

class MainContainer extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <div className="container">
          <div className="outerBox">
            <Navbar />
            <SignUp />
                <p>Curate Your Own Collection</p>
          </div>
        </div>
      );
    }
  
  }

  export default MainContainer;