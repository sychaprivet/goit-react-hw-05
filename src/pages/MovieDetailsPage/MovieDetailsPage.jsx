import {
  useParams,
  useNavigate,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import style from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backLink = useRef(location.state?.from ?? "/movies");

  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDYzYzhkMGJkMWYxODgyNDdkNjZkNmY1N2FkMDdmNSIsIm5iZiI6MTcyOTM0Mzg5Ni43OTI5MjQsInN1YiI6IjY3MTNhZTBlMGNiNjI1MmY5OTA4NGYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3O4SOYgYfKL7jch1mM75yH-ictbmCFAh3VBoQx0Kbs",
    },
  };

  useEffect(() => {
    const fetchMoviePage = async () => {
      if (!movieId) return;
      try {
        const { data } = await axios.get(url, options);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMoviePage();
  }, [movieId]);

  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const goBack = () => {
    navigate(backLink.current);
  };

  return (
    <div>
      <button className={style.btn} onClick={goBack}>
        Go back
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={style.movieInfo}>
          <img
            className={style.imgMovie}
            src={
              movie.poster_path ? `${imageUrl}${movie.poster_path}` : defaultImg
            }
            alt={movie.title}
          />
          <div>
            <h1>{movie.original_title}</h1>
            <p className={style.item}>User score: {movie.vote_average}</p>
            <p className={style.item}>Overview: {movie.overview}</p>
            <p className={style.item}>Genres:</p>
            <ul>
              {movie.genres?.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              )) || <li>No genres available</li>}
            </ul>
          </div>
        </div>
      )}
      <div className={style.review}>
        <Link state={{ from: backLink.current }} to={`/movies/${movieId}/cast`}>
          Cast
        </Link>
        <Link
          state={{ from: backLink.current }}
          to={`/movies/${movieId}/reviews`}
        >
          Reviews
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
