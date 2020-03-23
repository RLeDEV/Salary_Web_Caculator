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
    this.props.initializeStates(this.state.email);
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
        <nav className="nav" id="navbar">
            <ul className="nav-items noselect">
              <li className="nav-user-logo">
                {
                this.state.imageUrl !== '' ? 
                  <div>
                    <img src={this.state.imageUrl} alt="img" id="profileImg" />
                  </div>
                  :
                  ''
                }
              </li>
              <li className="nav-item">
                <NavLink className="link" exact to="/">
                  {this.state.name !== '' ? 'Dashboard' : 'Please log in to continue'}
                </NavLink>
              </li>
              {
              this.state.name !== '' ? 
                <li className="nav-item">
                  <NavLink className="link" to="/add">
                    Add Employee
                  </NavLink>
                </li>
                :
                ''
              }
              {
                this.state.name !== '' ? 
                  <li className="nav-item">
                    <NavLink className="link" to="/view">
                      View Employees
                    </NavLink>
                  </li>
                  :
                  ''
              }
              {
                this.state.name !== '' ? 
                <li className="nav-item">
                  <NavLink className="link" to="/settings">
                    Calculate Salary
                  </NavLink>
                </li>
                :
                ''
              }
              </ul>
              <ul className="googleLoginBtn">
              <li className="googleLogin">
                { this.state.name === '' ? 
                  <GoogleLogin
                    className="login"
                    clientId="480493104816-k15kjma9hnclv82vadu9dj9c1jc2vocf.apps.googleusercontent.com"
                    buttonText="Login"
                    isSignedIn={true}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                :
                  <GoogleLogout
                    className="login"
                    clientId="480493104816-k15kjma9hnclv82vadu9dj9c1jc2vocf.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                  />
                }
            </li>
            </ul>
        </nav>
    );
  }
}