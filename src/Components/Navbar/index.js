import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import './index.css';


export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="nav" id="navbar">
          <div className="nav-content">
            <ul className="nav-items noselect">
              <li className="nav-item">
                <NavLink className="link" exact to="/">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="link" to="/settings">
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}