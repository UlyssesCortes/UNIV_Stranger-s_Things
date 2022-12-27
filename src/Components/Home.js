import React from 'react';
import Header from './Header';
import "./home.css"


const Home = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        </>
    )
}

export default Home