import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import LogIn from './Components/LogIn';
import Register from './Components/Register';
import Posts from './Components/Posts';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
import CreatePost from './Components/CreatePost';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/posts' element={<Posts isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} />} />
          <Route path='/login' element={<LogIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} token={token} username={username} setUsername={setUsername} />} />
          <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<LogIn token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/logout' element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/createPost' element={<CreatePost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

