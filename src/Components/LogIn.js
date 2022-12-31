import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import { Link } from 'react-router-dom';


const LogIn = ({ isLoggedIn, setIsLoggedIn, setToken, username, setUsername, setMessagesArray }) => {

    const [password, setPassword] = useState('');
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

        const fetchLogin = async () => {
            const resp = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/login', {
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
            })
            const dataFromApi = await resp.json()
            if (dataFromApi.data === null) {
                setInfo(false)
            }
            // setToken does not run I had to use the data withough setting 
            if (dataFromApi.success) {
                setIsLoggedIn(true)
                setToken(dataFromApi?.data?.token)

                fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${dataFromApi?.data?.token}`
                    },
                }).then(response => response.json())
                    .then(result => {

                        if (result) {
                            setMessagesArray(result)
                        }
                    })
                    .catch(console.error);
            }
        }
        fetchLogin()
    }

    const handleChangeName = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <body className='animate__animated animate__backInLeft'>
            <div id='container'>
                <h1>Login:</h1>
                <form onSubmit={handleSubmit}>
                    {isLoggedIn ? <div className='container'>  {isLoggedIn && loggedInAlert()}</div> : <div className='container'>  {!info && wrongUserAlert()}</div>}

                    <input className='loginInput' type='text' value={username} onChange={handleChangeName} placeholder=' Username*' />
                    <input className='loginInput' type='password' value={password} onChange={handleChangePassword} placeholder=' Password*' />
                    <button type='submit' onClick={handleSubmit()}>Log In</button>
                    <Link className='registerLink' to="/register">Don't have an account? Sign Up</Link>
                </form>
            </div>
        </body>

    </>
}

export default LogIn
