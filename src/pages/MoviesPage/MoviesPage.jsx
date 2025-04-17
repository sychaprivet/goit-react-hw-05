import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const fetchMoviePage = useCallback(async (searchValue) => {
    if (!searchValue) return;
    setLoading(true);
    setError(null);

    const encodedQuery = encodeURIComponent(searchValue);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&include_adult=false&language=en-US&page=1`;

    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDYzYzhkMGJkMWYxODgyNDdkNjZkNmY1N2FkMDdmNSIsIm5iZiI6MTcyOTM0Mzg5Ni43OTI5MjQsInN1YiI6IjY3MTNhZTBlMGNiNjI1MmY5OTA4NGYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3O4SOYgYfKL7jch1mM75yH-ictbmCFAh3VBoQx0Kbs",
      },
    };

    try {
      const { data } = await axios.get(url, options);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movie data", error);
      setError("Failed to fetch movie data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      fetchMoviePage(query);
    }
  }, [query, fetchMoviePage]);

  const handleSearchSubmit = (searchValue) => {
    setSearchParams({ query: searchValue });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearchSubmit} defaultValue={query} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
