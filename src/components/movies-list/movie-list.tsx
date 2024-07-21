import { movieResponseProps } from "../../services/movieService";
import { MovieCard } from "./movie-card";

interface MovieListProps {
  label: string;
  data: movieResponseProps[];
}

const MovieList = ({ label, data }: MovieListProps) => {
  if (data.length === 0) {
    return;
  }
  return (
    <div className="flex flex-col items-start gap-4 px-4 lg:p-8">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-4xl">{label}</h1>
      <div className="grid w-full grid-cols-5 gap-4">
        {data.map((item) => (
          <MovieCard key={item._id} info={item} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
