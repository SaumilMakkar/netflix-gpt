import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import {openai} from '../utils/openAI.js'
import { API_OPTIONS } from '../utils/constants.js'
import { addGptMovieResults } from '../utils/gptSlice.js'


const GptSearchBar = () => {
const dispatch=useDispatch();
//search movie in tmdb

const fetchMovie = async (movie) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movie.trim()
  )}&include_adult=false&language=en-US&page=1`;
  
  const data = await fetch(url, API_OPTIONS);
  const json = await data.json();
  return json.results;
};
  
    //Make an api call to GPT API and get movie results
 const handleGptSearchClick = async () => {
const gptQuery="Act as a Movie Recommendation System and suggest some movies for the query: "+searchText.current.value+" . only give me names of 5 movies, comma separted.Example Result:Sholay,Dhamaal,Golmaal,Gadar,LOC"

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
     
      { role: "user", content:gptQuery},
    ],
  });

  const gptMovies=response.choices?.[0]?.message?.content.split(",");
  //For each movie,search tmdb api:

 const promiseArray= gptMovies.map(movie=>fetchMovie(movie)); //this will return an array of five promises

//resolve these promises
const tmdbResults=await Promise.all(promiseArray);

dispatch(addGptMovieResults({movieNames:gptMovies,movieResults:tmdbResults}));




};

    const language=useSelector(store=>store.config.lang);
    const searchText=useRef(null);
  return (
   

       <div className='pt-[10%] flex justify-center '>
        <form className=  'w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[language].gptSearchPlaceholder}/>
            <button className=' col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>{lang[language].search}</button>
        </form>



    </div>
    
  )
}

export default GptSearchBar