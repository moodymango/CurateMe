//maybe try following along and using react hooks?
import React, { useRef, useState, useEffect } from 'react';
//importing axios from my api folder
import axios from './api/axios';

const Login = () => {
  const userRef = useRef();
  //to set focus on the first input when the component loads
  const errRef = useRef();
  //need to set focus on error if error occurs

  //first 5 pieces state variables refering to user input, the empty string we are passing in is the initial state
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  //corresponds to an error we may have if for some reason, sign up fails
  const [errMsg, setErrMsg] = useState('');
  //let's us see a successful sign up for now
  //but will use reactRouter to a page after we've had a successful login
  const [success, setSuccess] = useState('');

  useEffect(() => {
    userRef.current.focus();
    //happens when the componet loads and will focus on the user area
  }, [])
  //empty out any error msg if user changes any of the following states (the required inputs)
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      //within axios.post, need to define registration url
      const response = await axios.post('/login',
        //need to provide payload(data we're sending to backend)
        //need to make sure the properties match the properties i've defined in my backend
        JSON.stringify({username: user, password: pwd}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        });
        //this is represents the response from the server
      console.log('response is =>', response)
      //reassign so user knows they've successfully made an account
      setSuccess(true);
    }
    catch (err) {
      if(!err.response){
        setErrMsg('No server response')
      } else if(err.reponse?.status === 400) {
        setErrMsg('Incorrect username or password')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <> 
    {/* ternary which checks whether or not user has succesfully made an account */}
    {/* shows either account has been created OR the form which user submits the information */}
    {success? (
     <section>
         <h1>Welcome {user}! </h1>
         <br/ >
         <p>
             {/* put redirect router here */}
             <a href= "#"> Go to your dashboard</a>
         </p>
     </section>
     ) : (
     //section, using a semantic element
     //at top of section, displays any error message we get, aria-live has screen reader announce the error msg immediately when focus is set on this para
     //<form>
         // htmlFor in label and attribute for id MUST match for each input field
         //value, set that equal to the user state to make it a controlled input - crucial if we are going to clear inputs upon submission
     <section>
         <p ref = {errRef} className= {errMsg? "errmsg" : "offscreen"} aria-live="assertive">
             {errMsg}
         </p>
         <h1>Sign Up</h1>
         <form onSubmit={handleSubmit}>
             <div className="input-container">
                 <label htmlFor='username'>Username </label>
                 <input 
                 type="text" 
                 id='username' 
                 //again, allows that immediate focus to be on this field
                 ref= {userRef}
                 onChange= {(e) =>setUser(e.target.value)}
                 value={user}
                 required 
                 />
             </div>
             <div className="input-container">
                 <label htmlFor='pwd'>Password </label>
                 <input 
                 //changing the type to password, changes the input field to dots so we cannot see the pass
                 type="password" 
                 id='pwd' 
                 onChange= {(e) =>setPwd(e.target.value)}
                 value={pwd}
                 required 
                 />
             </div>
         {/* don't need an onlick to the button because it's the only button in the form. will trigger a submit event! */}
             <div className="button-container">
                 {/* if we don't have these fields, button will be disabled */}
                 <button disabled ={!user || !pwd? true: false}>Sign In</button>
             </div>
         </form>
         <p>
             Don't have an account?
              {/* need to put router link here */}
              <a href ="#"> Sign Up</a>
         </p>
     </section>
     )}
     </>
 )
}

export default Login;