import { useState } from "react";
import { getMovies, movieResponseProps } from "../services/movieService";

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
