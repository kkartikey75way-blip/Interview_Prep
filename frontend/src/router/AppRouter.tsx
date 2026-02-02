import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Interview from "../pages/Interview";
import InterviewHistory from "../pages/InterviewHistory";


const AppRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      //Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/interview/:track",
            element: <Interview />,
          },
          {
            path: "/interview/:track/history",
            element: <InterviewHistory />,
          },
        ],
      },
    ],
  },
//Public routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default AppRouter;
