import React from 'react';
import './index.css';
import logo from '../logo.png';

export default function Header () {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  )
}