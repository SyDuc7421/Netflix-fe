import { useEffect } from "react";
import { Billboard } from "../components/billboard";
import { Headers } from "../components/header";
import MovieList from "../components/movies-list/movie-list";
import { useMovies } from "../hooks/movieHook";

const HomePage = () => {
  const { data: movies, query: fetchMovies } = useMovies();

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="relative h-full w-full bg-primary text-primary-foreground">
      <Headers />
      <Billboard />
      <div className="flex flex-col gap-8 pb-20">
        <MovieList label="Trending now" data={movies} />
        <MovieList label="Series" data={movies} />
      </div>
    </div>
  );
};

export default HomePage;
