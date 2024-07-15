import { toast } from "sonner";
import { refresh as refreshAction, remove } from "../store/authSlice";
import { store } from "../store/store";
import { logout } from "../services";
import { refresh as refreshAPI } from "../services/authService";

export const useRefresh = () => {
  const refresh = async () => {
    const refreshToken = store.getState().auth.refreshToken;
    if (!refreshToken) {
      return;
    }
    const response = await refreshAPI({
      refreshToken: refreshToken,
    });
    if (response && response.status === 200) {
      store.dispatch(refreshAction(response.data.accessToken));
    } else {
      store.dispatch(remove());
      toast.info("Token has expired", {
        description: "Please log in again",
      });
    }
  };

  return {
    refresh,
  };
};

export const useLogout = () => {
  const logoutFunction = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        toast.success("User logged out successfully");
        store.dispatch(remove());
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", {
        description: error.toString(),
      });
    }
  };
  return {
    logoutFunction,
  };
};
