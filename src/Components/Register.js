import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import LogIn from './LogIn';



const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/register', {
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
                console.log(result);
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
        <Header />
        <div id='container'>
            <h1>Register:</h1>
            <div id='navbar'>
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' value={username} onChange={handleChangeName} placeholder=' Username*' />
                <input type='password' name='password' value={password} onChange={handleChangePassword} placeholder=' Password*' />
                <input type='password' name='password' value={password} onChange={handleChangePassword} placeholder=' Confirm Password*' />
                <button type='submit'>Register</button>
                <Link to="/login">Already have an account? Log in</Link>
            </form>
        </div>
    </>

}

export default Register