import React, {useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import './navbar.scss'

const Navbar = () => {
    const {logout, isLogin, userEmail} = useContext(AuthContext)
    

    return (
        <div className="header-block">
            <div className='title'>Гостевая книга</div>
            <div className='link'>
            {      
                isLogin
                ? 
                    <div className='user-box'> 
                        <div>Вы вошли как : <span>{userEmail}</span></div>
                        <a href="/" onClick={logout}>Выйти</a>
                    </div>
                : <a href="/">Войти</a>
            }
            </div>
            
        </div>
    )
}

export default Navbar
