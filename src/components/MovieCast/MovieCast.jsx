import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDYzYzhkMGJkMWYxODgyNDdkNjZkNmY1N2FkMDdmNSIsIm5iZiI6MTcyOTM0Mzg5Ni43OTI5MjQsInN1YiI6IjY3MTNhZTBlMGNiNjI1MmY5OTA4NGYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3O4SOYgYfKL7jch1mM75yH-ictbmCFAh3VBoQx0Kbs",
    },
  };

  useEffect(() => {
    const fetchMovieCast = async () => {
      if (!movieId) return;
      try {
        const { data } = await axios.get(url, options);
        setActors(data.cast);
      } catch (error) {
        setError("Failed to load cast information", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  const imageUrl = "https://image.tmdb.org/t/p/original";
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p> Loading...</p>}
      {actors.length > 0 ? (
        <ul className={style.listCast}>
          {actors.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `${imageUrl}${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
                width="150"
              />
              <p>{actor.name}</p>
              <p>as {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
