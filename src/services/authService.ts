import axios from "axios";
import { ApiResponse, ErrorResponse } from ".";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth`,
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { response } = error;
    const error_response: ErrorResponse = {
      status: response.status,
      error: response.data.error,
      message: response.data.message,
    };
    return error_response;
  }
);

// sign in API
export type signInRequestProps = {
  email: string;
  password: string;
};

export type signInResponseProps = {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export const signin = async (data: signInRequestProps) => {
  const response: ApiResponse<signInResponseProps> = await instance.post(
    "/sign-in",
    data
  );
  return response;
};

// sign up API
export type signUpRequestProps = {
  username: string;
  email: string;
  password: string;
};

export type signUpResponseProps = {
  username: string;
  email: string;
};

export const signup = async (data: signUpRequestProps) => {
  const response: ApiResponse<signUpResponseProps> = await instance.post(
    "/sign-up",
    data
  );
  return response;
};

export type refreshRequestProps = {
  refreshToken: string;
};

export type refreshResponseProps = {
  accessToken: string;
};

export const refresh = async (data: refreshRequestProps) => {
  const response: ApiResponse<refreshResponseProps> = await instance.post(
    "/refresh-token",
    data
  );
  return response;
};
