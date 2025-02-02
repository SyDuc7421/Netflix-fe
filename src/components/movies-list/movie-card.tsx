import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import {
  ChevronDown,
  Minus,
  Play,
  Plus,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { movieResponseProps } from "../../services/movieService";
import { Button } from "../ui/button";
import { MovieDialog } from "../movie-model";
import { Hint } from "../hint";

interface MovieCardProps {
  info: movieResponseProps;
  isFavorite: boolean;
  onToggleFavorite: (
    accountId: string,
    movieId: string,
    isFavorite: boolean,
  ) => void;
}

export const MovieCard = ({
  info,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) => {
  const navigate = useNavigate();

  const accountId = useSelector((state: RootState) => state.account._id);

  return (
    <div className="group relative h-[12vw]">
      <img
        src={info.thumbnailUrl}
        alt="thumbnail"
        className="absulote duration left-0 top-0 aspect-video h-[12vw] rounded-sm object-cover opacity-75 transition delay-300 group-hover:opacity-0"
      />
      <div className="duration invisible absolute left-0 top-0 z-10 h-[12vw] -translate-y-[4vw] opacity-0 transition delay-300 group-hover:visible group-hover:scale-125 group-hover:opacity-100">
        <img
          src={info.thumbnailUrl}
          alt="thumbnail"
          className="aspect-video w-full rounded-t-sm object-cover"
        />
        <div className="flex flex-col gap-2 rounded-b-sm bg-slate-800 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hint label="Play it now" sideOffset={12} align="start">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                  onClick={() => navigate(`/watch/${info._id}`)}
                >
                  <Play />
                </Button>
              </Hint>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={() =>
                  onToggleFavorite(accountId, info._id, isFavorite)
                }
              >
                {isFavorite ? (
                  <Hint
                    label="Remove to favorites"
                    sideOffset={18}
                    align="start"
                  >
                    <Minus />
                  </Hint>
                ) : (
                  <Hint label="Add to favorites" sideOffset={18} align="start">
                    <Plus />
                  </Hint>
                )}
              </Button>
              <Hint label="Like a movie" sideOffset={12}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="invisible hidden items-center justify-center rounded-full group-hover:flex xl:visible"
                >
                  <ThumbsUp />
                </Button>
              </Hint>
              <Hint label="Unlike a movie" sideOffset={12}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="invisible hidden items-center justify-center rounded-full group-hover:flex xl:visible"
                >
                  <ThumbsDown />
                </Button>
              </Hint>
            </div>

            <MovieDialog movieInfo={info}>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Hint label="More info" sideOffset={18} align="end">
                  <ChevronDown />
                </Hint>
              </Button>
            </MovieDialog>
          </div>
          <div className="flex flex-col justify-start gap-[2px]">
            <h1 className="text-base font-semibold tracking-tight lg:text-xl">
              {info.title}
            </h1>
            <span className="text-xs lg:text-base">{info.genre}</span>
            <span className="text-xs lg:text-base">{info.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
