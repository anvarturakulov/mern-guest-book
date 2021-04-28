import React, {useState, useContext} from 'react';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import axios from 'axios'

import './auth-page.scss'
import { AuthContext } from '../../../context/authContext';


const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password : ''
    })

    const {login} = useContext(AuthContext)
    
    const changeHandler = (event) => {
        setForm({...form, [event.target.name] : event.target.value})
    }

    const registerHandler= async () => {
        try {
            await axios.post('https://blooming-ocean-32461.herokuapp.com/api/auth/registration', {...form},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response))
        } catch (error) {
            console.log(error)
        }
    }

    const loginHandler = async () => {
        try{
            await axios.post('https://blooming-ocean-32461.herokuapp.com/api/auth/login', {...form},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // console.log(response.data.userId);
                login(response.data.token, response.data.userId)
                
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className='container'>
                        <div className='auth-page'>
                            <Route path='/login' >
                                <h4>Авторизация</h4>
                                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                    <div className='row'>
                                        <div className='input-box'>
                                            <input
                                                type='email'
                                                name='email'
                                                className='validate'
                                                onChange = {changeHandler}
                                            />   
                                            <div className='label'>Email</div>
                                        </div>

                                        <div className='input-box'>
                                            <input
                                                type='password'
                                                name='password'
                                                className='validate'
                                                onChange = {changeHandler}
                                            />   
                                            <div className='label'>Пароль</div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <button 
                                            className='wawes-effect wawes-light btn blue'
                                            onClick={loginHandler}>
                                                Войти
                                        </button>
                                        <Link 
                                            className='btn-outline btn-reg'
                                            to='/registration'
                                            >
                                                Нет акаунта?
                                        </Link>
                                    </div>
                                </form>
                            </Route>
                            
                            <Route path='/registration'>
                                <h4>Регистрация</h4>
                                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                    <div className='row'>
                                        <div className='input-box'>
                                            <input
                                                type='email'
                                                name='email'
                                                className='validate'
                                                onChange = {changeHandler}
                                            />   
                                            <div className='label'>Email</div>
                                        </div>

                                        <div className='input-box'>
                                            <input
                                                type='password'
                                                name='password'
                                                className='validate'
                                                onChange = {changeHandler}
                                            />   
                                            <div className='label'>Пароль</div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <button 
                                            className='wawes-effect wawes-light btn blue'
                                            onClick={registerHandler}
                                            >
                                                Регистрация
                                        </button>
                                        <Link 
                                            className='btn-outline btn-reg'
                                            to='/login'>
                                                Уже есть акаунт?
                                        </Link>
                                    </div>
                                </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage
