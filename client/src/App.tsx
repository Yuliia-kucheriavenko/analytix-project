import React, { useContext } from 'react';
import './App.css';
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { BrandPage } from './pages/BrandPage';
import { StoreContext } from './store/StoreContext';
import { HomePage } from './pages/HomePage';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/brand' element={<BrandPage/>} />
    </Routes>
  );
};

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LogInPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<HomePage />} />

    </Routes>
  );
};

const App = () => {
  const { store } = useContext(StoreContext);

  const isAuthenticated = store.isAuth;

  return (
    <div className="App">
      {/* <>
      <PublicRoutes />
      {isAuthenticated && <AuthRoutes />}
      </> */}
      {isAuthenticated ? <AuthRoutes /> : <PublicRoutes />}
    </div>
  );
};


export default observer(App);
