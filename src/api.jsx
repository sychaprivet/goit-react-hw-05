import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjhhMTA1ZDJjN2ExMzZiYWUzN2ExODYxODdhZDk3NiIsIm5iZiI6MTc0NTU5MDEyMi45Miwic3ViIjoiNjgwYjk3NmE0MWEzODJkNmEwODljMDNkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mmy1Nd0tx2j-XEciHjKVQUXm4maHf9u6Tr3rIJ2-ORU",
  },
  params: {
    include_adult: false,
    language: "en-US",
  },
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
fetchTrendingMovies();

export const fetchKeywordMovies = async (query) => {
  const searchOptions = { ...options, params: { ...options.params, query } };
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, searchOptions);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = async (movie_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movie_id}`, options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieCredits = async (movie_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movie_id}/credits`,
      options
    );
    console.log(response.data.cast);
    return response.data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/reviews`,
      options
    );
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
