import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AuthPage from './components/pages/auth-page';
import MainPage from './components/pages/main-page';

export const useRoutes = (isLogin) =>{
    if (isLogin) {
       return (
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Redirect to ='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
           <Route path='/login' exact component={AuthPage}/>
            <Redirect to ='/login'/>
        </Switch>
    )
}