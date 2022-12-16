import React from "react";
import { Link } from 'react-router-dom';
import './header.css'


const Header = ({ isLoggedIn, setIsLoggedIn, setToken }) => {

    const loggedOut = () => {
        setIsLoggedIn(false)
        setToken('')
    }

    const loggedIn = () => {

    }

    return (
        <nav className="nav">
            <p className="AppName">Stranger's Things</p>
            <ul className="listBox">
                <li><Link to='/home' className="links">HOME</Link></li>
                <li><Link to='/posts' className="links">POSTS</Link></li>
                {/* {!isLoggedIn} */}
                <li><Link to='/profile' className="links">PROFILE</Link></li>
                {!isLoggedIn ? <li><Link to='/login' className="links">LOGIN</Link></li> : <li><Link to='/login' className="links" onClick={() => { loggedOut() }}>LOGOUT</Link></li>}
            </ul>
        </nav>
    )
}

export default Header