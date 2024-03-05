//maybe try following along and using react hooks?
import React, { useRef, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
//importing axios from my api folder
import axios from "./api/axios";

const Login = () => {
  const userRef = useRef();
  //to set focus on the first input when the component loads
  const errRef = useRef();
  //need to set focus on error if error occurs

  //first 5 pieces state variables refering to user input, the empty string we are passing in is the initial state
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  //corresponds to an error we may have if for some reason, sign up fails
  const [errMsg, setErrMsg] = useState("");
  //let's us see a successful sign up for now
  //but will use reactRouter to a page after we've had a successful login
  const [success, setSuccess] = useState("");

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
      //this is represents the response from the server
      console.log("response is =>", response);
      //MUST UPDATE STATE OF USER ID AND FIRST NAME AFTER WE RECEIVE A SUCCESSFUL RESPONSE FROM THE BACKEND
      //reassign so user knows they've successfully made an account
      setSuccess(true);
    } catch (err) {
      console.log("error on login is ", err);
      if (err.response) {
        setErrMsg(`${err.response.data}`);
      }
      errRef.current.focus();
    }
  };
  // style={{
  //   display: 'flex',
  //   flex-direction: 'column',
  //   align-items: 'center'
  // }}
  return (
    <>
      {/* ternary which checks whether or not user has succesfully made an account */}
      {/* shows either account has been created OR the form which user submits the information */}
      {success ? (
        <section className="logged-in">
          <h1>Welcome {user}! </h1>
          <br />
          <p>
            <Redirect to={`/:${user}`}> Go to your dashboard </Redirect>
          </p>
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
            {/* don't need an onlick to the button because it's the only button in the form. will trigger a submit event! */}
            {/* if we don't have these fields, button will be disabled */}
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
    </>
  );
};

export default Login;
