import { createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import packages from "./pages/Home/packages";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/Payment";
import Profile from "./pages/Profile/Profile";
import DrivingLearerSignUp from "./pages/Signup/DriverLernerSignup";
import RiderSignUp from "./pages/Signup/RiderSignUp";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
    //   errorElement: <Errorpage/>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/rider-signup",
          element: <RiderSignUp />,
        },
        {
          path: "/driving-learner-signup",
          element: <DrivingLearerSignUp/>,
        },
        {
          path: "/payment/:id",
          element: <Payment/>,
        
        },
        {
          path: "/dashboard",
          element: <Dashboard/>,
        
        },
      ],
    },
   
  ]);
  export default router;