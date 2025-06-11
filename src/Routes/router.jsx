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
import PrivateRoute from "./Pages/Authentication/PrivateRoute";
import ErrorPage from "./Pages/ErrorPage";
import AddTourPackage from "./Pages/AddTourPackage";

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
      element:(
        <PrivateRoute>
           <AllPackages></AllPackages>
        </PrivateRoute>
      )
    },
    {
      path: 'myBookings',
      element: (
        <PrivateRoute>
          <MyBookings></MyBookings>
        </PrivateRoute>
      )
    },
    {
      path: 'addTourPackage',
      element: <AddTourPackage></AddTourPackage>
    }
    ,
  {
    path: 'aboutUs',
    element: (
      <PrivateRoute>
        <AboutUs></AboutUs>
      </PrivateRoute>
    )
  },
  {
    path: 'login',
    element: <Login></Login>
  },
  {
    path: 'register',
    element: <Register></Register>
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
   ]

  },
]);