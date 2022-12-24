import React from "react";
import Header from "./Header";

const SendMessage = ({ isLoggedIn, setIsLoggedIn, token, post, setMessage, message }) => {
    const messageHandler = (event) => {
        setMessage(event.target.value)
    }

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <form onSubmit={console.log("currPostId")}>
                <h4>Enter Message to: {post} </h4>
                <input type="text" value={message} onChange={messageHandler} placeholder='Title*'></input>
                <button className='sendMessageBtn' type="submit">SEND MESSAGE</button>
            </form>
        </div>
    )
}

export default SendMessage;
