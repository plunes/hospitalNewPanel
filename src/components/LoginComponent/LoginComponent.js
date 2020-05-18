import React, { Component } from 'react';
import './LoginComponent.css';
import { createLogin, newUserClr } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import AuthHeader from "../functional/AuthHeader"
import Login from '../functional/Login';


class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailId:'',
            password:'',
            phone_number:'',
            loading:false  
        } 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        
        let data;
        let deviceId = localStorage.getItem('deviceId')
            if (this.state.emailId.includes('@')) {
                data = {
                    'email': this.state.email,
                    'password': this.state.password,
                    "deviceId": [deviceId]
                }
            } else {
                data = {
                    'mobileNumber': this.state.email,
                    'password': this.state.password,
                    "deviceId" : [deviceId]
                }
            }
            this.setState({
              loading:true
            })
        this.props.createLogin(data);
    }
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        
    }

    loadingOff = () =>{
      this.setState({
        loading:false
      })
    }
    

    render() {
      let isAuth = localStorage.getItem('token')
      if(isAuth){
       
      return  <Redirect
        to={{
          pathname : '/dashboard'
        }}
      />
      }
        // Fields Mobile Number/ Email
        // Password
        // UserDetails action payload store (Dispatch)
        return (
          <React.Fragment>
          <div className="row">
          <AuthHeader/>
          </div>
          <div className='row '>
           
                    <div className='col-md-6 sidetimgcol sign_up_he'>
                        <img className="signImage"  src="Mobile-login.png" alt="SignUp" />
                    </div>
                    <div className='col-md-6'>
                        <div className='col-md-1'>
                        </div>
                        <div className="col-md-7 signupHospitalForm" >
                            <Login 
                            email = {this.state.email}
                            password = {this.state.password}
                            handleChange = {this.handleChange}
                            handleSubmit = {this.handleSubmit}
                            loadingOff = {this.loadingOff}
                            loading = {this.state.loading}
                            newUserClr = {this.props.newUserClr}
                            newUserRet = {this.props.newUserRet}
                            />
                        </div>
                    </div>
                    </div>
               
        </React.Fragment>
        )
    }
}
LoginComponent.propTypes = {
    createLogin: PropTypes.func.isRequired,
    newUserClr: PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    newUserRet:state.user.newUserRet
  })
export default connect( mapStateToProps , { createLogin, newUserClr })(LoginComponent);

