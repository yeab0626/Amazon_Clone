import React, { useState, useContext, useEffect }from 'react'
import classes from './SignUp.module.css'
import {Link, useNavigate}  from "react-router-dom"
import { auth } from '../../Utility/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword}  from "firebase/auth"
import {DataContext}  from '../../Components/DataProvider/DataProvider'
import {Type}   from '../../Utility/action.type'
import {ClipLoader }  from 'react-spinners'



 function Auth() {
   const[email, setEmail] =useState("");
   const[password, setPassword] =useState("");
    const[error, setError] =useState("");
    const[loading, setLoading] = useState({
      signIn: false,
      signUp:false
    })

    const [{user}, dispatch] = useContext(DataContext)
    const navigate = useNavigate()

    useEffect (() => {
       console.log(user)
    }, [user])

const authHandler = async (e) => {
  e.preventDefault();
  setError("");
  const action = e.currentTarget.name.toLowerCase(); // always lowercase

  try {
    if (action === "signin") {
      setLoading({ ...loading, signIn: true });

      const userInfo = await signInWithEmailAndPassword(auth, email, password);

      dispatch({
        type: Type.SET_USER,
        user: userInfo.user
      });
      setLoading({ ...loading, signIn: false });
      navigate("/"); // redirect after sign-in
    } else if (action === "signup") { // lowercase here
      setLoading({ ...loading, signUp: true });

      const userInfo = await createUserWithEmailAndPassword(auth, email, password);

      dispatch({
        type: Type.SET_USER,
        user: userInfo.user
      });
      setLoading({ ...loading, signUp: false });
      navigate("/"); // redirect after sign-up
    }
  } catch (err) {
    setError(err.message);
    console.log(err);
    setLoading({ signIn: false, signUp: false });
  }
};




// console.log(password, email)

  return (
    <section  className={classes.login}>
         {/* logo */}
          <Link to="/">
            <img  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"  alt=""  />
          </Link>

         {/* form */}

         <div  className={classes.login_container}>
           <h1>Sign In</h1>
           <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
            </div>
            {error && <p className={classes.error}>{error}</p>}
            <div>
              <label htmlFor="Password">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
            </div>
            <button type="button" name="Signin" onClick={authHandler}  className={classes.login_signInBUtton}>{loading.signIn ? (<ClipLoader color="#000" size={15}/>) : ("Sign In")}</button>
           </form>

           {/* agreement */}
           <p>
            By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our 
            Intereset based Ads Notice.
           </p>

           {/* Create accoutn btn */}
           <button type="button" name="Signup" onClick={authHandler} className={classes.login_registerButton}>{loading.signUp ? (<ClipLoader color="#000" size={15}/>) : ("Create Your Amazon Account")}</button>
           {
              error && <small style={ {padding: "5px", color:"red"}}>{error}</small>
           }
         </div>
    </section>
  )
}




export default Auth;