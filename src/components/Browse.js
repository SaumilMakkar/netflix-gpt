import React from 'react'
import Header from './Header.js'
import MainContainer from './MainContainer.js';
import SecondaryContainer from './SecondaryContainer.js';
import GptSearch from './GptSearch.js'
import { useSelector } from 'react-redux';

import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
const Browse = () => {
  //Fetch data from TMBD API and update store
useNowPlayingMovies();
usePopularMovies();
const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
  

  return (
    <div>
        <Header/>
        {
          showGptSearch?<GptSearch/>: <><MainContainer/>
        <SecondaryContainer/>
        </>
        }
       
       
        {/*
Main container
  -video in bg
  -video title
Secondary container
  -movielist*n
    -cards*n   



        */}
    </div>
  )
}

export default Browse