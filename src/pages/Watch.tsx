import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useMovie } from "../hooks/movieHook";
import { useEffect } from "react";

const WatchPage = () => {
  const { movieId } = useParams();
  const { data: movie, query: fetchMovieById } = useMovie();

  const navigate = useNavigate();

  useEffect(() => {
    if (movieId) {
      fetchMovieById(movieId);
    }
  });
  return (
    <div className="h-screen w-screen overflow-hidden bg-primary">
      <div className="fixed top-4 z-50 flex w-full items-center gap-4 px-4 text-primary-foreground">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/homepage")}
        >
          <ArrowLeft />
        </Button>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <span className="font-light">Watching:</span>
          <span>{movie?.title}</span>
        </div>
      </div>
      <video
        src={movie?.videoUrl}
        autoPlay
        controls
        className="h-full w-full"
      />
    </div>
  );
};

export default WatchPage;
