import { ChevronDown, Play, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { movieResponseProps } from "../../services/movieService";
import { Button } from "../ui/button";

interface MovieCardProps {
  info: movieResponseProps;
}

export const MovieCard = ({ info }: MovieCardProps) => {
  const onClick = () => {};
  return (
    <div className="group relative h-[12vw]">
      <img
        src={info.thumbnailUrl}
        alt="thumbnail"
        className="absulote duration left-0 top-0 aspect-video h-[12vw] rounded-sm object-cover opacity-75 transition delay-300 group-hover:opacity-0"
        onClick={onClick}
      />
      <div className="duration absolute left-0 top-0 z-10 h-[12vw] -translate-y-[4vw] opacity-0 transition delay-300 group-hover:scale-125 group-hover:opacity-100">
        <img
          src={info.thumbnailUrl}
          alt="thumbnail"
          className="aspect-video w-full rounded-t-sm object-cover"
        />
        <div className="flex flex-col gap-2 rounded-b-sm bg-slate-800 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Play />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Plus />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <ThumbsUp />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <ThumbsDown />
              </Button>
            </div>
            <Button size="icon" variant="secondary" className="rounded-full">
              <ChevronDown />
            </Button>
          </div>
          <div className="flex flex-col justify-start gap-[2px]">
            <h1 className="text-xl font-semibold tracking-tight">
              {info.title}
            </h1>
            <span className="text-base">{info.genre}</span>
            <span className="text-base">{info.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
