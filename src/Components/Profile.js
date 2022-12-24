import React, { useEffect, useState } from "react";
import Header from './Header';



const Profile = ({ isLoggedIn, setIsLoggedIn, setToken, myData, token, setMyData }) => {

    const [profileInfo, setProfileInfo] = useState({})

    const fetchProfile = () => {
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(result => {
                setMyData(result.data);
                console.log("My Data", myData)
                console.log(myData.messages[0].content)
                setProfileInfo(myData.messages)
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

            <p>{console.log("Profile info", profileInfo)}</p>
            {/* <p>{console.log("Profile messages: ", profileInfo.messages)}</p> */}
            {
                profileInfo && profileInfo.map(message =>
                    <div className='postCard' key={message._id} >
                        <h2>{"Title: " + message.title}</h2>
                        <p><strong>Content: </strong>{message.content}</p>
                        <p><strong>Seller: </strong>{ }</p>
                    </div>
                )
            }
        </>
    )
}

export default Profile