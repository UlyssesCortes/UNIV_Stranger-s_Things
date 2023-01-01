import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react'
import './header.css'
import 'animate.css';


const Header = ({ isLoggedIn }) => {

    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const hambHeader = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <nav className="nav" >
                <p className="AppName">Stranger's Things</p>
                {(isMobile ?
                    <ul className="listBox">
                        <li ><Link to='/home' className="links">HOME</Link></li>
                        <li><Link to='/posts' className="links">POSTS</Link></li>
                        {isLoggedIn && <li><Link to='/profile' className="links">PROFILE</Link></li>}
                        {!isLoggedIn ? <li><Link to='/login' className="links">LOGIN</Link></li> : <li><Link to='/logout' className="links">LOGOUT</Link></li>}
                    </ul> :
                    <Hamburger size={25} onToggle={() => hambHeader()} />
                )}
            </nav >

            <main>
                <div className='bulb'></div>
                <div className='bulb2'></div>
                <div className='bulb3'></div>
                <div className='bulb5'></div>
            </main>
            <div>
                {isOpen &&
                    <nav className={isOpen ? "mobileNav" : "mobileNavUndo"}>
                        <ul className="listBoxMobile">
                            <li><Link to='/home' className="mobileLInks">HOME</Link></li>
                            <li><Link to='/posts' className="mobileLInks">POSTS</Link></li>
                            {isLoggedIn && <li><Link to='/profile' className="mobileLInks">PROFILE</Link></li>}
                            {!isLoggedIn ? <li><Link to='/login' className="mobileLInks">LOGIN</Link></li> : <li><Link to='/logout' className="mobileLInks">LOGOUT</Link></li>}
                        </ul>
                    </nav>}

            </div>
        </>
    )
}

export default Header