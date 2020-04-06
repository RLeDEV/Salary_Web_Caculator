import React from "react";
import { connect } from 'react-redux';
import './index.css';

class Add extends React.Component {
  constructor(props){
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isNOTLoggedIn = this.isNOTLoggedIn.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      employeeEmail: '',
      city: '',
      hourlyBasis: 15,
      daysOfWork : 25,
      hoursOfWork: 8,
      bonus: 1.5,
      ownerEmail: ''
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  sendForm = (email) => {
    var data = {
      email: this.props.user.email,
      employeeEmail: this.state.employeeEmail,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      hourlyBasis: this.state.hourlyBasis,
      hoursPerDay: this.state.hoursOfWork,
      daysPerMonth: this.state.daysOfWork,
      percentPerSale: this.state.bonus
    }
    fetch('/employees/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function(response) {
      if(response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data) {
      if (data === "success") {
        console.log("success");
      }
    }).catch(function(err) {
      console.log(err);
    })
  }

  isLoggedIn = () => {
    return (
      <div className="form-style-10">
        <div className="subsectitle noselect">
            Add new employee
          </div>
      <form>
          <div className="section"><span>1</span><label className="section-name">Full Name</label></div>
          <div className="inner-wrap">
            <label>First Name <input type="text" name="firstName" onChange={this.onChangeHandler} /></label>
            <label>Last Name <input type="text" name="lastName" onChange={this.onChangeHandler} /></label>
          </div>

          <div className="section"><span>2</span><label className="section-name">Email</label></div>
          <div className="inner-wrap">
            <label>Manager's Email Address <input type="email" name="field3" value={this.props.user.email} disabled/></label>
            <label>Employee's Email Address <input type="email" name="employeeEmail" onChange={this.onChangeHandler}/></label>
          </div>
          <div className="section"><span>3</span><label className="section-name">Personal Information</label></div>
            <div className="inner-wrap">
            <label>City <input type="text" name="field5" onChange={this.onChangeHandler} /></label>
            <label>Hourly Basis (in $) <input type="text" name="hourlyBasis" onChange={this.onChangeHandler} defaultValue="15" /></label>
            <label>Hours of work per day <input type="text" name="hoursOfWork" onChange={this.onChangeHandler} defaultValue="8" /></label>
            <label>Days of work per month <input type="text" name="daysOfWork" onChange={this.onChangeHandler} defaultValue="25" /></label>
            <label>Bonus % per sale <input type="text" name="bonus" onChange={this.onChangeHandler} defaultValue="1.5" /></label>
          </div>
          <div className="button-section">
            <input type="submit" name="submit" onClick={this.sendForm} />
          </div>
      </form>
      </div>
    );
  }

  isNOTLoggedIn = () => {
    return (
      <div>
        <center>Please log in to continue.</center>
      </div>
    )
  }

  render() {
  return (
    <div className="section">
      <div className="section-content">
        <div className="subsection">
              {this.props.user.email !== '' ? this.isLoggedIn() : this.isNOTLoggedIn()}
          </div>
      </div>
    </div>
  );
  }
}

const mapStateToProps = state => {
  return { user: state.userEmail.user }
}

export default connect(mapStateToProps)(Add);