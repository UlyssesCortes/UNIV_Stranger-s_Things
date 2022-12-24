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
import SendMessage from './Components/SendMessage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [myData, setMyData] = useState({})

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/home'
            element={<Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path='/posts'
            element={<Posts
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
              myData={myData} />}
          />
          <Route
            path='/'
            element={<LogIn
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setToken={setToken} token={token}
              username={username}
              setUsername={setUsername}
              setMyData={setMyData} myData={myData} />}
          />
          <Route
            path='/login'
            element={<LogIn
              isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
              setToken={setToken} token={token}
              username={username} setUsername={setUsername}
              setMyData={setMyData} myData={myData} />}
          />
          <Route
            path='/profile'
            element={<Profile
              isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
              token={token}
              myData={myData} setMyData={setMyData} />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/logout'
            element={<Logout
              isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path='/createPost'
            element={<CreatePost
              isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
              token={token} />}
          />
          <Route
            path='/sendMessage'
            element={<SendMessage
              isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
              token={token} />}
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

