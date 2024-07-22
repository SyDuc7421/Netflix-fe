import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Minus, Play, Plus, ThumbsDown, ThumbsUp } from "lucide-react";

import { RootState } from "../store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { movieResponseProps } from "../services/movieService";
import { useAddFavorite, useRemoveFavorite } from "../hooks/accountHook";

interface MovieDialogProps {
  children: React.ReactNode;
  movieInfo: movieResponseProps;
}

export const MovieDialog = ({ children, movieInfo }: MovieDialogProps) => {
  const navigate = useNavigate();

  const accountId = useSelector((state: RootState) => state.account._id);
  const favorites = useSelector((state: RootState) => state.account.favorites);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favorites.includes(movieInfo?._id),
  );

  const { mutate: addFavoriteMovie } = useAddFavorite();
  const { mutate: removeFavoriteMovie } = useRemoveFavorite();

  // TODO: Khi thực hiện xong unfavorite hay favorite thì danh sách yêu thích không cập nhật
  const toggleFavorite = async () => {
    if (!accountId || !movieInfo._id) {
      return;
    }
    if (isFavorite) {
      await removeFavoriteMovie({ accountId, movieId: movieInfo._id });
      setIsFavorite(false);
    } else {
      await addFavoriteMovie({ accountId, movieId: movieInfo._id });
      setIsFavorite(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex w-fit max-w-[1400px] flex-col items-center justify-center gap-0 rounded-md border-none bg-transparent p-0 ring-0">
        <div className="relative h-full w-full bg-primary">
          <img
            src={movieInfo?.thumbnailUrl}
            alt="thumbnail"
            className="aspect-video min-w-[680px] self-center justify-self-center rounded-t-md object-cover brightness-75"
          />
          <div className="absolute bottom-[7%] left-5 flex flex-col justify-center gap-4 text-primary-foreground">
            <span className="text-xl font-semibold tracking-tight md:text-2xl lg:text-5xl">
              {movieInfo?.title}
            </span>
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                className="flex items-center"
                onClick={() => navigate(`/watch/${movieInfo?._id}`)}
              >
                <Play className="mr-1.5 h-5 w-5" />
                <span className="text-xl font-semibold">Play</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
                onClick={toggleFavorite}
              >
                {isFavorite ? <Minus /> : <Plus />}
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <ThumbsUp />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <ThumbsDown />
              </Button>
            </div>
          </div>
        </div>
        <DialogTitle className="flex w-full flex-col gap-4 rounded-b-md bg-slate-800 p-2 text-primary-foreground lg:p-4">
          <span className="text-base font-medium lg:text-xl">
            {movieInfo?.genre}
          </span>
          <span className="text-base font-medium lg:text-xl">
            {movieInfo?.duration}
          </span>
          <DialogDescription className="w-5/6 text-sm font-medium text-primary-foreground/70 lg:text-base">
            {movieInfo?.description}
          </DialogDescription>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
