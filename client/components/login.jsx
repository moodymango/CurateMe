import React, { useRef, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext.jsx";
import axios from "axios";

const Login = () => {
  const { authUser, isLogged, setAuthenticatedUser } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    //happens when the componet loads and will focus on the user area
  }, []);
  //empty out any error msg if user changes any of the following states (the required inputs)
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //within axios.post, need to define registration url
      const response = await axios.post(
        "/login",
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("response data is", response.data);
      setAuthenticatedUser(response.data);
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        setErrMsg(`${err.response.data}`);
      }
      errRef.current.focus();
    }
  };
  return (
    <div className="login_page">
      {success ? (
        <section className="logged-in">
          <Redirect to={`/:${authUser}`} />
        </section>
      ) : (
        //section, using a semantic element
        //at top of section, displays any error message we get, aria-live has screen reader announce the error msg immediately when focus is set on this para
        //<form>
        // htmlFor in label and attribute for id MUST match for each input field
        //value, set that equal to the user state to make it a controlled input - crucial if we are going to clear inputs upon submission
        <section className="login">
          <p
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form className="login_form" onSubmit={handleSubmit}>
            <div className="login-container">
              <header className="login-header">
                <h2>Login</h2>
                <p style={{ margin: "0" }}>Enter your username and password</p>
              </header>
              <div className="login_input_field">
                <input
                  type="text"
                  className="login_input"
                  //again, allows that immediate focus to be on this field
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  placeholder="@Username"
                  required
                />
                <br></br>
                <input
                  //changing the type to password, changes the input field to dots so we cannot see the pass
                  type="password"
                  className="login_input"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <button id="login-btn" disabled={!user || !pwd ? true : false}>
              Sign In
            </button>
          </form>
          <p id="switch-login">
            Don't have an account yet?
            <Link to="/signup"> Sign up </Link>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
