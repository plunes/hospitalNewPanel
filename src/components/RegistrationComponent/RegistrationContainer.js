import React from 'react';
// import UserRegistrationForm from './UserRegistrationForm';
import { Redirect } from 'react-router-dom';
import '../RegistrationComponent/RegistrationComponent.css';
// import DoctorRegistrationForm from "./DoctorRegistrationForm";
import HospitalRegistrationForm from './HospitalRegistrationForm';
import  "./RegistrationComponent.css";

class RegistrationContainer extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            showGeneralUserForm: false,
            showDoctorForm: false,
            showHospitalForm: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.baseUrl = 'http://10.34.18.136:3000/';
    }

    handleChange(e){
        let selectedValue = e.target.value;
        switch(selectedValue){
            case 'userForm':
                this.setState({
                    // showGeneralUserForm : true,
                    // showDoctorForm : false,
                    showHospitalForm : false,
                })
                break;
            case 'docForm':
                    this.setState({
                        // showGeneralUserForm : false,
                        // showDoctorForm : true,
                        showHospitalForm : false,
                    })
                break;
            case 'hospitalForm':
                    this.setState({
                        // showGeneralUserForm : false,
                        // showDoctorForm : false,
                        showHospitalForm : true,
                    })
                break;    
        }
    }

   
    render() {
        const { showLogin } = this.state

        if (showLogin) {
            return <Redirect to='/login' />
        }
        return (
           <div>
                <div className='row'>
                    <div className='col-md-6 sidetimgcol'>
                        <img className="signImage"  src="signup.png" />
                    </div>
                    <div className='col-md-6'>
                        <div className='col-md-1'>
                        </div>
                        <div className="col-md-6 signupHospitalForm" >
                            <div>
                                <h4 className="signUpText">Sign up</h4>
                            </div>
                            <div className="form-group">
                                <select className="TypeOfSignup customborder" onChange = {this.handleChange}>
                                    {/* <option value= 'userForm'>General User</option>
                                    <option value= 'docForm'>Doctors</option> */}
                                    <option value= 'hospitalForm'>Hospitals</option>
                                </select>
                            </div>
                            {/* {
                                this.state.showGeneralUserForm ?
                                <UserRegistrationForm  /> : null
                            }
                            {
                                this.state.showDoctorForm ? 
                                <DoctorRegistrationForm  /> : null
                            } */}
                            {
                                this.state.showHospitalForm ?
                                <HospitalRegistrationForm /> : null 
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationContainer;
