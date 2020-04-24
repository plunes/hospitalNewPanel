import { ToastProvider, useToasts } from 'react-toast-notifications'
import React from "react"

 const ChangePassForm= (props) => {
  const { addToast } = useToasts()
  if(!!props.resetPassRet){
    console.log(props.resetPassRet,"props.resetPassret")
    
      if(!!props.resetPassRet.success){
        addToast(props.resetPassRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.resetPassRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.clearResetRet()
  }

   const submitdetails = () => {
        if(props.newPassword === '' ||props.rePassword==='' ){
            addToast("Enter all the details",{ appearance: 'error', autoDismiss:true  })
        }else if(props.newPassword !== props.rePassword){
          addToast("Passwords do not match",{ appearance: 'error', autoDismiss:true  })
        }else{
            props.submitResetDetails({
                 password:props.newPassword,
                 phone:props.user.mobileNumber
            })
        }
    }

    if(props.successText){
        addToast(props.successText,{ appearance: 'succcess', autoDismiss:true })
        props.clearNotif()
    }
    if(props.errorText){
        addToast(props.errorText,{ appearance: 'errror', autoDismiss:true })
        props.clearNotif()
    }


  return (
    <div className="managePay">
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="New Password" 
    name="newPassword" 
    onChange={props.handleChange} 
    value = {props.newPassword}/>  
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="Re-enter New Password" 
    name="rePassword" 
    onChange={props.handleChange} 
    value = {props.rePassword}/>  
    
     <button onClick={()=>{}} className="common-button-white">Cancel</button>
     <button onClick={()=>submitdetails()} className="common-button ml-5">Reset</button>

    </div>
  )
}
 

export default ChangePassForm