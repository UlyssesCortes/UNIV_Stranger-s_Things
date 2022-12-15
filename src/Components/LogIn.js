import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import { Link } from 'react-router-dom';


const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    console.log('username', username);
    console.log('password', password);
    console.log('token', token);


    const handleSubmit = async (event) => {
        event.preventDefault()

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
                setToken(result.data.token)
                console.log(result);
            })
            .catch(console.error)


        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(token)
            })
            .catch(console.error);

        // setUsername('')
        // setPassword('')
        console.log(token)
    }

    const handleChangeName = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return <>
        <Header />
        <div id='container'>
            <h1>Login:</h1>
            <div id='navbar'>
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' value={username} onChange={handleChangeName} placeholder=' Username*' />
                <input type='password' name='password' value={password} onChange={handleChangePassword} placeholder=' Password*' />
                <button type='submit'>Log In</button>
                <Link to="/register">Don't have an account? Sign Up</Link>
            </form>
        </div>
    </>

}

export default LogIn