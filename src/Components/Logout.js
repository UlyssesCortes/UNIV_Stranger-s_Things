import React, { useState } from 'react';
import Header from './Header';
import './logout.css'


const Logout = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    const [isOpen, setIsOpen] = useState(false)

    const alert = () => {
        setIsLoggedIn(false)
        return (
            <div class="alert">
                <strong>Logged Out!</strong>
            </div>
        )
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <body className='animate__animated animate__zoomIn'>
            <div id='container'>
                <h1>Logout:</h1>
                <button type='button' className='logout' onClick={() => setIsOpen(!isOpen)}>Log Out</button>
            </div>
            <div className='containerAlert'> {isOpen && alert()}</div>
        </body>

    </>
}

export default Logout