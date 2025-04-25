import { Outlet, useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails/MovieDetails';

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  return (
    <div>
      <MovieDetails id={movieId} />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;