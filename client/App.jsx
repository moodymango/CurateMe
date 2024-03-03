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
//https://stackoverflow.com/questions/51971449/react-warning-computedmatch-regarding-some-case-issues
//had error when placing a regular div inside the switch tags

//https://ui.dev/react-router-cannot-get-url-refresh
//must wrap entire app component in BrowserRouter to make sure it is rendered at the root of my element hierachy
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import UserPage from "./components/userpage.jsx";
import SearchContainer from "./containers/searchContainer.jsx";
import Navbar from "./components/navBar.jsx";
import SignUp from "./components/signup.jsx";
import Footer from "./components/footer.jsx";
import Login from "./components/login.jsx";

const App = (props) => {
  //need an is logged state in order to keep track of whether or not user is logged in
  const [isLogged, setLogged] = useState(false);
  const handleLog = () => {
    //sets isLogged to true
    setLogged(true);
  };
  return (
    <main className="app-parent">
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
            {/* <Route exact path = '/:username/collections/:title' component={} /> */}
            <Route exact path="/:username/collections" component={UserPage} />
            <Route exact path="/:username" component={UserPage} />
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
