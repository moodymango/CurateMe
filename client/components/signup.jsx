import React, { useRef, useState, useEffect } from "react";
import axios from "./api/axios";

import { Link, Redirect } from "react-router-dom";
//useRef - persist values between renders
//used to store mutable values that does not cause a re-render when changed
//useState  automatically rerenders our page
//all fields are required, so need to reflect that each text field has a valid attribute

//React state keeps track of two things, whether there is an error because user forgot to fill out a field
//or user successfully submitted their information

//INSTRUCTIONAL VIDEO FOR CREATING LOGIN COMPONENTS!
//https://www.youtube.com/watch?v=X3qyxo_UTR4 : left off at 13:18
//VIDEO FOR REGISTER COMPONENT
//https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd

//FUNCTIONAL COMPONENT
const SignUp = () => {
  const userRef = useRef();
  //to set focus on the first input when the component loads
  const errRef = useRef();
  //need to set focus on error if error occurs

  //first 5 pieces state variables refering to user input, the empty string we are passing in is the initial state
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
  }, [user, pwd, firstName, lastName]);

  const handleSubmit = async (e) => {
    //for form submission, prevents automatic reload of page after submission
    e.preventDefault();
    try {
      const response = await axios.post(
        "/signup",
        JSON.stringify({ username: user, password: pwd, firstName, lastName }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //this is represents the response from the server
      console.log("response is =>", response);
      //reassign so user knows they've successfully made an account
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        console.log("error is", err);
        setErrMsg("Sign up Failed");
      } else {
      }
    }
  };
  return (
    <>
      {/* ternary which checks whether or not user has succesfully made an account */}
      {/* shows either account has been created OR the form which user submits the information */}
      {success ? (
        <section className="acc-created">
          <h1>Welcome {user}. Your account has been created!</h1>
          <br />
          <p>
            {/* put redirect router here */}
            <Redirect to={`/:${user}`}> Go to your dashboard </Redirect>
          </p>
        </section>
      ) : (
        //section, using a semantic element
        //at top of section, displays any error message we get, aria-live has screen reader announce the error msg immediately when focus is set on this para
        //<form>
        // htmlFor in label and attribute for id MUST match for each input field
        //value, set that equal to the user state to make it a controlled input - crucial if we are going to clear inputs upon submission
        <section className="signup">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form className="signup_form" onSubmit={handleSubmit}>
            <div className="signup-container">
              <header className="signup-header">
                <h1>Sign Up</h1>
                <p style={{ margin: "0" }}>
                  Register in order to create and share your collections
                </p>
              </header>
              <div className="signup-input-field">
                <input
                  type="text"
                  className="signup_input"
                  //again, allows that immediate focus to be on this field
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  placeholder="@Username"
                  required
                />
                <input
                  //changing the type to password, changes the input field to dots so we cannot see the pass
                  type="password"
                  className="signup_input"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  placeholder="Password"
                  required
                />
                <input
                  type="text"
                  className="signup_input"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="First name: Pierre"
                  required
                />
                <input
                  type="text"
                  className="signup_input"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Last name: Renoir"
                  required
                />
                {/* don't need an onlick to the button because it's the only button in the form. will trigger a submit event! */}
              </div>
            </div>
            <button
              id="signup-btn"
              disabled={!user || !pwd || !firstName || !lastName ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p id="switch-login">
            Already have an account?
            <Link to="/login"> Login </Link>
          </p>
        </section>
      )}
    </>
  );
};

export default SignUp;
