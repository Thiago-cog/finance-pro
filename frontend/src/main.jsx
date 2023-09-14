import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from "../src/components/auth/login/login";
import Register from '../src/components/auth/users/register';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  // {
  //   path: "/test",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/test",
  //       element: <Test />
  //     }
  //   ]
  // },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
