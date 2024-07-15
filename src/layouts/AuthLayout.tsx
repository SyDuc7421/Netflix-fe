import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const AuthLayout = () => {
  const isAutheticated = useSelector((state: RootState) => state.auth.email);

  if (!isAutheticated) {
    return (
      <div className="w-screen h-screen">
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/homepage" replace />;
  }
};
