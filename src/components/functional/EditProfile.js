import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React from "react"
import AnimatedMount from "../../HOC/AnimatedMount"
import Button from './Button'

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
                 [!!props.isCenter?'centerMobileNumber':'phone']:props.phone,
                 [!!props.isCenter?'centerEmail':'email']:props.email,
                 location:props.location
            })
            props.loading()
        }
    }

console.log(props.isCenter,"props.iscenter")
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
     
     <div className='text-center'>
     <Button onClick={()=>submitdetails()} >Submit</Button>
     </div>
    </div>
  )
}

export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: 'translate3d(0, -2rem, 0)',
    transition: 'opacity 100ms ease-out, transform 100ms ease-out',
  },
  mountedStyle: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .5s ease-out, transform .5s ease-out',
  },
})(EditProfileForm)