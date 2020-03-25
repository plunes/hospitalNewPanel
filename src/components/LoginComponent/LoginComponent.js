import React, { Component } from 'react';
import './LoginComponent.css';
import { createLogin } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';


class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailId:'',
            password:'',
            phone_number:'',
            
        } 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    handleSubmit(e){
        e.preventDefault();
        let data;
        let deviceId = localStorage.getItem('deviceId')
            if (this.state.emailId.includes('@')) {
                data = {
                    'email': this.state.emailId,
                    'password': this.state.password,
                    "deviceId": [deviceId]
                }
            } else {
                data = {
                    'mobileNumber': this.state.emailId,
                    'password': this.state.password,
                    "deviceId" : [deviceId]
                }
            }
        this.props.createLogin(data);
    }
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        
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
            <div className="container">
            <div className="row">
                <div className="col-xl-6"><div>
                  <img className="loginImage"  src="/login.png"  alt=".."/>
                    </div>
                </div>
                <div className="col-xl-6">
                  <div className = 'row'>
                    <div className = 'col-md-1'>

                    </div>
                    <div className = 'col-md-6'>
                    <h1 className="login-text">Login</h1>
                     <form action="" onSubmit ={this.handleSubmit}>
                      <div  className=" form-group">
                        <input className="form-controlll inputLogin"   name="emailId" placeholder="Email id or Phone Number" onChange={this.handleChange}  />
                      </div>
                      <div  className="form-group">
                        <input className="form-controlll inputLogin" type='password' name="password" placeholder="Password" onChange = {this.handleChange}  />
                          <button className="button-login" type='submit'>Login</button>
                      </div>
                    </form>
                    {/* <a href="/forgotPassword" ><h6 className="forgotPassword" >Forgot Password?</h6></a> */}
                    <h6 className="signupClass" >Don't have an account?<a href="/signup" >Signup</a> </h6>
                  </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
}
LoginComponent.propTypes = {
    createLogin: PropTypes.func.isRequired
  };
export default connect(null, { createLogin })(LoginComponent);

