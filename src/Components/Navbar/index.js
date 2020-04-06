import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { GoogleLogin , GoogleLogout} from 'react-google-login';
import './index.css';

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dashboard: '',
            view: '',
            add: ''
        }
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

    onChangeActive = (sectionName) => {
        this.setState({
            dashboard: '',
            view: '',
            add: '',
            [sectionName]: 'active'
        })
    }

    render() {
        return(
            <div className="nav-it">
                <div className="wrapper">
                    <div className="top-navbar">
                        <div className="top-menu">
                            <div className="logo">EasyCalc</div>
                            {
                            this.props.user.name !== "" ? 
                            <ul>
                                <li><img src={this.props.user.imageUrl} alt="img" /></li>
                                <li>
                                <GoogleLogout
                                    className="login"
                                    clientId="480493104816-k15kjma9hnclv82vadu9dj9c1jc2vocf.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={this.logout}
                                    icon={false}
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
                                icon={false}
                            />
                            }
                        </div>
                    </div>
                    <div className="sidebar">
                        <ul>
                            <NavLink className="link" exact to="/">
                                <li className={this.state.dashboard} onClick={() => this.onChangeActive("dashboard")}>
                                    <span className="icon">
                                        <i className="fas fa-home" aria-hidden="true"></i>
                                    </span>
                                    <span className="title">Dashboard</span>    
                                </li>
                            </NavLink>
                            { this.props.user.name !== "" ?
                            <div>                            
                            <NavLink className="link" to="/add">  
                                <li className={this.state.add} onClick={() => this.onChangeActive("add")}>
                                    <span className="icon">
                                    <i className="fas fa-plus" aria-hidden="true"></i>
                                    </span>
                                    <span className="title">Add Employee</span>    
                                </li>
                            </NavLink>
                            <NavLink className="link" to="/view">
                                <li className={this.state.view} onClick={() => this.onChangeActive("view")}>
                                    <span className="icon">
                                    <i className="fas fa-eye" aria-hidden="true"></i>
                                    </span>
                                    <span className="title">View All</span>    
                                </li>
                            </NavLink>
                            <li>
                                <span className="icon">
                                <i className="fas fa-calculator" aria-hidden="true"></i>
                                </span>
                                <span className="title">Calc Salary</span>    
                            </li>
                            </div>
                            :
                            ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.userEmail.user }
  }
  
  export default connect(mapStateToProps, { signIn })(Navbar)