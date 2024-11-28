import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import AllSurahs from './components/AllSurahs';
import SurahDetail from './components/DetailSurah';
import AllDoa from './components/AllDoa';

// Membuat browser router dengan routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/surahs",
    element: <AllSurahs />,
  },
  {
    path: "/surahs-detail/:surahNumber",
    element: <SurahDetail />,
  },
  {
    path: "/doa",
    element: <AllDoa />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
