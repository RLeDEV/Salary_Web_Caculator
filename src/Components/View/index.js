import React from "react";
import './index.css';

class View extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
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
        })
        .catch( error => console.log (error))
    }

    render() {
        const headings = [
            'First Name',
            'Last Name',
            'City',
            'Hourly Basis',
            '% Bonus Per Sale'
        ]
        return(
            <div className="section">
                <div className="section-content">
                    <div className="subsection">
                        <div className="subsection-title noselect">
                            Add Employee
                        </div>
                    </div>
                    <table className="table rstable">
                        <thead>
                            <tr >
                                {headings.map(function(column, i) {
                                    return <th id="header" key={i}>{column}</th>;
                                })}
                            </tr>
                            {this.state.data.map((item,index)=> {
                                return <Item item={item} key={index} />  
                            })}
                        </thead>
                    </table>
                </div>
            </div>
        );
    };
};


class Item extends React.Component {
    render() {
        return(
        <tr>
            <td style={{'text-align': 'left'}}>
                {this.props.item.firstName}
            </td>
            <td>
                {this.props.item.LastName}    
            </td>
            <td>
                {this.props.item.city}
            </td>
            <td>
                {this.props.item.hourlyBasis}
            </td>
            <td>
                {this.props.item.precentPerSale}
            </td>
        </tr>
    )}
}

export default View;