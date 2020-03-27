import React from "react";
import './index.css';

export default function Add() {
  return (
    <div className="section">
      <div className="section-content">
        <div className="subsection">
          <div className="subsection-content">
            <div class="form-style-10">
              <h1>Add New Employee</h1>
              <form>
                  <div class="section"><span>1</span>Full Name</div>
                  <div class="inner-wrap">
                    <label>First Name <input type="text" name="field1" /></label>
                    <label>Last Name <input type="text" name="field2" /></label>
                  </div>

                  <div class="section"><span>2</span>Email</div>
                  <div class="inner-wrap">
                    <label>Email Address <input type="email" name="field3" /></label>
                  </div>
                  <div class="section"><span>3</span>Personal Information</div>
                    <div class="inner-wrap">
                    <label>City <input type="text" name="field2" /></label>
                    <label>Hourly Basis <input type="text" name="field2" /></label>
                    <label>Hours of work per day <input type="text" name="field2" /></label>
                    <label>Days of work per month <input type="text" name="field2" /></label>
                    <label>Bonus % per sale <input type="text" name="field2" /></label>
                  </div>
                  <div class="button-section">
                    <input type="submit" name="submit"/>
                  </div>
              </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}