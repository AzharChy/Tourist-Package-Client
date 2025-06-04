import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-red-300">Hello World</div>,
  },
]);