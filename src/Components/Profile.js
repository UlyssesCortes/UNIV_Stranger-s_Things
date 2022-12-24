import React, { useEffect, useState } from "react";
import Header from './Header';
import './profile.css'


const Profile = ({ isLoggedIn, setIsLoggedIn, setToken, myData, token, setMyData }) => {

    const [profileInfo, setProfileInfo] = useState([])
    const [messageArr, setMessageArr] = useState([])

    const fetchProfile = () => {
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(result => {
                setMyData(result.data);
                setProfileInfo(myData)
                setMessageArr(profileInfo.messages)
                console.log("My Data", myData)
                console.log("My data Messages", messageArr)
            })
            .catch(console.error);
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            <h1>Profile:</h1>
            <button type="button" onClick={() => fetchProfile()}>Refresh</button>

            {
                messageArr && messageArr.map(message =>
                    <div className='postCard' key={message._id} >
                        <p><strong>Message to post:</strong> {message.post.title}</p>
                        <p><strong>Content:</strong>{message.content}</p>
                    </div>)
            }
        </>
    )
}

export default Profile