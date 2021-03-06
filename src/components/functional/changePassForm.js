import {  useToasts } from 'react-toast-notifications'
import React from "react"
import { Link } from "react-router-dom"
import Button from './Button'

 const ChangePassForm= (props) => {
  const { addToast } = useToasts()
   const submitdetails = () => {
        if(props.newPassword === '' ||props.rePassword==='' || props.oldPassword==='' ){
            addToast("Enter all the details",{ appearance: 'error', autoDismiss:true  })
        }else if(props.newPassword !== props.rePassword){
          addToast("Passwords do not match",{ appearance: 'error', autoDismiss:true  })
        }else{
            props.submitResetDetails({
                 newPassword:props.newPassword,
                 oldPassword:props.oldPassword
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
    placeholder="Old Password" 
    name="oldPassword" 
    onChange={props.handleChange} 
    value = {props.oldPassword}/>  
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
    
     <div className='text-center'>
     <Link to="/dashboard/settings">
     <Button   onClick={()=>{console.log()}} >Cancel</Button>
     </Link>
     <Button style={{marginLeft:'2rem'}} onClick={()=>submitdetails()} >Reset</Button>

     </div>

    </div>
  )
}
 

export default ChangePassForm