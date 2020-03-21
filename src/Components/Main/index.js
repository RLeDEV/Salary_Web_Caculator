import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from '../Navbar';
import Dashboard from '../Dashboard';
import Register from '../Register';

class Main extends React.Component {
    constructor(){
        super();
        this.initializeStates = this.initializeStates.bind(this);
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

    render() {
        return(
            <BrowserRouter>
            <div>
                <div className="">
                    <Navbar initializeStates={this.initializeStates}/>
                    <Switch>
                        <Route
                            exact path="/"
                            render={props => <Dashboard email={this.state.email} />}
                        />
                        <Route
                            path="/register"
                            component={Register}
                        />
                        <Route
                            path="/settings"
                            component={Dashboard}
                        />
                    </Switch>
                </div>
            </div>
            </BrowserRouter>
        )};
}

export default Main;