import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to={"/homepage"} />,
      },
      {
        path: "homepage",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
