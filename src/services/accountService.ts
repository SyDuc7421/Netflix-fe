import axios, { ApiResponse } from "../services/index";

export type createAccountRequestProps = {
  accountName: string;
};

export type accountResponseProps = {
  _id: string;
  userId: string;
  accountName: string;
  type: string;
  favorites: { movieId: string }[];
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
