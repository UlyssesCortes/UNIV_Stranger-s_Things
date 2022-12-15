import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import LogIn from './Components/LogIn';
import Register from './Components/Register';
import Posts from './Components/Posts';
import Home from './Components/Home';

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<LogIn />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

