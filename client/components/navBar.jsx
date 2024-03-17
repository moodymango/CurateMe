import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext.jsx";

function Navbar() {
  const { isLogged, authUser, setAuthenticatedUser } = useAuth();

  // //persist user login
  // useEffect(() => {
  //   const user = window.localStorage.getItem["user_name"];
  //   setAuthenticatedUser(user);
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("user_name", authUser);
  // }, [isLogged]);

  let user;

  if (authUser) {
    user = authUser[0].toUpperCase() + authUser.slice(1);
  }
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
          {isLogged && user ? (
            <li>
              <Link to={`/:${authUser}`}> {`${user}'s Homepage`} </Link>
            </li>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
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
