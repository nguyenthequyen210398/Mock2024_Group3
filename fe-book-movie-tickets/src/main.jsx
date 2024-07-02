import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.scss'
import HomePage from './pages/main/HomePage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import ChangePassword from './pages/auth/ChangePassword.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TicketMana from "./pages/ticket/TicketMana.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import MovieManagement from "./pages/movie/MovieManagement.jsx";

const router = createBrowserRouter([

  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [

    ],

  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/change-password',
    element: <ChangePassword />
  },
  {
    path: '/ticket-management',
    element: <TicketMana />
  },
  {
    path: '/movie-management',
    element: <MovieManagement />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/sign-out',
    element: <TicketMana />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />


  </React.StrictMode>,
)
