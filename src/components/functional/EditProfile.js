import { ToastProvider, useToasts } from 'react-toast-notifications'
import React from "react"

 const EditProfileForm= (props) => {
  const { addToast } = useToasts()
  if(!!props.submitProfileRet){
      if(!!props.submitProfileRet.success){
        addToast(props.submitProfileRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.submitProfileRet.message, {appearance: 'success', autoDismiss:true})
      }
      props.clearSubmitProfileRet()
  }

   const submitdetails = () => {
        if(props.fullname === '' ||props.email==='' || props.phone==="" || props.location==="" ){
            addToast("Enter all the details",{ appearance: 'error' })
        }else{
            props.submitProfileDetails({
                 fullname:props.fullname,
                 phone:props.phone,
                 email:props.email,
                 location:props.location
            })
        }
    }

    if(props.successText){
        addToast(props.successText,{ appearance: 'succcess' })
        props.clearNotif()
    }
    if(props.errorText){
        addToast(props.errorText,{ appearance: 'errror' })
        props.clearNotif()
    }


  return (
    <div className="managePay">
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="full Name" 
    name="fullname" 
    onChange={props.handleChange} 
    value = {props.fullname}/>  
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="phone Number" 
    name="phone" 
    onChange={props.handleChange} 
    value = {props.phone}/>  
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="email ID*" 
    name="email" 
    onChange={props.handleChange} 
    value = {props.email}/>  
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="Location*" 
    name="location" 
    onChange={props.handleChange} 
    value = {props.location}/>  

     <button onClick={()=>submitdetails()} className="common-button">Submit</button>

    </div>
  )
}
 

export default EditProfileForm