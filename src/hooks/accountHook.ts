import { useState } from "react";
import {
  accountResponseProps,
  createAccount,
  createAccountRequestProps,
  getAccountById,
  getAccounts,
  getAccountsResponseProps,
} from "../services/accountService";
import { toast } from "sonner";

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

export const useAccountById = () => {
  const [accountInfo, setAccoutInfo] = useState<accountResponseProps>();
  const getAccountByIdRequest = async (accountId: string) => {
    try {
      const response = await getAccountById({ accountId });
      if (response && response.status === 200) {
        setAccoutInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data: accountInfo,
    query: getAccountByIdRequest,
  };
};
