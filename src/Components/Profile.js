import React, { useEffect, useState } from "react";
import Header from './Header';
import './profile.css'


const Profile = ({ isLoggedIn, setIsLoggedIn, setToken, myData, token, setMyData, username }) => {

    const [profileInfo, setProfileInfo] = useState([])
    const [messageArr, setMessageArr] = useState([])
    const [visible, setVisible] = useState(false)
    const [filterByAuthor, setFilterByAuthor] = useState([])
    const [messagesFromMe, setMessagesFromMe] = useState([])
    const [messagesToMe, setMessagesToMe] = useState([])
    // const messagesFromMe = [];
    // const messagesToMe = [];

    const fetchProfile = async () => {

        await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(result => {
                setMyData(result.data)
                setProfileInfo(myData)
                setMessageArr(profileInfo.messages)
                // console.log("My Data", myData)
                // console.log("My data Messages", messageArr)
                setFilterByAuthor(messageArr.filter(res => res.fromUser.username === username ? messagesFromMe.push(res) : messagesToMe.push(res)))
            })
            .catch(console.error);
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const messagesFromMeFun = () => {
        return (
            messagesFromMe && messagesFromMe.map(message =>
                <div className='postCard' key={message._id} >
                    {(message.fromUser.username === username &&
                        <div className="postCardContent">
                            <p><strong>Message to post:</strong> {message.post.title}</p>
                            <p><strong>Message from:</strong> {message.fromUser.username}</p>
                            <p><strong>Content:</strong>{message.content}</p>
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
                            <p><strong>Message to post:</strong> {message.post.title}</p>
                            <p><strong>Message to:</strong> {message.fromUser.username}</p>
                            <p><strong>Content:</strong>{message.content}</p>
                        </div>
                    )}
                </div>)
        )
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <section className="subHeader">
                <h1>Profile:</h1>
                <button type="button" onClick={() => fetchProfile()}>Refresh</button>
            </section>
            <section className="messagesContainer">
                <h1 className="title">Messages to me</h1>
                <div className="messagesContainer">
                    {messagesToMeFun()}
                </div>
                <h1 className="title">Messages from me</h1>
                <div className="messagesContainer">
                    {messagesFromMeFun()}
                </div>
            </section>


        </>
    )
}

export default Profile