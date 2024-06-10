import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Root from './components/Root/Root';
import Content from './components/Content/Content';
import Auth from './components/Auth/Auth';

export default function App() {
  const authToken = useSelector((state) => state.auth.accessToken);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<Content />} />
    </Route>
  ));

  return (
    <>
      {!authToken
        ? <Auth />
        : <RouterProvider router={router} />
      }
    </>
  );
}
