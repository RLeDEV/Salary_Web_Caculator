import React from "react";
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { Redirect }from 'react-router-dom'
import './index.css';

const headings = [
    'First Name',
    'Last Name',
    'City',
    'Hourly Basis',
    'Hours Per Day',
    'Days Per Month',
    '% Bonus Per Sale',
    ''
]

class View extends React.Component {
    constructor(props){
        super(props);
        this.loadingBtn = this.loadingBtn.bind(this);
        this.loadContent = this.loadContent.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
        this.state = {
            data: [],
            isFetching: true
        }
    }
    

    componentDidMount() {
        if(localStorage.getItem('user') === null || localStorage.getItem('user') === 'null')
            window.location.href = '/'
        var data = {
            email: localStorage.getItem('user')
        }
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

    removeEmployee(employee,index) {
        var data = {
            ownerEmail: localStorage.getItem('user'),
            id: employee.id
        }
        let employees = this.state.data;
        employees.splice(index,1);
        fetch('/employees/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json;
        }).then(function(data) {
            if(data === "success"){
                console.log("success");
            }
        }).catch(function(err) {
            console.log(err);
        })
        this.setState({data: employees})
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
        const filteredData = this.state.data.filter((e) => e.firstName.includes(this.state.filter) || e.lastName.includes(this.state.filter))
        return (
            <div style={{overflowX: "auto"}}>
                <div className="subsection">
                            <div className="subsection-title noselect">
                                {this.props.user.name}'s employees
                            </div>
                </div>
                <div className="filter">
                    <input type="text" className="tableFilter" placeholder="Filter" defaultValue= {this.state.filter} onChange={e => this.setState({filter: e.target.value})} />
                    <label for="name" class="form__label">Filter by name</label>
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
                        filteredData.length > 0 ?
                        filteredData.map ((item,index) => {
                            return <Item item={item} key={index} removeItem={() => this.removeEmployee(item, index)} />  
                        })
                        :
                        this.state.data.map((item,index)=> {
                            return <Item item={item} key={index} removeItem={() => this.removeEmployee(item, index)} />  
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
                    {this.props.user.email === null ? <Redirect to='/' /> :  this.state.isFetching ? this.loadingBtn() : this.loadContent()}
                </div>
            </div>
        );
    };
};


class Item extends React.Component {
    constructor(props){
        super(props);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    onClickRemove() {
        this.props.removeItem(this.props.item);
    }

    render() {
        return(
        <tbody>
            <tr>
                <td>{this.props.item.firstName}</td>
                <td>{this.props.item.lastName}</td>
                <td>{this.props.item.city}</td>
                <td>{this.props.item.hourlyBasis} $</td>
                <td>{this.props.item.hoursPerDay} hours</td>
                <td>{this.props.item.daysPerMonth} days</td>
                <td>{this.props.item.percentPerSale} %</td>
                <td><button type="button" className="close" onClick={this.onClickRemove}>&times;</button></td>
            </tr>
        </tbody>
    )}
}

const mapStateToProps = state => {
    return { user: state.userEmail.user }
}

export default connect(mapStateToProps, { signIn })(View);