import React from 'react'
import classes from './SignUp.module.css'
import {Link}  from "react-router-dom"

 function Auth() {
  return (
    <section  className={classes.login}>
         {/* logo */}
          <Link>
            <img  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"  alt=""  />
          </Link>

         {/* form */}

         <div  className={classes.login_container}>
           <h1>Sign In</h1>
           <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="emial" />
            </div>
            <div>
              <label htmlFor="Password">Password</label>
              <input type="password" id="password" />
            </div>
            <button   className={classes.login_signInBUtton}>Sign In</button>
           </form>

           {/* agreement */}
           <p>
            By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our 
            Intereset based Ads Notice.
           </p>

           {/* Create accoutn btn */}
           <button className={classes.login_registerButton}>Create Your Amazon Account</button>
         </div>
    </section>
  )
}




export default Auth;