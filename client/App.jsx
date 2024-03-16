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

import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import UserPage from "./components/userpage.jsx";
import SearchContainer from "./containers/searchContainer.jsx";
import Navbar from "./components/navBar.jsx";
import SignUp from "./components/signup.jsx";
import Footer from "./components/footer.jsx";
import Login from "./components/login.jsx";
import AuthProvider from "./components/Contexts/AuthContext.jsx";

const App = (props) => {
  //need an is logged state in order to keep track of whether or not user is logged in
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const handleLog = () => {
    //sets isLogged to true
    setLogged(true);
  };

  return (
    <main className="app-parent">
      <Router>
        <div className="nav">
          <Navbar className="nav" isLogged={isLogged} user={user} />
        </div>
        <div className="home">
          <Switch>
            <Route exact path="/" component={Homepage} />
            {/* <Route exact path="/" component={UserPage} /> */}
            <Route exact path="/search" component={SearchContainer} />

            <Route
              path="/signup"
              render={() => (
                <SignUp handleLog={handleLog} setUserApp={setUser} />
              )}
            />
            <Route
              path="/login"
              render={() => (
                <Login handleLog={handleLog} setUserApp={setUser} />
              )}
            />
            {/* <Route exact path = '/:username/collections/:title' component={} /> */}
            <Route exact path="/:user/collections" component={UserPage} />
            <Route exact path="/:user" component={UserPage} />
          </Switch>
        </div>
        <div className="foot">
          <Footer />
        </div>
      </Router>
    </main>
  );
};

export default App;
