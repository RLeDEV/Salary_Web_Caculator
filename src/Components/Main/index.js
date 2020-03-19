import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from '../Navbar';
import Dashboard from '../Dashboard';
import Register from '../Register';

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
                            component={Dashboard}
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