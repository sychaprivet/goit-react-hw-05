import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import {fetchTrendingMovies} from '../api'

const HomePage = () => {
  const [movies, setMovies] = useState([]);

useEffect(() => {
  const getTrendingMovies = async() => {
    try{
      const movies  = await fetchTrendingMovies();
      setMovies(movies);
    } catch (error) {
      console.log(error)
    }
  }
  getTrendingMovies();
}, [])

  return (
    <div>
      <h2>Trending Today</h2>
      {movies && <MovieList movies={movies} />}
    </div>
  )
}

export default HomePage