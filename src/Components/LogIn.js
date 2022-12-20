import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import { Link } from 'react-router-dom';


const LogIn = ({ isLoggedIn, setIsLoggedIn, token, setToken, username, setUsername }) => {

    const [password, setPassword] = useState('');
    const [myPosts, setMyPosts] = useState([]);
    const [message, setMessage] = useState([]);
    const [id, setId] = useState('');
    const [info, setInfo] = useState(false);

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
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/login', {
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
                    console.log(isLoggedIn);
                }

            })
            .catch(console.error)

        if (token) {
            // window.localStorage.setItem('token', token)
            // window.localStorage.setItem('loggedIn', isLoggedIn)
        }

        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                setMessage(result?.data?.messages)
                setId(result.data._id)
                setMyPosts(result.data.posts)

                if (message && id && myPosts) {
                    console.log("Messages", message)
                    console.log("Id", id)
                    console.log("Posts", myPosts)
                }
                if (result.success) {
                    setInfo(false)
                } else {
                    setInfo(true)
                }
            })
            .catch(console.error);
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
            <div id='navbar'>
                <div className='container'> {wrongUserAlert() && !info}</div>
                <div className='container'> {loggedInAlert() && isLoggedIn}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={handleChangeName} placeholder=' Username*' />
                <input type='password' value={password} onChange={handleChangePassword} placeholder=' Password*' />
                <button type='submit'>Log In</button>
                <Link to="/register">Don't have an account? Sign Up</Link>
            </form>
        </div>
    </>
}

export default LogIn