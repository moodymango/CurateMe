import React, { Component } from 'react';
//must import link from react router in order to use
import {Link} from 'react-router-dom'
//will import a seach bar in order for the user to search
//import login and signup components!
//link to help make nav bar
//https://cssdeck.com/blog/super-simple-horizontal-navigation-bar/#.Wuu9XNMvz9A

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    return(
      //using nav tag for accessibility reasons
        <nav>
            <ul id="nav-container">
                <div id ="right-nav">
                  {/* link replaces the <a> tag essentially! */}
                 <li>
                    <Link to="/" > Artsy Fartsy </Link>
                  </li> 
                  <li>
                    <Link to="/" > Home </Link>
                  </li> 
                  <li>
                    <Link to="/search" > Search for Artworks </Link>
                  </li> 
                </div>
                <div id ="left-nav buttons ">
                  <li>
                    <Link to="/signup" > Sign Up </Link>
                  </li> 
                <li>
                  <Link to="/login" > Login </Link>
                </li> 
                </div>
            </ul>
        </nav>
    )
  }
}
export default Navbar;