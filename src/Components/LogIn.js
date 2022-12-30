import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import { Link } from 'react-router-dom';
// import WrongAlert from './WrongAlert';


const LogIn = ({ isLoggedIn, setIsLoggedIn, token, setToken, username, setUsername, setMessagesArray }) => {

    const [password, setPassword] = useState('');
    const [myPosts, setMyPosts] = useState([]);
    const [message, setMessage] = useState([]);
    const [id, setId] = useState('');
    const [info, setInfo] = useState(true);

    const loggedInAlert = () => {
        return (
            <div class="alertGreen">
                <strong>Logged In!</strong>
            </div>
        )
    }

    const wrongUserAlert = () => {
        return (
            <div class="alert">
                <strong>Wrong Usertname or Password!</strong>
            </div>
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log("Log in clicked")
        await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${username}`,
                    password: `${password}`
                }
            })
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    setToken(result?.data?.token)
                    setIsLoggedIn(true)
                    console.log("UP 52", result)

                    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    }).then(response => response.json())
                        .then(result => {
                            console.log(result);
                            if (result.data === null) {
                                setInfo(false)
                            }

                            if (result) {
                                setId(result.data._id)
                                setMyPosts(result.data.posts)
                                setMessagesArray(result)
                            }
                        })
                        .catch(console.error);
                }
            })
            .catch(console.error)
    }

    const handleChangeName = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <div id='container'>
            <h1>Login:</h1>
            <form onSubmit={handleSubmit}>
                {isLoggedIn ? <div className='container'>  {isLoggedIn && loggedInAlert()}</div> : <div className='container'>  {!isLoggedIn && !info && wrongUserAlert()}</div>}
                <input type='text' value={username} onChange={handleChangeName} placeholder=' Username*' />
                <input type='password' value={password} onChange={handleChangePassword} placeholder=' Password*' />
                <button type='submit'>Log In</button>
                <Link className='registerLink' to="/register">Don't have an account? Sign Up</Link>
            </form>
        </div>
    </>
}

export default LogIn