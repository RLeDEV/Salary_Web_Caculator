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
                            path="/add"
                            component={Add}
                        />
                        <Route
                            path="/view"
                            component={View}
                        />
                    </Switch>
                </div>
            </div>
            </BrowserRouter>
        )};
}

export default Main;