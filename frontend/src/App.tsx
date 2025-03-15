import React, { JSX, Suspense } from 'react';
import Home from './pages/Home';
// import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom';
// import MoviesDetailsPage from './pages/MoviesDetailsPage';
// import AdminBanner from './pages/admin/AdminBanner';
// import SeeAllPage from './pages/SeeAllPage';
// import  Login from './pages/Login'
// import SeeAllActors from './pages/SellAllActors';

import { lazy } from "react";
import Spinner from './component/spinner/Spinner';
const MoviesDetailsPage = lazy(()=>import('./pages/MoviesDetailsPage'));
const AdminBanner = lazy(()=>import('./pages/admin/AdminBanner'));
const SeeAllPage = lazy(()=>import('./pages/SeeAllPage'));
const SeeAllActors = lazy(()=>import('./pages/SellAllActors'));
const Login = lazy(()=>import('./pages/Login'))
/**
 * Main App component for the application. This component sets up the routing for the application 
 * using the `HashRouter` and `Routes` components from `react-router-dom`. 
 * It defines all the routes for different pages such as Home, MoviesDetailsPage, 
 * AdminBanner, SeeAllPage, SeeAllActors, and Login.
 * 
 * @returns {JSX.Element} The rendered component
 */

const App: React.FC = (): JSX.Element => {
  return (
    <HashRouter>
      <Suspense  fallback={<Spinner/>} >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<MoviesDetailsPage/>} />
        <Route path='/admin' element={<AdminBanner/>} />
        <Route path='/allMovies' element={<SeeAllPage />} />
        <Route path='/allActors' element={<SeeAllActors />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;