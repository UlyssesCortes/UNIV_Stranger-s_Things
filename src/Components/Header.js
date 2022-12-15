import React from "react";
import { Link } from 'react-router-dom';
import './header.css'


const Header = () => {
    return (
        <nav className="nav">
            <p className="AppName">Stranger's Things</p>
            <ul className="listBox">
                <li><Link to='/' className="links">HOME</Link></li>
                <li><Link to='/posts' className="links">POSTS</Link></li>
                <li><Link to='/login' className="links">LOGIN</Link></li>
            </ul>
        </nav>
    )
}

export default Header