import { useSelector,useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { MOVIE_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const useMovieTrailer=(movieId)=>{
    const dispatch=useDispatch();
    const trailerVideo=useSelector(store=>store.movies.trailerVideo)

     const getMovieVideos=async()=>{
const data=await 
fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos", MOVIE_OPTIONS);
const json=await data.json();


const filterData=json.results.filter((video)=>video.type=='Trailer')
const trailer=filterData.length?filterData[0]:json.results[0];

dispatch(addTrailerVideo(trailer));



    }
    useEffect(()=>{
        if(!trailerVideo){
getMovieVideos();
        }
    },[])
}

export default useMovieTrailer;