import React from "react";
import { Link } from 'react-router-dom';
import './header.css'


const Header = ({ isLoggedIn }) => {

    return (
        <>
            <nav className="nav" >
                <p className="AppName">Stranger's Things</p>
                <ul className="listBox">
                    <li><Link to='/home' className="links">HOME</Link></li>
                    <li><Link to='/posts' className="links">POSTS</Link></li>
                    {isLoggedIn && <li><Link to='/profile' className="links">PROFILE</Link></li>}
                    {!isLoggedIn ? <li><Link to='/login' className="links">LOGIN</Link></li> : <li><Link to='/logout' className="links">LOGOUT</Link></li>}
                </ul>
            </nav >

            <main>
                <div className='bulb'></div>
                <div className='bulb2'></div>
                <div className='bulb3'></div>
                <div className='bulb5'></div>
            </main>
        </>
    )
}

export default Header