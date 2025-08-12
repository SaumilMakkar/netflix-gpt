import React from 'react'
import Header from './Header'
import { useState,useRef } from 'react'
import { checkValidData } from '../utils/validate';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { BG_IMAGE, USER_AVATAR } from '../utils/constants';

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
const [isSignInForm,setisSignInForm]= useState(true);
const [errorMsg,seterrorMsg]=useState();

const email=useRef(null);
const password=useRef(null);
const name=useRef(null);
const dispatch=useDispatch();



const toggleSignUpForm=()=>{
setisSignInForm(!isSignInForm);


}

const handleButtonClick=()=>{
  // ...existing code...

  // Validate the form data
 const emailValue = email.current?.value || "";
const passwordValue = password.current?.value || "";




  const message = checkValidData(emailValue, passwordValue);
  seterrorMsg(message);

  if(message)return;
  //Sign In and Sign Up
  if(!isSignInForm){
    //Sign Up Logic
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user,{
      displayName:name?.current?.value,photoURL:USER_AVATAR
    })
    
    .then(()=>{
  const {uid,email,displayName,photoURL} = auth.currentUser;
  dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
 
})
    .catch((error)=>{
      seterrorMsg(error.message);
    })
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMsg(errorCode+'-'+errorMessage)
    // ..
  });

  }
  else{
    //Sign In Logic

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user=userCredential.user;
  
  // Profile updated!
  // ...
   updateProfile(user,{
      displayName:name?.current?.value,photoURL:"https://avatars.githubusercontent.com/u/150394809?v=4"
    })
 
})
    
    // ...
  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMsg(errorCode+"-"+errorMessage);
  });
  }

  

 
}


//Now do sign in/sign up

return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src={BG_IMAGE}>
        </img>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className=' w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70'>
        <h1 className='font-bold text-3xl pb-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
          <input
          ref={email} type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-670 text-black'/>
                    {!isSignInForm&&
                      


                      <input ref={name} type='text' placeholder='Full Name' className='p-2 my-2 w-full bg-gray-670 text-black'/>}
          <input ref={password} type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-670 text-black'/>
          <p className='py-2 text-red-600 font-bold' >{errorMsg}</p>
          <button className='py-4 my-6 bg-red-700 w-full rounded-lg ' onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
          <p className='py-2 cursor-pointer' onClick={toggleSignUpForm}>{isSignInForm?"New to Netflix? Sign Up Now":"Already A User?Sign In Now"}</p>

          
        </form>
    </div>
  )
}

export default Login