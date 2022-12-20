import React, { useState } from 'react';
import './login.css';
import Header from './Header';
import { Link } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [valid, setValid] = useState(false);
    const [userNameTaken, setUserNameTaken] = useState(false);

    const invalidPasswordAlert = () => {
        return (
            <div class="alert">
                <strong>Invalid Username or Password!</strong>
            </div>
        )
    }

    const validPasswordAlert = () => {
        return (
            <div class="alertGreen">
                <strong>Registered Succesfully!</strong>
            </div>
        )
    }

    const handleSubmit = async (event) => {
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
                console.log(result.error.name === 'UserExists');
                if (result.error.name) {
                    setUserNameTaken(true)
                    console.log(userNameTaken)
                }
            })
            .catch(console.log(userNameTaken))

        if (password === passwordVerification && !userNameTaken) {
            setInvalid(false)
            setValid(true)
            setPassword(password)
            setUsername(username)
        } else {
            setInvalid(true)
            setValid(false)
            setPassword("")
            setPasswordVerification("")
            setUsername("")
        }
    }

    const handleChangeName = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleChangePasswordVerification = (event) => {
        setPasswordVerification(event.target.value)
    }

    return <>
        <Header />
        <div id='container'>
            <h1>Register:</h1>
            <div id='navbar'>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='container'> {invalid && invalidPasswordAlert()}</div>
                <div className='container'> {valid && validPasswordAlert()}</div>
                <input type='text' name='username' value={username} onChange={handleChangeName} placeholder=' Username*' />
                <input type='password' name='password' value={password} onChange={handleChangePassword} placeholder=' Password*' />
                <input type='password' name='password' value={passwordVerification} onChange={handleChangePasswordVerification} placeholder=' Confirm Password*' />
                <button type='submit'>Register</button>
                <Link to="/login">Already have an account? Log in</Link>
            </form>
        </div>
    </>
}

export default Register