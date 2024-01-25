import "./App.css";
import React, { useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useAuthentication } from "./providers/AuthenticationProvider";
// import { Suspense } from "react";
import withErrorBoundary from "./HOCs/withErrorBoundary";
import Home from "./screen/Home";
import Login from "./screen/Login";
// import Appointments from "./screen/Appointments";
import DefaultLayout from "./components/DefaultLayout";
import FirebaseServices from "./services/firebaseServices";
import Appointments from "./screen/Appointments";

const HomeWithErrorBoundary = withErrorBoundary(Home);
const LoginWithErrorBoundary = withErrorBoundary(Login);
const AppointmentsWithErrorBoundary = withErrorBoundary(Appointments);
// const DefaultLayoutWithErrorBoundary = withErrorBoundary(DefaultLayout);

const App = () => {
  //! State
  const { islogged } = useAuthentication();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginWithErrorBoundary />,
      loader: () => {
        if (islogged) return redirect("/");
        return null;
      },
    },
    {
      element: <DefaultLayout />,
      children: [
        {
          path: "/appointment",
          element: <AppointmentsWithErrorBoundary />,
        },
        {
          path: "*",
          element: <HomeWithErrorBoundary />,
        },
      ],
      loader: () => {
        if (!islogged) return redirect("/login");

        return null;
      },
    },
  ]);

  //! Function
  useEffect(() => {
    FirebaseServices.onMessage()
      .then((payload) => {
        console.log("payload", payload);
        if (payload) {
          alert(
            "Message recieved hehe:" + JSON.stringify(payload) || "No payload"
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  });

  //! Render
  return <RouterProvider router={router} />;
};

export default App;
