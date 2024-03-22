import React, { useRef, useState, useEffect } from "react";
// import { useAuth } from "../components/Contexts/AuthContext.jsx";
import axios from "axios";

import { Link, Redirect } from "react-router-dom";

const SignUp = () => {
  //set focus on the first input when the component loads
  const userRef = useRef();
  const errRef = useRef();
  //user input state
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //error msg to communicate issues from backend
  const [errMsg, setErrMsg] = useState("");
  //successful login
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, firstName, lastName]);

  const handleSubmit = async (e) => {
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
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        setErrMsg(`${err.response.data}`);
      }
    }
  };
  return (
    <div className="sign_up">
      {success ? (
        <section className="acc-created">
          <Redirect to={"/login"} />
        </section>
      ) : (
        <section className="signup">
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
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  placeholder="@Username"
                  required
                />
                <input
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
    </div>
  );
};

export default SignUp;
