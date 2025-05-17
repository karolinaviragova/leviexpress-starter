import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { App } from './components/App';
import { HomePage } from './pages/HomePage';
import { ReservationPage } from './components/ReservationPage/ReservationPage';
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "reservation/:id",
        element: <ReservationPage />
      }
    ]
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />
);

/*
Dále vytvořte komponentu ReservationPage. Tuto komponentu zobrazte na adrese /reservation. Zatím může také vracet pouze nadpis h2 s textem „Vaše e-jízdenka“, abychom viděli, že se na stránce něco děje. Obsah komponenty vytvoříme později.
*/
