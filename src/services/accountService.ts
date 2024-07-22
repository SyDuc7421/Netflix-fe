import axios, { ApiResponse } from "./index";
import { movieResponseProps } from "./movieService";

export type createAccountRequestProps = {
  accountName: string;
};

export type accountResponseProps = {
  _id: string;
  userId: string;
  accountName: string;
  type: string;
  favorites: string[];
};

export const createAccount = async (data: createAccountRequestProps) => {
  const response: ApiResponse<accountResponseProps> = await axios.post(
    "/account",
    data,
  );
  return response;
};

export type getAccountsResponseProps = {
  _id: string;
  name: string;
}[];

export const getAccounts = async () => {
  const response: ApiResponse<getAccountsResponseProps> =
    await axios.get("/account");
  return response;
};

export type getAccoutByIDProps = {
  accountId: string;
};

export const getAccountById = async (data: getAccoutByIDProps) => {
  const response: ApiResponse<accountResponseProps> = await axios.get(
    `/account/${data.accountId}`,
  );
  return response;
};

export type addFavoriteRequestProps = {
  accountId: string;
  movieId: string;
};
export type addFavoriteResponseProps = {
  status: number;
  message: string;
};

export const addFavoriteMovie = async (data: addFavoriteRequestProps) => {
  const response: ApiResponse<addFavoriteResponseProps> = await axios.patch(
    `/account/${data.accountId}/favorite`,
    {
      movieId: data.movieId,
    },
  );
  return response;
};

export const removeFavoriteMovie = async (data: addFavoriteRequestProps) => {
  const response: ApiResponse<addFavoriteResponseProps> = await axios.patch(
    `/account/${data.accountId}/unfavorite`,
    {
      movieId: data.movieId,
    },
  );
  return response;
};

export const getFavorites = async (accountId: string) => {
  const response: ApiResponse<movieResponseProps[]> = await axios.get(
    `/account/${accountId}/favorites`,
  );
  return response;
};
