import React from "react";
import './index.css';

const headings = [
    'First Name',
    'Last Name',
    'City',
    'Hourly Basis',
    'Hours Per Day',
    'Days Per Month',
    '% Bonus Per Sale'
]

class View extends React.Component {
    constructor(props){
        super(props);
        this.loadingBtn = this.loadingBtn.bind(this);
        this.loadContent = this.loadContent.bind(this);
        this.state = {
            data: [],
            isFetching: true
        }
    }

    componentDidMount() {
        var data = {
            email: this.props.email
        }
        console.log('email: ' + this.props.email)
        fetch('/employees/all',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if( response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            return response.json();
        }).then( data => {
            this.setState({ 
                data: data.data
            });
            this.setState({isFetching: false});
        }).catch( error => console.log (error))
    }

    loadingBtn = () => {
        return (
            <center><div className="loadingio-spinner-pulse-d1ktdzklbz loading"><div className="ldio-z8mr9o1ztpp">
            <div></div><div></div><div></div>Loading...
            </div></div>
            </center>
        )
    }

    loadContent = () => {
        return (
            <div>
                <div className="subsection">
                            <div className="subsection-title noselect">
                                View Employees
                            </div>
                </div>
                <table className="table rstable">
                    <thead>
                        <tr >
                            {headings.map(function(column, i) {
                                return <th id="header" key={i}>{column}</th>;
                            })}
                        </tr>
                        </thead>
                        {
                        this.state.data.map((item,index)=> {
                            return <Item item={item} key={index} />  
                        })
                        }
                </table>   
            </div>
        )
    }
    render() {
        return(
            <div className="section">
                <div className="section-content">
                    {this.state.isFetching || this.props.email === '' ? this.loadingBtn() : this.loadContent()}
                </div>
            </div>
        );
    };
};


class Item extends React.Component {
    render() {
        return(
        <tbody>
            <tr>
                <td>
                    {this.props.item.firstName}
                </td>
                <td>
                    {this.props.item.lastName}    
                </td>
                <td>
                    {this.props.item.city}
                </td>
                <td>
                    {this.props.item.hourlyBasis} $
                </td>
                <td>
                    {this.props.item.hoursPerDay} hours
                </td>
                <td>
                    {this.props.item.daysPerMonth} days
                </td>
                <td>
                    {this.props.item.percentPerSale} %
                </td>
            </tr>
        </tbody>
    )}
}

export default View;