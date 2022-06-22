import React, { Component } from 'react';
import Navbar from '../components/navBar.jsx';

class MainContainer extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <div className="container">
          <div className="outerBox">
            <Navbar />
                <p>Curate Your Own Collection</p>
            {/* <TotalsDisplay />
            <MarketsContainer /> */}
          </div>
        </div>
      );
    }
  
  }

  export default MainContainer;