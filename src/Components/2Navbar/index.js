import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { GoogleLogin , GoogleLogout} from 'react-google-login';
import './index.css';

class Navbar2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: ''
        }
        this.onDisplayChange = this.onDisplayChange.bind(this);
    }

    responseGoogle = (response) => {
        response.profileObj.isLoading = false;
        this.props.signIn(response.profileObj)
    }
    
    logout = (response) => {
    const user = {
        email: null,
        imageUrl: '',
        name: '',
        isLoading: true
    }
    this.props.signIn(user);
    // window.location.href = '/'
    }

    onDisplayChange() {
        this.setState({display: "collapse"});
    }

    render() {
        console.log(this.state.display)
        return(
            <div className="nav-it">
                <div className={"wrapper "  + this.state.display}>
                    <div className="top-navbar">
                        <div className="top-menu">
                            <div className="logo">Salary Calculator</div>
                            {
                            this.props.user.name !== "" ? 
                            <ul>
                                <li><a href="#"><img src={this.props.user.imageUrl} alt="img" /></a></li>
                                <li>
                                <GoogleLogout
                                    className="login"
                                    clientId="480493104816-k15kjma9hnclv82vadu9dj9c1jc2vocf.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={this.logout}
                                />
                                </li>
                            </ul>
                            :
                            <GoogleLogin
                                className="login"
                                clientId="480493104816-k15kjma9hnclv82vadu9dj9c1jc2vocf.apps.googleusercontent.com"
                                buttonText="Login"
                                isSignedIn={true}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            }
                        </div>
                    </div>
                    { this.props.user.name !== "" ?
                    <div className="sidebar">
                        <ul>
                            <NavLink className="link" exact to="/">
                                <li><a href="#" className="active">
                                    <span className="icon">
                                        <i className="fas fa-home" aria-hidden="true"></i>
                                    </span>
                                    <span className="title">Dashboard</span>    
                                </a></li>
                            </NavLink>
                            <NavLink className="link" to="/add">  
                                <li><a href="#">
                                    <span className="icon">
                                    <i className="fas fa-plus" aria-hidden="true"></i>
                                    </span>
                                    <span className="title">Add Employee</span>    
                                </a></li>
                            </NavLink>
                            <NavLink className="link" to="/view">
                                <li><a href="#">
                                    <span className="icon">
                                    <i className="fas fa-eye" aria-hidden="true"></i>
                                    </span>
                                    <span className="title">View All</span>    
                                </a></li>
                            </NavLink>
                            <li><a href="#">
                                <span className="icon">
                                <i className="fas fa-calculator" aria-hidden="true"></i>
                                </span>
                                <span className="title">Calc Salary</span>    
                            </a></li>
                            
                        </ul>
                    </div>
                    :
                    ''
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.userEmail.user }
  }
  
  export default connect(mapStateToProps, { signIn })(Navbar2)