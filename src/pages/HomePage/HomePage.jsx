import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDYzYzhkMGJkMWYxODgyNDdkNjZkNmY1N2FkMDdmNSIsIm5iZiI6MTcyOTM0Mzg5Ni43OTI5MjQsInN1YiI6IjY3MTNhZTBlMGNiNjI1MmY5OTA4NGYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3O4SOYgYfKL7jch1mM75yH-ictbmCFAh3VBoQx0Kbs",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(url, options);
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <div>Loading....</div>}
      {error && <p>Oops, some error {error}... 🤷‍♂️</p>}
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};
export default HomePage;
