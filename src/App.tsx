import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";
import AuthPage from "./pages/Auth";
import HomePage from "./pages/HomePage";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
