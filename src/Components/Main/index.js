import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from '../Navbar';
import Dashboard from '../Dashboard';
import Add from '../Add';
import View from '../View';

class Main extends React.Component {
    render() {
        return(
            <BrowserRouter>
            <div>
                <div className="">
                    <Navbar />
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