import React, { JSX } from 'react';
import Home from './pages/Home';
// import './App.css'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import MoviesDetailsPage from './pages/MoviesDetailsPage';
import AdminBanner from './pages/admin/AdminBanner';
import SeeAllPage from './pages/SeeAllPage';
import  Login from './pages/Login'
import SeeAllActors from './pages/SellAllActors';
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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<MoviesDetailsPage/>} />
        <Route path='/admin' element={<AdminBanner/>} />
        <Route path='/allMovies' element={<SeeAllPage />} />
        <Route path='/allActors' element={<SeeAllActors />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
