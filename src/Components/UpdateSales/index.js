import React from "react";
import { connect } from 'react-redux';
import './index.css';

class UpdateSale extends React.Component {
  constructor(props){
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isNOTLoggedIn = this.isNOTLoggedIn.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.state = {
      employeeEmail: '',
      employeeID: 0,
      amountToAdd: 0
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate() {
    if(localStorage.getItem('user') === null || localStorage.getItem('user') === 'null')
    {
      window.location.href = '/'
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  sendForm = (event) => {
    var data = {
      employeeEmail: this.state.employeeEmail,
      ownerEmail: this.props.user.email,
      id: this.state.employeeID,
      amount: this.state.amountToAdd
    }
    fetch('/employees/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function(response) {
      if(response.status !== 400) {
        // throw new Error("Bad response from server");
        console.log(response);
      }
      console.log(response)
    }).catch(function(err) {
      console.log(err);
    })
  }

  isLoggedIn = () => {
    return (
      <div>
        <div className="subsectitle noselect">
          Add sales to exist employee
        </div>
      <div className="form-style-10">
      <form>
          <div className="section"><span>1</span><label className="section-name">Identification</label></div>
          <div className="inner-wrap">
            <label>Employee ID <input type="number" name="employeeID" onChange={this.onChangeHandler} /></label>
            <label>Employee's Email <input type="email" name="employeeEmail" onChange={this.onChangeHandler} /></label>
          </div>

          <div className="section"><span>2</span><label className="section-name">Updated information</label></div>
          <div className="inner-wrap">
            <label>Number to update in $<input type="number" name="amountToAdd" onChange={this.onChangeHandler} /></label>
          </div>
          <div className="button-section">
            <input type="submit" name="submit" onClick={this.sendForm} />
          </div>
      </form>
      </div>
      </div>
    );
  }

  isNOTLoggedIn = () => {
    return (
      <div>
        <center>Updating now, please wait..</center>
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

export default connect(mapStateToProps)(UpdateSale);