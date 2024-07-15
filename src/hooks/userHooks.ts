import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useCurrentUser = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  const email = useSelector((state: RootState) => state.auth.email);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken
  );
  return {
    username,
    email,
    accessToken,
    refreshToken,
  };
};
