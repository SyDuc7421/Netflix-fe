import axios from "axios";
import { store } from "../store/store";
import { useRefresh } from "../hooks/authHook";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
  },
});

export type SuccessResponse<T> = {
  status: number;
  data: T;
};

export type ErrorResponse = {
  status: number;
  error: string;
  message: string;
};
export type ApiResponse<T> = SuccessResponse<T> & ErrorResponse;

instance.interceptors.request.use(
  function (config) {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { response, config } = error;
    const { refresh } = useRefresh();

    if (response.status === 401 || response.status === 403) {
      await refresh(); // Call refresh if access token is expired
      return instance.request(config);
    }
    const error_response: ErrorResponse = {
      status: response.status,
      error: response.data.error,
      message: response.data.message,
    };
    return error_response;
  }
);

// Handle logout request, API is protected.
type logoutResponseProps = {
  status: number;
  message: string;
};

export const logout = async () => {
  const response: ApiResponse<logoutResponseProps> = await instance.delete(
    "/auth/logout"
  );
  return response;
};

export default instance;
