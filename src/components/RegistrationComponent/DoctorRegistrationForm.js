import React, { Component } from 'react';

class DoctorRegistrationForm extends Component {
    render() {
        return (
            <div>
                {/* <input type="radio" name="gender" value="male"/> Male
                 <input type="radio" name="gender" value="female"/> Female */}

                 <form>
                      <div className="form-group">
                          <input className="form-control3" name="fullName" placeholder=" Name" onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                          <textarea className="form-control3 " rows="3" name="MobileNo" placeholder="MobileNo" onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="form-group">
                          <input className="form-control3" name="emailid" placeholder="EmailId" onChange={this.handleChange} required/>
                    </div>
                    <div class="form-group">
                        <input class="form-control3" type='date' name='dob' id="example-datetime-local-input" onChange={this.handleChange} required />
                    </div>
                    <div className="form-group"><span>
                        
                        <input type="password" className="form-control3" placeholder="Password" onChange={this.handleChange} name="password" required /></span>
                    </div>
                    <div>
                        <p className=" hospital-text">Add specialization<br></br>
                            <a href="">Add Specialization & Service </a>
                        </p>
                    </div>
                    <div className="form-group" className='buttonSignUp'>
                        <button type="submit" className="btn btn-success btn-lg btn-block">Add</button>
                    </div>
                    
                </form>

            </div>
        );
    }
}

export default DoctorRegistrationForm;