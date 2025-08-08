import React from 'react'
import Login from './Login'

import Browse from './Browse'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {addUser, removeUser} from '..//utils/userSlice';
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

const Body = () => {
  const dispatch=useDispatch();
  
const appRouter=createBrowserRouter([
{
path:'/',
element:<Login/>
},
{
    path:'/browse',
    element:<Browse/>
},



]);

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const {uid,email,displayName,photoURL} = user;
    dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
    //redirect to browse page
   

    // ...
  } else {
    // User is signed out
    // ...
    dispatch(removeUser())
  
  }
});
},[])

  return (
    <div>
         <RouterProvider router={appRouter}>

         </RouterProvider>
        </div>
  )
}

export default Body