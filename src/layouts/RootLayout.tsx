import { Navigate, Outlet } from "react-router-dom";

export const RootLayout = () => {
  const isAutheticated = false;

  if (!isAutheticated) {
    return <Navigate to="/auth" replace />;
  } else {
    return <Outlet />;
  }
};
