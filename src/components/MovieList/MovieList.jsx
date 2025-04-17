import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={style.div}>
      {movies !== null &&
        movies.map((item) => {
          return (
            <Link
              state={{ from: location }}
              to={`/movies/${item.id}`}
              key={item.id}
            >
              <p>{item.original_title}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default MovieList;
