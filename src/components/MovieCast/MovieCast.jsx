import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from "../../api";
import css from './MovieCast.module.css';


const MovieCast = () => {
  const {movieId} = useParams();
  const [cast, setCast] = useState([]);

useEffect(()=>{
  const getMovieCast = async() => {
    try {
        const results = await fetchMovieCredits(movieId);
        if (results && results.length > 0 ) {
          setCast(results);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMovieCast();
  }, [movieId]);

return (
    <div>
      {cast.length > 0 ? (
        cast.map(info => (
          <div key={info.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${info.profile_path}`}
              alt={info.name}
              className={css.CastImg}
            />
            <p>{info.name}</p>
            <p>Character: {info.character}</p>
          </div>
        ))
      ) : (
        <p>No movie cast information</p>
      )}
    </div>
  );
};

export default MovieCast;