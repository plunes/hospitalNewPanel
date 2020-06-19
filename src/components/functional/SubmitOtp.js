import React, { useState } from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import {  Link } from "react-router-dom"

import {
    isValidPhoneNumber,
  } from 'react-phone-number-input';
  import validator from 'validator'


const SubmitOtp = (props) =>{
    const { addToast } = useToasts()
    const [newPassword, setNewPassword] = useState(false);
    const [rePassword, setRePassword] = useState(false);
  //   if(!!props.submitOtpRet){
  //   if(!!props.submitOtpRet.success){
  //       addToast(props.submitOtpRet.message, {appearance: 'success', autoDismiss:true}) 
  //     }else{
  //       addToast(props.submitOtpRet.message, {appearance: 'error', autoDismiss:true})
  //     }
  //     props.submitOtpClr(props.submitOtpRet.success)
  // }


  const submitdetails = () => {
    if(props.newPassword === '' ||props.rePassword==='' ){
        addToast("Enter all the details",{ appearance: 'error', autoDismiss:true  })
    }else if(props.newPassword !== props.rePassword){
      addToast("Passwords do not match",{ appearance: 'error', autoDismiss:true  })
    }else if(props.otp.length !== 4){
       addToast("OTP should be 4 characters long.",{ appearance: 'error', autoDismiss:true  })
    }else{
        props.submitDetails({
            password:props.newPassword,
            otp:props.otp,
            userId:props.email
       })
    }
}

const cancel = ()=>{
  console.log("Inside canecel")
  
}


    return <div>
        <div>
        <h2 className="forgot-heading">Please enter your New Password<br></br></h2>
        </div>
        <div> 
        <input 
        type="text"
        className="form-control editbankdetailfield input-field-common"
        placeholder="Enter OTP" 
        name="otp" 
        onChange = {props.handleChange} 
        value = {props.otp}
        />    
         <div  style={{position:'relative'}} >
        <input 
            className="form-control editbankdetailfield input-field-common"
            placeholder="New Password" 
            style={{position:'relative'}}
            name="newPassword" 
            type={newPassword?"password":'text'}
            onChange={props.handleChange} 
            value = {props.newPassword}/> 
             <span onClick={()=>setNewPassword(!newPassword)} toggle="#password-field" className=" field-icon toggle-password"> <i className={newPassword?"fa fa-fw fa-eye-slash password_eye":'fa fa-fw fa-eye password_eye'} /> </span> 
             </div>
            <div  style={{position:'relative'}} >
            <input 
            className="form-control editbankdetailfield input-field-common"
            placeholder="Re-enter New Password" 
            name="rePassword"
            type={rePassword?"password":'text'}
            onChange={props.handleChange} 
            value = {props.rePassword}/>
             <span onClick={()=>setRePassword(!rePassword)} toggle="#password-field" className=" field-icon toggle-password"> <i className={rePassword?"fa fa-fw fa-eye-slash password_eye":'fa fa-fw fa-eye password_eye'} /> </span>
             </div>
        </div>
      <Link to="/signin">
     <button onClick={()=>cancel()} className="common-button-white">Cancel</button>
     </Link>
     <button onClick={()=>submitdetails()} className="common-button ml-5">Reset</button>
    </div>
}

export default SubmitOtp