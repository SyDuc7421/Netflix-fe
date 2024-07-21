import axios, { ApiResponse } from "./index";

export type movieResponseProps = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
};

export const getMovies = async () => {
  const response: ApiResponse<movieResponseProps[]> = await axios.get("/movie");
  return response;
};

export const getMovieById = async (movieId: string) => {
  const response: ApiResponse<movieResponseProps> = await axios.get(
    `/movie/${movieId}`,
  );
  return response;
};
