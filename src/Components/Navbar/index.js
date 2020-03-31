import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { GoogleLogin , GoogleLogout} from 'react-google-login';
import './index.css';


class Navbar extends Component {
  responseGoogle = (response) => {
    this.props.signIn(response.profileObj)
  }

  logout = (response) => {
    const user = {
      email: null,
      imageUrl: '',
      name: ''
    }
    this.props.signIn(user);
    // window.location.href = '/'
  }

  render() {
    return (
        <nav className="nav" id="navbar">
            <ul className="nav-items noselect">
              <li className="nav-user-logo">
                {
                this.props.user.name !== "" ? 
                  <div>
                    <img src={this.props.user.imageUrl} alt="img" id="profileImg" />
                  </div>
                  :
                  ''
                }
              </li>
              <li className="nav-item">
              {this.props.user.name !== "" ? 
                <NavLink className="link" exact to="/">
                  Dashboard
                </NavLink>
                :
                ''
              }
              </li>
              {
              this.props.user.name !== '' ? 
                <li className="nav-item">
                  <NavLink className="link" to="/add">
                    Add Employee
                  </NavLink>
                </li>
                :
                ''
              }
              {
                this.props.user.name !== "" ? 
                  <li className="nav-item">
                    <NavLink className="link" to="/view">
                      View Employees
                    </NavLink>
                  </li>
                  :
                  ''
              }
              {
                this.props.user.name !== "" ? 
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
                { 
                this.props.user.name === "" ? 
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

const mapStateToProps = state => {
  return { user: state.userEmail.user }
}

export default connect(mapStateToProps, { signIn })(Navbar)