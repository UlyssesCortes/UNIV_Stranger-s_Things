import React from "react";
import Header from './Header';


const Profile = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <h1>Profile</h1>
        </>
    )
}

export default Profile