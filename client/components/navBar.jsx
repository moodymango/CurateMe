import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav>
        <ul className="navbar">
          <div className="right-nav">
            <li>
              <Link to="/"> CurateMe </Link>
            </li>
            <li>
              <Link to="/search"> Search for Artworks </Link>
            </li>
          </div>
          <div className="left-nav">
            <li>
              <Link to="/signup"> Sign Up </Link>
            </li>
            <li>
              <Link to="/login"> Login </Link>
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}
export default Navbar;
