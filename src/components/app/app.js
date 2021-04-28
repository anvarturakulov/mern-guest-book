import React from 'react';
import './app.scss';
import Navbar from '../navbar';
import {BrowserRouter} from 'react-router-dom';
import {useRoutes} from '../../routes';
import {AuthContext} from '../../context/authContext';
import {useAuth} from '../../hooks/auth.hook'

function App() {
    const {login, logout, token, userId, isReady, userEmail} = useAuth();
    const isLogin = !!token
    const routes = useRoutes(isLogin)
    return (
      <AuthContext.Provider value ={{login, logout, token, userId, isReady, isLogin, userEmail}}>
        <div className="app">
          <BrowserRouter>
            <Navbar/> 
            {routes}   
          </BrowserRouter>
        </div>
      </AuthContext.Provider>
    )
  }

export default App;

