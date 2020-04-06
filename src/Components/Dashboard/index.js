import React from "react";
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import './index.css';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.onFail = this.onFail.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess = () => {
    return (
      <div className="subsection">
        <div className="subsectitle noselect">
          About the process
        </div>
        <div className="subsection-content">
          So.. you might ask your self what EasyCalc stands for. <br />
          EasyCalc is a project, made by Raz Levy (a.k.a RleDEV), which was made for human resources fields, to make it easier to calc their employee's salary. <br />
          EasyCalc's users have the ability to add employees (unlimited), view their added employees using a smart table, exporting the table to CSV and calculate. <br />
          Using our table component, you may also filter your employees by <b>first name, last name or employee ID</b>, and export that data also to CSV file. <br />
          So, what are you waiting for? click NOW on the <b><i className="fas fa-plus" aria-hidden="true"></i> button</b> on the left side of your screen, and start adding your employees today.
        </div>
        <div className="subsectitle noselect">
          Abilities of EasyCalc's users
        </div>
        <div className="subsection-content">
          <div className="ability"><h3>1.</h3>Add employees</div>
          <div className="ability"><h3>2.</h3>Delete employees</div>
          <div className="ability"><h3>3.</h3>View employees</div>
          <div className="ability"><h3>4.</h3>Filter employees</div>
          <div className="ability"><h3>5.</h3>Export employees to CSV file</div>
          <div className="ability"><h3>6.</h3>Calculate Salary</div>
        </div>
      </div>
    )
  }

  onFail = () => {
    return (
      <div className="subsection">
      <div className="subsectitle noselect">
        Please log in to continue
      </div>
      <div className="subsection-content">
        You are not logged in, please log in to continue.
      </div>
    </div>
    )
  }
  
  render(){
    return (
      <div className="section">
        <div className="section-content">
          {this.props.user.name !== '' ? this.onSuccess() : this.onFail()}
        </div>
      </div>
  )};
}

const mapStateToProps = state => {
  return { user: state.userEmail.user }
}

export default connect(mapStateToProps, { signIn })(Dashboard)