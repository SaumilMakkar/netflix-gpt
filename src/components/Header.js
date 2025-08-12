import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser,removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user)
  const dispatch=useDispatch();
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
 
  const handleSignOut=()=>{
    signOut(auth).then(() => {
  // Sign-out successful.
  navigate('/')
}).catch((error) => {
  // An error happened.
  navigate('/error')
});
  };
  const handleGptSearchClick=()=>{
    //toggle gpt search button
    dispatch(toggleGptSearchView())
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
  }


  useEffect(()=>{
  const unsubscribe=onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const {uid,email,displayName,photoURL} = user;
    
    dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
    //redirect to browse page
  navigate('/browse')

    // ...
  } else {
    // User is signed out
    // ...
    dispatch(removeUser())
    navigate('/');
  
  }
});
return ()=>unsubscribe();
},[])
  return (
    <div>
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
        <img
          className="w-44 h-19"
          src={LOGO}
        />
        {user&&<div className="flex  items-center space-y-2">
          {showGptSearch&&<select className="p-2 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
            ))}
          
          </select>}
          <button className="py-2 my-2 px-4 m-2 bg-purple-800 text-white rounded-lg mx-4" onClick={handleGptSearchClick}>
           {showGptSearch?"HomePage":"Gpt Search" } 
            </button>
          <img
            className="w-12 h-12"
            alt="user-icon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="bg-red-500 text-white font-bold">SignOut</button>
        </div>}
      </div>
    </div>
  );
};

export default Header;