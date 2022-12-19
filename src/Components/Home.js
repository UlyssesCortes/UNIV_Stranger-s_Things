import React from 'react';
import Header from './Header';


const Home = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    return (
        <>
            {console.log("Logged in home?", isLoggedIn)}
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />

            <h1>Home</h1>
        </>
    )
}

export default Home