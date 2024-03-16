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
import { AuthContext } from "./components/Contexts/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

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
      <AuthContext.Provider value={false}>
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
