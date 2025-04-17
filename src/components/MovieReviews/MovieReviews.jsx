import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDYzYzhkMGJkMWYxODgyNDdkNjZkNmY1N2FkMDdmNSIsIm5iZiI6MTcyOTM0Mzg5Ni43OTI5MjQsInN1YiI6IjY3MTNhZTBlMGNiNjI1MmY5OTA4NGYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3O4SOYgYfKL7jch1mM75yH-ictbmCFAh3VBoQx0Kbs",
    },
  };

  useEffect(() => {
    const fetchMovieReviews = async () => {
      if (!movieId) return;
      try {
        const { data } = await axios.get(url, options);
        setReviews(data);
      } catch (error) {
        setError("Error fetching movie reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId]);
  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p> Loading...</p>}
      <ul>
        {reviews !== null && reviews.results.length > 0 ? (
          reviews.results.map((result) => (
            <li key={result.id}>
              <p>Author: {result.author}</p>
              <p>{result.content}</p>
            </li>
          ))
        ) : (
          <p>We dont have reviews for wish movie</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
