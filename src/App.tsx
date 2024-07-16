import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import AuthPage from "./pages/Auth";
import HomePage from "./pages/HomePage";
import ChooseAccountPage from "./pages/ChooseAccount";

import { RootLayout } from "./layouts/RootLayout";
import { AuthLayout } from "./layouts/AuthLayout";

import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/choosing-account"} />,
      },
      {
        path: "*",
        element: <Navigate to={"/homepage"} />,
      },
      {
        path: "homepage",
        element: <HomePage />,
      },
      {
        path: "choosing-account",
        element: <ChooseAccountPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </>
  );
}

export default App;
