import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const { isLogged, user } = props;
  return (
    <nav>
      <ul className="navbar">
        <div className="left-nav">
          <li>
            <Link to="/"> CurateMe </Link>
          </li>
          <li>
            <Link to="/search"> Search for Artworks </Link>
          </li>
        </div>
        <div className="right-nav">
          {isLogged ? (
            <li>
              <Link to={`/:${user.id}`}>
                {" "}
                {`${user.first_Name}'s Homepage`}{" "}
              </Link>
            </li>
          ) : (
            <div>
              <li>
                <Link to="/signup"> Sign Up </Link>
              </li>
              <li>
                <Link to="/login"> Login </Link>
              </li>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
