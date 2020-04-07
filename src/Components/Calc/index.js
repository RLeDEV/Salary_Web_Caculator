import React from "react";
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { Redirect }from 'react-router-dom'
import './index.css';

const headings = [
    'Employee ID',
    'First Name',
    'Last Name',
    'Calculated Salary'
]

class Calc extends React.Component {
    constructor(props){
        super(props);
        this.loadingBtn = this.loadingBtn.bind(this);
        this.loadContent = this.loadContent.bind(this);
        this.state = {
            data: [],
            isFetching: true,
            filter: ''
        }
    }
    

    componentDidMount() {
        window.scrollTo(0, 0)
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

    loadingBtn = () => {
        return (
            <div className="subsection">
            <center><div className="loadingio-spinner-pulse-d1ktdzklbz loading"><div className="ldio-z8mr9o1ztpp">
            <div></div><div></div><div></div>
            </div></div>
            </center>
            </div>
        )
    }

    loadContent = () => {
        // Filter method
        const filteredData = this.state.data.filter((e) => 
            e.id === parseInt(this.state.filter) || 
            e.firstName.toLowerCase().includes(this.state.filter.toLowerCase()) ||
            e.lastName.toLowerCase().includes(this.state.filter.toLowerCase())
        )
        return (
            <div style={{overflowX: "auto"}}>
                <div className="subsection">
                            <div className="subsectitle noselect">
                                Calculated Salary Dashboard
                            </div>
                
                <div className="filter">
                    <input type="text" className="tableFilter" placeholder="Filter (ID/First Name/Last Name)" defaultValue= {this.state.filter} onChange={e => this.setState({filter: e.target.value})} />
                    <label htmlFor="name" className="form__label">Displaying results for {this.state.filter}</label>
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
                        this.state.filter !== '' ?
                        filteredData.map ((item,index) => {
                            return <Item item={item} key={index} removeItem={() => this.removeEmployee(item, index)} />  
                        })
                        :
                        this.state.data.map((item,index)=> {
                            return <Item item={item} key={index} removeItem={() => this.removeEmployee(item, index)} />  
                        })
                        }
                </table>
                <div className="explanantion">
                    <span>* Calculation method:</span> (Hourly basis * Hours per day * Days per month) + ((% Bonus / 100) * Total sold)
                </div>   
            </div>
            </div>
        )
    }

    render() {
        return(
            <div className="section">
                <div className="section-content">
                    {this.props.user.isLoading === true ? <Redirect to='/' /> :  this.state.isFetching ? this.loadingBtn() : this.loadContent()}
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
        var calculatedPercent = this.props.item.percentPerSale / 100;
        return(
        <tbody>
            <tr>
                <td>{this.props.item.id}</td>
                <td>{this.props.item.firstName}</td>
                <td>{this.props.item.lastName}</td>
                <td>{(this.props.item.hourlyBasis * this.props.item.hoursPerDay * this.props.item.daysPerMonth) + calculatedPercent * this.props.item.totalSold} $</td>
            </tr>
        </tbody>
    )}
}

const mapStateToProps = state => {
    return { user: state.userEmail.user }
}

export default connect(mapStateToProps, { signIn })(Calc);