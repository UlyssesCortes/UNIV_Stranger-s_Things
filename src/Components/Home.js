import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import "./home.css"


const Home = ({ isLoggedIn, setIsLoggedIn, setToken, username }) => {

    const usernameVerified = () => {
        return ((username ?
            <div className='homeContainer'>
                <h1>Welcome {username} !</h1>
                <Link to='/profile' className="links log">PROFILE</Link>
            </div> :
            <div className='homeContainer'>
                <h1>Welcome</h1>
                <p>Log in to see profile</p>
                <Link to='/login' className="links log" >LOGIN</Link>
            </div>
        ))
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <div>
                {usernameVerified()}
            </div>
        </>
    )
}

export default Home