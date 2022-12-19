import React, { useState } from 'react';
import Header from './Header';
import './logout.css'


const Logout = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    const [isOpen, setIsOpen] = useState(false)

    const alert = () => {
        return (
            <div class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            <strong>Logged Out!</strong>
          </div>
        )
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <div id='container'>
            <h1>Logout:</h1>
            <div id='navbar'>
            </div>
                <button type='button' onClick={() => setIsOpen(!isOpen) }>Log Out</button>
                <div className='container'> {isOpen && alert()}</div>
        </div>
    </>
}

export default Logout