import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';
import Challenges from '../pages/Challenges';
import ChallengeDetails from '../pages/ChallengeDetails';
import AddChallenge from '../pages/AddChallenge';
import PrivateRoute from '../provider/PrivateRoute';
import MyActivities from '../pages/MyActivities';
import AllTips from '../pages/AllTips';
import Contact from '../pages/Footer Page/Contact';
import AllEvents from '../pages/AllEvents';
import AccessibilityNote from '../pages/Footer Page/AccessibilityNote';
import PrivacyPolicy from '../pages/Footer Page/PrivacyPolicy';
import About from '../pages/Footer Page/About';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '', element: <Home /> },

      { path: 'challenges', element: <Challenges /> },

      {
        path: 'challenges/add',
        element: (
          <PrivateRoute>
            <AddChallenge />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-activities',
        element: (
          <PrivateRoute>
            <MyActivities />
          </PrivateRoute>
        ),
      },

      {
        path: 'all-tips',
        element: <AllTips />,
      },
      {
        path: 'events',
        element: <AllEvents />,
      },
      {
        path: 'challenges/:id',
        element: <ChallengeDetails />,
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'accessibility-note', element: <AccessibilityNote /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
