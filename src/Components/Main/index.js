import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from '../Navbar';
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
                    <Navbar initializeStates={this.initializeStates} logout={this.logout} />
                    <Switch>
                        <Route
                            exact path="/"
                            render={props => <Dashboard email={this.state.email} />}
                        />
                        <Route
                            path="/add"
                            render={props => <Add email={this.state.email} />}
                        />
                        <Route
                            path="/view"
                            render={props => <View email={this.state.email} />}
                        />
                    </Switch>
                </div>
            </div>
            </BrowserRouter>
        )};
}

export default Main;