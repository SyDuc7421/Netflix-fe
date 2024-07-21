import { useState } from "react";
import {
  accountResponseProps,
  addFavoriteMovie,
  addFavoriteRequestProps,
  createAccount,
  createAccountRequestProps,
  getAccountById,
  getAccounts,
  getAccountsResponseProps,
  getFavorites,
} from "../services/accountService";
import { toast } from "sonner";
import { store } from "../store/store";
import { add } from "../store/accountSlice";
import { movieResponseProps } from "../services/movieService";

export const useAccounts = () => {
  const [data, setData] = useState<getAccountsResponseProps>([]);
  const getAccountsRequest = async () => {
    try {
      const response = await getAccounts();
      if (response && response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    query: getAccountsRequest,
  };
};

export const useAccount = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [account, setAccount] = useState<accountResponseProps>();

  const fetchAccountById = async (accountId: string) => {
    try {
      const response = await getAccountById({ accountId });
      if (response && response.status === 200) {
        setIsSuccess(true);
        setAccount(response.data);
        store.dispatch(add(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isSuccess,
    data: account,
    query: fetchAccountById,
  };
};

export const useCreateAccount = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [accountInfo, setAccoutInfo] = useState<accountResponseProps>();

  const createNewAccountRequest = async (data: createAccountRequestProps) => {
    try {
      const response = await createAccount(data);

      if (response && response.status === 201) {
        setIsSuccess(true);
        setAccoutInfo(response.data);
        toast.success("New account created successfully");
      } else {
        setIsSuccess(false);
        toast.error("Creating a new account failed", {
          description: response.message,
        });
      }
    } catch (error: any) {
      console.log(error);
      setIsSuccess(false);
      toast.error("Creating a new account failed", {
        description: error.toString(),
      });
    }
  };

  return {
    isSuccess,
    data: accountInfo,
    mutation: createNewAccountRequest,
  };
};

export const useAddFavorite = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const addFavoriteMovieRequest = async (data: addFavoriteRequestProps) => {
    try {
      const response = await addFavoriteMovie(data);
      if (response && response.status === 200) {
        setIsSuccess(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
    }
  };

  return {
    isSuccess,
    mutate: addFavoriteMovieRequest,
  };
};

export const useFavorite = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [movies, setMovies] = useState<movieResponseProps[]>([]);

  const getFavoriteListRequest = async (accountId: string) => {
    try {
      const response = await getFavorites(accountId);
      if (response && response.status === 200) {
        console.log(response.data);
        setIsSuccess(true);
        setMovies(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isSuccess,
    data: movies,
    query: getFavoriteListRequest,
  };
};
