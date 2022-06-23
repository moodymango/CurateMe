//maybe try following along and using react hooks?
import React, { useRef, useState, useEffect } from 'react';
//importing axios from my api folder
import axios from './api/axios';
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
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
    }, [user, pwd, email, firstName, lastName])
    //for form submission, prevents automatic reload of page after submission
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            //within axios.post, need to define registration url
            const response = await axios.post('/signup',
            //need to provide payload(data we're sending to backend)
            //need to make sure the properties match the properties i've defined in my backend
            JSON.stringify({username: user, password: pwd, email, firstName, lastName}),
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
            } else {
                setErrMsg('Sign up Failed')
            }
        }
    }
    return (
       <> 
       {/* ternary which checks whether or not user has succesfully made an account */}
       {/* shows either account has been created OR the form which user submits the information */}
       {success? (
        <section>
            <h1>Welcome {user}. Your account has been created!</h1>
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
                <div className="input-container">
                    <label htmlFor='email'>Email </label>
                    <input 
                    type="text" 
                    id='email' 
                    onChange= {(e) =>setEmail(e.target.value)}
                    value={email}
                    required 
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='firstName'>First Name </label>
                    <input 
                    type="text" 
                    id='firstName' 
                    onChange= {(e) =>setFirstName(e.target.value)}
                    value={firstName}
                    required 
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='lastName'>Last Name </label>
                    <input 
                    type="text" 
                    id='lastName' 
                    onChange= {(e) =>setLastName(e.target.value)}
                    value={lastName}
                    required 
                    />
            {/* don't need an onlick to the button because it's the only button in the form. will trigger a submit event! */}
                </div>
                <div className="button-container">
                    {/* if we don't have these fields, button will be disabled */}
                    <button disabled ={!user || !pwd || !email || !firstName || !lastName? true: false}>Sign Up</button>
                </div>
            </form>
            <p>
                Already have an account?
                 {/* need to put router link here */}
                 <a href ="#"> Sign In</a>
            </p>
        </section>
        )}
        </>
    )
}


//CLASS COMPONENT
// class SignUp extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         errorMessage: {};
//  
//       };
//       //must bind functionality to this component!
//       this.handleReqFields = this.handleReqFields.bind(this);
//     }
//     //need a function to check to see if user filled out all required fields
//     handleReqFields(event){
//         //use this to prevent webpage from automatically reloading
//         event.preventDefault();
//     }
//     render() {
//       return(
//         <div className="signup">
            // <form>
            //     <div className="input-container">
            //         <label>Username </label>
            //         <input type="text" name="uname" required />
            //         {renderErrorMessage("uname")}
            //     </div>
            //     <div className="input-container">
            //         <label>Password </label>
            //         <input type="password" name="pass" required />
            //         {renderErrorMessage("pass")}
            //     </div>
            //     <div className="input-container">
            //         <label>Email</label>
            //         <input type="text" name="email" required />
            //         {renderErrorMessage("uname")}
            //     </div>
            //     <div className="input-container">
            //         <label>First Name</label>
            //         <input type="password" name="first-name" required />
            //         {renderErrorMessage("pass")}
            //     </div>
            //     <div className="input-container">
            //         <label>Last Name</label>
            //         <input type="password" name="last-name" required />
            //         {renderErrorMessage("pass")}
            //     </div>
            //     <div className="button-container">
            //         <input type="submit" />
            //     </div>
            // </form>
//         </div>
//       );
//     }
  
//   }

  export default SignUp;