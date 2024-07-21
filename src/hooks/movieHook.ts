import { useState } from "react";
import {
  getMovieById,
  getMovies,
  movieResponseProps,
} from "../services/movieService";

export const useMovies = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [movies, setMovies] = useState<movieResponseProps[]>([]);
  const getMoviesRequest = async () => {
    const response = await getMovies();
    if (response && response.status === 200) {
      setIsSuccess(true);
      setMovies(response.data);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isSuccess,
    data: movies,
    query: getMoviesRequest,
  };
};

export const useMovie = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [movie, setMovie] = useState<movieResponseProps>();
  const getMovieRequest = async (movieId: string) => {
    const response = await getMovieById(movieId);
    if (response && response.status === 200) {
      setIsSuccess(true);
      setMovie(response.data);
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isSuccess,
    data: movie,
    query: getMovieRequest,
  };
};
