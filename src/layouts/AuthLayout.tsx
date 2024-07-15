import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const AuthLayout = () => {
  const isAutheticated = useSelector((state: RootState) => state.auth.email);

  if (!isAutheticated) {
    return (
      <div className="h-screen w-screen">
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/choosing-account" replace />;
  }
};
