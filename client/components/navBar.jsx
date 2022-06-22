import React, { Component } from 'react';
//will import a seach bar in order for the user to search
//link to help make nav bar
//https://cssdeck.com/blog/super-simple-horizontal-navigation-bar/#.Wuu9XNMvz9A

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
        <div>
            <ul id="nav">
                <div id ="right-nav">
                    <li><a href="/">Artsy Fartsy</a></li>
                    <li><a href="/">Home</a></li>
                </div>
                <div id ="left-nav">
                <li><a href="/signup">Sign-Up</a></li>
                <li><a href="/login">Login</a></li>
                </div>
            </ul>
        </div>
    )
  }
}
export default Navbar;