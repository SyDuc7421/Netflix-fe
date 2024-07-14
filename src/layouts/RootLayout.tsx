import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const RootLayout = () => {
  const isAutheticated = useSelector((state: RootState) => state.auth.email);
  if (!isAutheticated) {
    return <Navigate to="/auth" replace />;
  } else {
    return <Outlet />;
  }
};
