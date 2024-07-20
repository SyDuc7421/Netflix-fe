import { movieResponseProps } from "../../services/movieService";
import { MovieCard } from "./movie-card";

interface MovieListProps {
  label: string;
  data: movieResponseProps[];
}

const MovieList = ({ label, data }: MovieListProps) => {
  return (
    <div className="flex flex-col items-start gap-4 px-4 lg:p-12">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-4xl">{label}</h1>
      <div className="grid grid-cols-5 gap-4">
        {data.map((item) => (
          <MovieCard key={item._id} info={item} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
