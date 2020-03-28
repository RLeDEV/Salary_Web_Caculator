import React from "react";
import './index.css';

class Add extends React.Component {
  constructor(props){
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isNOTLoggedIn = this.isNOTLoggedIn.bind(this);
    this.onBonusChange = this.onBonusChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onDaysOfWorkChange = this.onDaysOfWorkChange.bind(this);
    this.onEmployeeEmailChange = this.onEmployeeEmailChange.bind(this);
    this.onHourlyBasisChange = this.onHourlyBasisChange.bind(this);
    this.onHoursOfWorkChange = this.onHoursOfWorkChange.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      employeeEmail: '',
      city: '',
      hourlyBasis: 0,
      daysOfWork : 0,
      bonus: 0,
      ownerEmail: ''
    }
  }

  onFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value })
  }

  onLastNameChange = (event) => {
    this.setState({ lastName: event.target.value })
  }

  onEmployeeEmailChange = (event) => {
    this.setState({ employeeEmail: event.target.value })
  }

  onCityChange = (event) => {
    this.setState({ city: event.target.value })
  }

  onHourlyBasisChange = (event) => {
    this.setState({ hourlyBasis: event.target.value })
  }

  onDaysOfWorkChange = (event) => {
    this.setState({ daysOfWork: event.target.value })
  }

  onBonusChange = (event) => {
    this.setState({ bonus: event.target.value })
  }
  
  onHoursOfWorkChange = (event) => {
    this.setState({ hoursOfWork: event.target.value })
  }

  sendForm = (email) => {
    var data = {
      email: this.props.email,
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
      <form>
          <div className="section"><span>1</span>Full Name</div>
          <div className="inner-wrap">
            <label>First Name <input type="text" name="field1" onChange={this.onFirstNameChange} /></label>
            <label>Last Name <input type="text" name="field2" onChange={this.onLastNameChange} /></label>
          </div>

          <div className="section"><span>2</span>Email</div>
          <div className="inner-wrap">
            <label>Manager's Email Address <input type="email" name="field3" value={this.props.email} disabled/></label>
            <label>Employee's Email Address <input type="email" name="field3" onChange={this.onEmployeeEmailChange}/></label>
          </div>
          <div className="section"><span>3</span>Personal Information</div>
            <div className="inner-wrap">
            <label>City <input type="text" name="field5" onChange={this.onCityChange} /></label>
            <label>Hourly Basis (in $) <input type="text" name="field6" onChange={this.onHourlyBasisChange} /></label>
            <label>Hours of work per day <input type="text" name="field7" onChange={this.onHoursOfWorkChange} /></label>
            <label>Days of work per month <input type="text" name="field8" onChange={this.onDaysOfWorkChange} /></label>
            <label>Bonus % per sale <input type="text" name="field9" onChange={this.onBonusChange} /></label>
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
          <div className="subsection-content">
              {this.props.email !== '' ? this.isLoggedIn() : this.isNOTLoggedIn()}
            </div>
          </div>
      </div>
    </div>
  );
  }
}

export default Add;