import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Play } from "lucide-react";

import { useMovies } from "../hooks/movieHook";
import { Button } from "./ui/button";
import { MovieDialog } from "./movie-model";

export const Billboard = () => {
  const navigate = useNavigate();
  const { data: movies, query: fetchMovies } = useMovies();
  const randomMovie = movies[Math.floor(movies.length * Math.random())];

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="relative aspect-video h-[56.25vw] w-full">
      <img
        src={randomMovie?.thumbnailUrl}
        alt="Thumbnail"
        className="h-[56.25vw] w-full object-cover brightness-75"
      />
      <div className="absolute left-[7%] top-[50%] flex flex-col gap-8">
        <h1 className="text-1xl w-1/2 font-bold text-white md:text-4xl lg:text-6xl">
          {randomMovie?.title}
        </h1>
        <span className="tex-base w-3/4 font-normal md:text-xl lg:w-1/2 lg:text-2xl">
          {randomMovie?.description}
        </span>
        <div className="flex items-center gap-6">
          <Button
            className="flex items-center gap-2"
            size="lg"
            variant="secondary"
            onClick={() => navigate(`/watch/${randomMovie?._id}`)}
          >
            <Play />
            <span className="text-xl font-semibold">Play</span>
          </Button>
          <MovieDialog movieInfo={randomMovie}>
            <Button
              className="flex items-center gap-2 bg-primary/70"
              size="lg"
              variant="default"
            >
              <Info />
              <span className="text-xl font-semibold">More info</span>
            </Button>
          </MovieDialog>
        </div>
      </div>
    </div>
  );
};
