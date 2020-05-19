import React from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import {  Link } from "react-router-dom"

import {
    isValidPhoneNumber,
  } from 'react-phone-number-input';
  import validator from 'validator'


const EnterEmail = (props) =>{
    const { addToast } = useToasts()
    if(!!props.getOtpRet){
    if(!!props.getOtpRet.success){
        addToast(props.getOtpRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.getOtpRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.getOtpClr(props.getOtpRet.success)
  }


    const submitdetails = () => {  
        if(props.email === ''){
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
            if(!error){
                props.handleSubmit({
                    email:props.email
               })
            }else{
                addToast(message,{ appearance: 'error', autoDismiss:true })
            }        
        }
        }



    return <div>
        <div>
        <h2 className="forgot-heading">Please enter your Email Id or<br></br>Phone Number</h2>
        </div>
        <div>   
        <input 
        type="text"
        className="form-control editbankdetailfield input-field-common"
        placeholder="Email id or Phone Number" 
        name="email" 
        onChange = {props.handleChange} 
        value = {props.email}
        />  
        </div>
     <Link to="">
         <button onClick={()=>{}} className="common-button-white">Cancel</button>
     </Link>
     <button onClick={()=>submitdetails()} className="common-button ml-5">Ok</button>
    </div>
}

export default EnterEmail