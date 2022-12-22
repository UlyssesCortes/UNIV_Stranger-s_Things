import React from "react";
import Header from "./Header";

const SendMessage = ({ isLoggedIn, setIsLoggedIn, token }) => {

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <h1>Send Message:</h1>

        </>
    )

}

export default SendMessage;
