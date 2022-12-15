import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LogIn from './Components/LogIn';
import Register from './Components/Register';
import Posts from './Components/Posts';

const App = () => {
  return (
    <Register />
    // <Posts />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

