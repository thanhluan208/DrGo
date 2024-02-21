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
import Schedule from "./screen/Scheduler";
import DoctorSchedule from "./screen/DoctorSchedule";
import routes from "./constants/route";
import DoctorScheduleAction from "./screen/DoctorScheduleAction";
import DoctorScheduleEdit from "./screen/DoctorScheduleEdit";
import Incomming from "./screen/Incomming";
import Doctor from "./screen/Doctor";
import Patient from "./screen/Patients";

const HomeWithErrorBoundary = withErrorBoundary(Home);
const LoginWithErrorBoundary = withErrorBoundary(Login);
const AppointmentsWithErrorBoundary = withErrorBoundary(Appointments);
const ScheduleWithErrorBoundary = withErrorBoundary(Schedule);
const DoctorScheduleWithErrorBoundary = withErrorBoundary(DoctorSchedule);
const DoctorScheduleActionWithErrorBoundary =
  withErrorBoundary(DoctorScheduleAction);
const DoctorScheduleEditWithErrorBoundary =
  withErrorBoundary(DoctorScheduleEdit);
const DoctorWithErrorBoundary = withErrorBoundary(Doctor);
const PatientWithErrorBoundary = withErrorBoundary(Patient);

const App = () => {
  //! State
  const { islogged } = useAuthentication();

  const router = createBrowserRouter([
    {
      path: routes.login,
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
          path: routes.appointment,
          element: <AppointmentsWithErrorBoundary />,
        },
        {
          path: "*",
          element: <Incomming />,
        },
        {
          path: "/",
          element: <HomeWithErrorBoundary />,
        },
        {
          path: routes.schedule,
          element: <ScheduleWithErrorBoundary />,
        },
        {
          path: `${routes.doctorSchedule}/:id`,
          element: <DoctorScheduleWithErrorBoundary />,
        },
        {
          path: `${routes.doctorSchedule}/:id/addNew`,
          element: <DoctorScheduleActionWithErrorBoundary />,
        },
        {
          path: `${routes.doctorSchedule}/:id/edit`,
          element: <DoctorScheduleEditWithErrorBoundary />,
        },
        {
          path: routes.doctor,
          element: <DoctorWithErrorBoundary />,
        },
        {
          path: routes.patient,
          element: <PatientWithErrorBoundary />,
        },
      ],
      loader: () => {
        if (!islogged) return redirect("/login");

        return null;
      },
      ErrorBoundary: (err) => {
        return <div>error: {JSON.stringify(err)}</div>;
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
