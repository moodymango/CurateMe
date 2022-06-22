import React, { Component } from 'react';

class MainContainer extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <div className="container">
          <div className="outerBox">
            <h1 id="header"> Artsy Fartsy </h1>
                <p>Are we still working?</p>
            {/* <TotalsDisplay />
            <MarketsContainer /> */}
          </div>
        </div>
      );
    }
  
  }

  export default MainContainer;