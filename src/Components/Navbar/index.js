import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import { GoogleLogin , GoogleLogout} from 'react-google-login';
import './index.css';


export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      name: '',
      email: '',
      imageUrl: ''
    }
    
  }

  responseGoogle = (response) => {
    this.setState({
      name: response.profileObj.name,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl
    })
  }

  logout = (response) => {
    this.setState({
      name: '',
      email: '',
      imageUrl: ''
    })
  }

  render() {
    return (
      <div>
        <nav className="nav" id="navbar">
          <div className="nav-content">
            <ul className="nav-items noselect">
              <li className="nav-item">
                {this.state.imageUrl !== '' ? 
                <div>
                  <img src={this.state.imageUrl} alt="img" id="profileImg" />
                </div>
                :
                ''
                }
              </li>
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
              <li className="googleLogin">
                { this.state.name === '' ? 
                  <GoogleLogin
                    clientId="480493104816-k15kjma9hnclv82vadu9dj9c1jc2vocf.apps.googleusercontent.com"
                    buttonText="Login"
                    isSignedIn={true}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                :
                  <GoogleLogout
                    clientId="480493104816-k15kjma9hnclv82vadu9dj9c1jc2vocf.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                  />
                }
            </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}