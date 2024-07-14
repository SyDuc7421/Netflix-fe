import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth`,
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
    const { response } = error;
    const error_response: ErrorResponse = {
      status: response.status,
      error: response.data.error,
      message: response.data.message,
    };
    return error_response;
  }
);
export default instance;
