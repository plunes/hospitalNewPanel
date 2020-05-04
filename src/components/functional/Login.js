import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import SelectComponent from "../SelectComponent"
import React, { useState } from "react"
import {
    isValidPhoneNumber,
  } from 'react-phone-number-input';
  import validator from 'validator'
import { messaging } from 'firebase';

 const Login= (props) => {
   console.log(props,"props in HospitalSignup")
  const { addToast } = useToasts()
  const [ password, setPassword ] = useState(false)
  if(!!props.newUserRet){
    if(!!props.newUserRet.success){
      addToast(props.newUserRet.message, {appearance: 'success', autoDismiss:true}) 
    }else{
      addToast(props.newUserRet.message, {appearance: 'error', autoDismiss:true})
    }
    props.newUserClr()
    props.loadingOff()
}

   const submitdetails = () => {  
    if(props.email === '' ||props.password===''){
        addToast("Enter all the details",{ appearance: 'error', autoDismiss:true })
    }else{
        let error = false
        let message = ""

        if (props.email.includes('@')) {
            if(!validator.isEmail(props.email)){
                error = true
                message = "Invalid email address"
            }
        }else{
            if(!isValidPhoneNumber('+91'+props.email)){
                error = true
                message = "Invalid Mobile number"
            }
        }

        if(!validator.isLength(props.password, { min: 8, max: 50 })){
            error = true
            addToast("Password length must between 8 to 50 characters",{ appearance: 'error', autoDismiss:true })
        } 

        if(!error){
            props.handleSubmit({
                email:props.email,
                password:props.password
           })
        }else{
            addToast(message,{ appearance: 'error', autoDismiss:true })
        }        
    }
    }


  return (
      <React.Fragment>
          <div className="sign_in_body_wrapper margin-top-medium_ris">
          <div>
    <h4 style={{fontWeight:'400'}} className="signUpText">Log In</h4>
</div>
    <div style={{position:'relative'}}>
    {props.loading && <LoaderComponent />}
      <div className="form-group sign_in_form_group">
        <input
          className="form-control customborder"
          name="email"
          placeholder={`Email Id or Phonenumber`}
          onChange={props.handleChange}
          required
          value = {props.email}
        />
      </div>
      <div className="form-group sign_in_form_group">
      <input
          className="form-control customborder"
          name="password"
          placeholder="Password"
          onChange={props.handleChange}
          value = {props.password}
          type={password?"password":'text'}
          required
     />
     <span onClick={()=>setPassword(!password)} toggle="#password-field" className=" field-icon toggle-password"> <i className={password?"fa fa-fw fa-eye-slash password_eye":'fa fa-fw fa-eye password_eye'} /> </span>
  
    </div>
       
    <div className="form-group buttonSignUp">
        <button style={{width:'100%'}} onClick={()=>submitdetails()}  className="common-button margin-top-medium_ris">
          Login
        </button>
    </div>
    <div className="text-center sign_in_forgot_password">
        Forgot Passsword
    </div>

    <div className="text-center sign_in_no_account margin-top-medium_ris">
        Don't have an account?
    </div>

    <div className="text-center margin-top-medium_ris  sign_in_sign_up">
        Sign Up
    </div>
    <br />
    </div>
 
          </div>
   
  </React.Fragment>
     )
}
 

export default Login