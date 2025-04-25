import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api';


const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(()=>{
    const getMovieReviews = async () => {
      try{
        const results  = await fetchMovieReviews(movieId);
        if(results && results.length > 0 ) {
          setReviews(results);
        }
      } catch(error){
        console.log(error);
      };
    };
    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </div>
    ))
  ) : (
    <p>No movie reviews</p>
  )}
    </div>
  )
}

export default MovieReviews