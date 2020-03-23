import React from "react";
import './index.css';

class View extends React.Component {
    constructor(props){
        super(props);
        this.loadingBtn = this.loadingBtn.bind(this);
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
            <div class="loadingio-spinner-pulse-d1ktdzklbz loading"><div class="ldio-z8mr9o1ztpp">
            <div></div><div></div><div></div>
            </div></div>
        )
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
                            </thead>
                            { this.state.isFetching ? 
                            this.loadingBtn()
                            :
                            this.state.data.map((item,index)=> {
                                return <Item item={item} key={index} />  
                            })
                            }
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
            <td>
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