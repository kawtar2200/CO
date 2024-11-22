import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import './LoginSignup.css'

const LoginSignup = ({setShowLogin}) => {
    const [currentState,setCurrentState]=useState('Login')
  return (
    <div className='LoginSignup'>
       <form className='LoginSignup-container'>
        <div className='LoginSignup-title'>
            <h2>{currentState}</h2>
            <ImCross  className='cross' onClick={()=>setShowLogin(false)}/>
        </div>
        <div className='LoginSignup-inputs'>
            {currentState==="Login"?<></>:<input type='text' placeholder='Your name' required/>}
            <input type='email' placeholder='Your email' required/>
            <input type='password' placeholder='Your password' required/>

        </div>
        <button className='LoginSignup-btn'> {currentState==='Sign Up'?"Create account":"Login"}</button>
        <div className='button-check'>
            <input type='checkbox' required/>
            <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState==='Login'?<p className='p'>Create a new account ? <span onClick={()=>setCurrentState('Sign up')}>Click here</span></p>:
         <p>Already have an account ? <span onClick={()=>setCurrentState('Login')}>Login here</span></p>}
        
       
        </form> 
    </div>
  )
}

export default LoginSignup