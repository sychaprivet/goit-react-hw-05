import SearchBar from '../components/SearchBar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchKeywordMovies } from '../api';
import MovieList from '../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const results = await fetchKeywordMovies(query);
          setMovies(results);
        } catch (error) {
          console.log(error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleSearch = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };

  return (
   <>
   <SearchBar onSubmit={handleSearch}/>
   {movies && <MovieList movies={movies} />}
   </>
  )
}

export default MoviesPage