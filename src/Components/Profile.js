import React, { useEffect, useState } from "react";
import Header from './Header';
import './profile.css'


const Profile = ({ isLoggedIn, setIsLoggedIn, setToken, myData, token, setMyData, username, messagesArray, setMessagesArray }) => {

    const [profileInfo, setProfileInfo] = useState([])
    const [messageArr, setMessageArr] = useState([])
    const [filterByAuthor, setFilterByAuthor] = useState([])
    const [messagesFromMe, setMessagesFromMe] = useState([])
    const [messagesToMe, setMessagesToMe] = useState([])
    // const messagesFromMe = [];
    // const messagesToMe = [];

    // const fetchMessage = async () => {
    //     const resp = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //     const result = await resp.json();
    //     setMessageArr([])
    //     if (result) {
    //         setMessageArr(result.data.messages)
    //         console.log(messageArr)
    //         setFilterByAuthor(messageArr.filter(res => res.fromUser.username === username ? messagesFromMe.push(res) : messagesToMe.push(res)))
    //     }
    // }

    useEffect(() => {
        setFilterByAuthor(messagesArray.data.messages.filter(res => res.fromUser.username === username ? messagesFromMe.push(res) : messagesToMe.push(res)))

    }, [])

    const messagesFromMeFun = () => {
        return (
            messagesFromMe && messagesFromMe.map(message =>
                <div className='postCard' key={message._id} >
                    {(message.fromUser.username === username &&
                        <div className="postCardContent">
                            <section className="icon">
                                <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" alt="icon"></img>
                                <h4> {message.fromUser.username}</h4>
                            </section>
                            <section className="infoSection">
                                <h1> {message.post.title}</h1>
                                <p>{message.content}</p>
                            </section>
                        </div>
                    )}
                </div>)
        )
    }

    const messagesToMeFun = () => {
        return (
            messagesToMe && messagesToMe.map(message =>
                <div className='postCard' key={message._id} >
                    {(message.fromUser.username !== username &&
                        <div className="postCardContent">
                            <section className="icon">
                                <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" alt="icon"></img>
                                <h4> {message.fromUser.username}</h4>
                            </section>
                            <section className="infoSection">
                                <h1> {message.post.title}</h1>
                                <p>{message.content}</p>
                            </section>
                        </div>
                    )}
                </div>)
        )
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <section className="subHeader">
                {/* <button type="button" className="links log" onClick={() => fetchMessage()}>Refresh</button> */}
            </section>
            <main>
                <section className="messagesContainer">
                    <section>
                        <h1 className="title">Messages to me:</h1>
                        <div className="messagesContainer">
                            {messagesToMeFun()}
                        </div>
                    </section>
                    <section>
                        <h1 className="title">Messages from me:</h1>
                        <div className="messagesContainer">
                            {messagesFromMeFun()}
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Profile