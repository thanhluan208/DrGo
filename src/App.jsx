import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Login from "./screen/Login";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useAuthentication } from "./providers/AuthenticationProvider";
import Home from "./screen/Home";
import Appointments from "./screen/Appointments";

const App = () => {
  //! State
  const { islogged } = useAuthentication();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (islogged) return redirect("/");
        return null;
      },
    },
    {
      element: <DefaultLayout />,
      children: [
        {
          path: "/appointments",
          element: <Appointments />,
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
      loader: () => {
        if (!islogged) return redirect("/login");

        return null;
      },
    },
  ]);

  //! Function

  //! Render
  return <RouterProvider router={router} />;
};

export default App;
