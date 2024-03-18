/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React, { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import UserPage from "./components/userpage.jsx";
import SearchContainer from "./containers/searchContainer.jsx";
import Navbar from "./components/navBar.jsx";
import SignUp from "./components/signup.jsx";
import Footer from "./components/footer.jsx";
import Login from "./components/login.jsx";
import { AuthContext } from "./components/Contexts/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const App = () => {
  //need an is logged state in order to keep track of whether or not user is logged in
  const [authUser, setAuthUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const setAuthenticatedUser = (user) => {
    setIsLogged(!isLogged);
    sessionStorage.setItem("user", user);
    setAuthUser(user);
  };
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setAuthUser(user);
      setIsLogged(true);
    }
  }, []);
  return (
    <main className="app-parent">
      <AuthContext.Provider
        value={{ authUser, isLogged, setAuthenticatedUser }}
      >
        <Router>
          <div className="nav">
            <Navbar className="nav" />
          </div>
          <div className="home">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/search" component={SearchContainer} />

              <Route path="/signup" render={() => <SignUp />} />
              <Route path="/login" render={() => <Login />} />
              <PrivateRoute path="/:user" component={UserPage} />
              <Route exact path="/:user/collections" component={UserPage} />
              <Route exact path="/:user" component={UserPage} />
            </Switch>
          </div>
          <div className="foot">
            <Footer />
          </div>
        </Router>
      </AuthContext.Provider>
    </main>
  );
};

export default App;
