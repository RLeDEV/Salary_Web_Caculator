import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import Navbar from '../Navbar';

class Main extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <div className="">
                    <Navbar /> 
                </div>
            </BrowserRouter>
        )};
}

export default Main;