import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Billboard } from "../components/billboard";
import { Headers } from "../components/header";
import MovieList from "../components/movies-list/movie-list";

import { AppDispatch, RootState } from "../store/store";
import { getAccountByIdThunk } from "../store/accountSlice";

import { useMovies } from "../hooks/movieHook";
import {
  useAddFavorite,
  useFavorite,
  useRemoveFavorite,
} from "../hooks/accountHook";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [refresh, setRefresh] = useState<number>(0);

  const { data: movies, query: fetchMovies } = useMovies();
  const accountId = useSelector((state: RootState) => state.account._id);

  const { data: favorites, query: fetchFavoriteMoive } = useFavorite();
  const { mutate: addFavoriteMovie } = useAddFavorite();
  const { mutate: removeFavoriteMovie } = useRemoveFavorite();

  const onToggleFavorite = async (
    accountId: string,
    movieId: string,
    isFavorite: boolean,
  ) => {
    if (isFavorite) {
      await removeFavoriteMovie({ accountId, movieId }).then(() => {
        setRefresh((prev) => prev - 1);
      });
    } else {
      await addFavoriteMovie({ accountId, movieId }).then(() => {
        setRefresh((prev) => prev + 1);
      });
    }
  };

  useEffect(() => {
    fetchMovies();
    dispatch(getAccountByIdThunk({ accountId }));
    fetchFavoriteMoive(accountId);
  }, [refresh]);

  return (
    <div className="relative h-full w-full bg-primary text-primary-foreground">
      <Headers />
      <Billboard />
      <div className="mt-4 flex flex-col gap-4 bg-primary pb-20 lg:mt-0 lg:px-4">
        <MovieList
          label="Trending now"
          data={movies}
          onToggleFavorite={onToggleFavorite}
        />
        <MovieList
          label="My Favorites"
          data={favorites}
          isFavorite={true}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </div>
  );
};

export default HomePage;
