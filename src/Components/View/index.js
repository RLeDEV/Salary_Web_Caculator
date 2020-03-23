import React from "react";
import './index.css';

const headings = [
    'First Name',
    'Last Name',
    'City',
    'Hourly Basis',
    '% Bonus Per Sale'
]

class View extends React.Component {
    constructor(props){
        super(props);
        this.loadingBtn = this.loadingBtn.bind(this);
        this.loadTable = this.loadTable.bind(this);
        this.state = {
            data: [],
            isFetching: true
        }
    }

    componentDidMount() {
        fetch('/employees/all')
        .then(response => {
            return response.json();
        })
        .then( data => {
            this.setState({ 
                data: data.data
            });
            this.setState({isFetching: false});
        })
        .catch( error => console.log (error))
    }

    loadingBtn = () => {
        return (
            <center><div className="loadingio-spinner-pulse-d1ktdzklbz loading"><div className="ldio-z8mr9o1ztpp">
            <div></div><div></div><div></div>Loading...
            </div></div>
            </center>
        )
    }

    loadTable = () => {
        return (
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
        )
    }
    render() {
        return(
            <div className="section">
                <div className="section-content">
                    <div className="subsection">
                        <div className="subsection-title noselect">
                            View Employees
                        </div>
                    </div>
                    {this.state.isFetching ? this.loadingBtn() : this.loadTable()}
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
                    {this.props.item.percentPerSale} %
                </td>
            </tr>
        </tbody>
    )}
}

export default View;