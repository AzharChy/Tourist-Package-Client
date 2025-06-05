import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import root from "./root";
import Home from "./Home";
import AllPackages from "./Pages/AllPackages";
import MyBookings from "./Pages/MyBookings";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
   Component: root,
   children:[
    {
      index: true,
      element: <Home></Home>
    },
    {
      path: 'allPackages',
      element: <AllPackages></AllPackages>
    },
    {
      path: 'myBookings',
      element: <MyBookings></MyBookings>
    }
    ,
  {
    path: 'aboutUs',
    element: <AboutUs></AboutUs>
  },
  {
    path: 'login',
    element: <Login></Login>
  },
  {
    path: 'register',
    element: <Register></Register>
  }
   ]

  },
]);