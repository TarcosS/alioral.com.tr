import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages
import Home from './Components/Pages/Home';
import PersonalInfo from './Components/Pages/PersonalInfos';
import Works from './Components/Pages/Works';
import Projects from './Components/Pages/Projects';
import Announcements from './Components/Pages/Announcements';
import Consultancies from './Components/Pages/Consultancies';
import SpecialLinks from './Components/Pages/SpecialLinks';
import Lessons from './Components/Pages/Lessons';

//Authentication
import Login from './Components/Authentication/Login';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthenticationLayout from './Components/Authentication';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/personal-infos",
        element: <PersonalInfo />,
      },
      {
        path: "/works",
        element:<Works />,
      },
      {
        path: "/projects",
        element: <Projects/>,
      },
      {
        path: "/lessons",
        element: <Lessons/>,
      },
      {
        path: "/consultancies",
        element: <Consultancies/>,
      },
      {
        path: "/special-links",
        element: <SpecialLinks/>,
      }
    ]
  },
  {
    path: '/authentication',
    element: <AuthenticationLayout />,
    children: [
      {
        path: '/authentication/login',
        element: <Login />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
