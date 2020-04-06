import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from '../Navbar';
import Navbar2 from '../2Navbar';
import Dashboard from '../Dashboard';
import Add from '../Add';
import View from '../View';

class Main extends React.Component {
    constructor(){
        super();
        this.initializeStates = this.initializeStates.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            name: '',
            email: '',
            imageUrl: ''
        }
    }

    initializeStates = (email) => {
        this.setState({
            email: email,
        })
    }

    logout = () => {
        this.setState({
            name: '',
            email: '',
            imageUrl: ''
        })
    }

    render() {
        return(
            <BrowserRouter>
            <div>
                <div className="">
                    {/* <Navbar initializeStates={this.initializeStates} logout={this.logout} /> */}
                    <Navbar2 />
                    <Switch>
                        <Route
                            exact path="/"
                            render={props => <Dashboard />}
                        />
                        <Route
                            path="/add"
                            render={props => <Add />}
                        />
                        <Route
                            path="/view"
                            render={(routeProps) => <View {...routeProps}/>} />}
                        />
                    </Switch>
                </div>
            </div>
            </BrowserRouter>
        )};
}

export default Main;