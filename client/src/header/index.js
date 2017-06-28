import React from 'react';
import './index.css';
import logo from '../logo.png';

export default function Header (props) {
  let backgroundColor = {"backgroundColor": props.backgroundColor}
  return (
    <div className="App">
      <div className="App-header" style={backgroundColor}>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  )
}