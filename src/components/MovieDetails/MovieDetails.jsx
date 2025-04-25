import { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../../api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import css from './MovieDetails.module.css';



const MovieDetails = ({ id }) => {
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await fetchMovieDetails(id);
        setMovie(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieById();
    
  }, [id]);

  const goBack = () => navigate(location.state?.from || '/');

  return (
    <div>
      <button type='button' onClick={goBack}>Go back</button>
      {movie && (
        <div className={css.MovieDetailsWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div>
            <h2 className={css.CommonInformation}>{movie.title}</h2>
            <p>User Score: {Math.ceil(movie.popularity)}%</p>
            <h3 className={css.CommonInformation}>Overview</h3>
            <p>{movie.overview}</p>
            <h3 className={css.CommonInformation}>Genres</h3>
            <ul>
              {movie.genres?.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <ul className={css.Additional}>
      <p>Additional information</p>
        <li className={css.AddList}>
          <Link state={{ from: location.state?.from }} to={`/movies/${id}/cast`}>Cast</Link>
        </li>
        <li className={css.AdditionalList}>
          <Link state={{ from: location.state?.from }} to={`/movies/${id}/reviews`}>Reviews</Link>
        </li>
      </ul>
    </div>
  );
};

export default MovieDetails;