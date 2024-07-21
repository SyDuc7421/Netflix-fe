import { useEffect } from "react";
import { Billboard } from "../components/billboard";
import { Headers } from "../components/header";
import MovieList from "../components/movies-list/movie-list";
import { useMovies } from "../hooks/movieHook";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getAccountByIdThunk } from "../store/accountSlice";
import { useSelector } from "react-redux";
import { useFavorite } from "../hooks/accountHook";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data: movies, query: fetchMovies } = useMovies();
  const accountId = useSelector((state: RootState) => state.account._id);
  const { data: favorites, query: fetchFavoriteMoive } = useFavorite();

  useEffect(() => {
    fetchMovies();
    dispatch(getAccountByIdThunk({ accountId }));
    fetchFavoriteMoive(accountId);
  }, []);

  return (
    <div className="relative h-full w-full bg-primary text-primary-foreground">
      <Headers />
      <Billboard />
      <div className="mt-4 flex flex-col gap-4 bg-primary pb-20 lg:mt-0 lg:px-4">
        <MovieList label="Trending now" data={movies} />
        <MovieList label="My Favorites" data={favorites} />
      </div>
    </div>
  );
};

export default HomePage;
