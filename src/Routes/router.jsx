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
import BimanTicket from "../Homepage Component/BimanTicket";
import TourDetails from "../TourDetails/TourDetails";
import MyPackages from "./Pages/MyPackages";

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
       
           <AllPackages></AllPackages>
        
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
      element: <PrivateRoute>
        <AddTourPackage></AddTourPackage>
      </PrivateRoute>
    },
    {
      path: 'myPackages',
      element: <PrivateRoute>
        <MyPackages></MyPackages>
      </PrivateRoute>
    }
    ,
  {
    path: 'aboutUs',
    element: (
      
        <AboutUs></AboutUs>
     
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
    path: 'allPackages/package/:_id',
    element: <TourDetails></TourDetails>,
     loader: async ({ params }) => {
    const res = await fetch(`https://tour-server-drab.vercel.app/addedTourPackages/${params._id}`);
    if (!res.ok) {
      throw new Response("Failed to fetch tour", { status: res.status });
    }
    return res.json();
  },
  errorElement:<ErrorPage></ErrorPage>

  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  },
  {
    path: 'biman',
    element: <BimanTicket></BimanTicket>
  }
   ]

  },
]);