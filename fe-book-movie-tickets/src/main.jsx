import React from 'react'
import ReactDOM from 'react-dom/client'

import HomePage from './pages/main/HomePage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
// import LogIn from './pages/auth/LogIn.jsx'
// import ResetPassword from './pages/auth/ResetPassword.jsx'
import ChangePassword from './pages/auth/ChangePassword.jsx'
// import Register from './pages/auth/Register.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/auth/SignIn.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import App from './App.jsx'
import MovieDetails from './pages/movie/MovieDetails.jsx'
import TicketPurchase from './pages/ticket/TicketPurchase.jsx'

const router = createBrowserRouter([

  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
    ],

  },

  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/reset-password',
    element: <ForgotPassword />
  },
  {
    path: '/change-password',
    element: <ChangePassword />
  },
  {
    path: '/register',
    element: <SignUp />
  },

  {
    path: '/test',
    element: <App />
  },
  {
    path: '/movie/:id',
    element: <MovieDetails />,
  },
  {
    path: '/ticket-purchase/:id',
    element: <TicketPurchase />
  },




])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />


  </React.StrictMode>,
)
