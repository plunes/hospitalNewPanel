import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React from "react"

 const EditProfileForm= (props) => {
   console.log(props.loadingState,"props in EditProfileForm")
  const { addToast } = useToasts()
  if(!!props.submitProfileRet){
      if(!!props.submitProfileRet.success){
        addToast(props.submitProfileRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.submitProfileRet.message, {appearance: 'success', autoDismiss:true})
      }
      props.loadingOff()
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
            props.loading()
        }
    }


  return (
    <div className="managePay">
      {props.loadingState && <LoaderComponent />}
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
    id="input_rish"
    disabled = {true}
    onChange={props.handleChange} 
    value = {props.phone}/>  
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="email ID*" 
    name="email" 
    id="input_rish"
    disabled={true}
    onChange={props.handleChange} 
    value = {props.email}/>  
    <input 
    type="text"
    className="form-control editbankdetailfield input-field-common"
    placeholder="Location*" 
    name="location" 
    id="input_rish"
    disabled={true}
    onChange={props.handleChange} 
    value = {props.location}/>  

     <button onClick={()=>submitdetails()} className="common-button">Submit</button>

    </div>
  )
}
 

export default EditProfileForm