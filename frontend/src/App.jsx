import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import SpotDetails from './components/SpotDetails/SpotDetails';
import SpotForm from './components/SpotForm/SpotForm';
import ManageSpots from './components/ManageSpots/ManageSpots';
import EditForm from './components/EditSpot/EditSpot';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/new',
        element: <SpotForm />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId/edit',
        element: <EditForm />
      },
      // {
      //   path: '/reviews/current'
      // },
      // {
      //   path: '/login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: '/signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
