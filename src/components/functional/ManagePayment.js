
import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React from "react"
import validator from "validator"
import { is_valid_pan } from '../../utils/common_utilities'
import AnimatedMount from "../../HOC/AnimatedMount"
import Button from './Button'
function  MyError(message){
  console.log(this,"this in myerror")
  this.message = message;
}
MyError.prototype = new Error()


 const ManagePayment= (props) => {
   console.log(props.loadingState,"props in EditProfileForm")
  const { addToast } = useToasts()
  if(!!props.submitBankDetailsRet){
      if(!!props.submitBankDetailsRet.success){
        addToast(props.submitBankDetailsRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.submitBankDetailsRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.loadingOff()
      props.submitBankDetailsClr()
  }

   const submitdetails = (e) => {
       e.preventDefault()
      console.log(props,"props in submitdetails")
       try{
        if(props.accnumber===''){
            throw new MyError('Please  enter your account number')
        }
        if(props.ifsccode===''){
          throw new MyError('Please enter your Bank IFSC code')
          }
        if(props.bankname===''){
            throw new MyError('Please enter your Bank Name')
          }
        if(props.accountname===''){
          throw new MyError('Please enter your account name')
          }
      if(!is_valid_pan(props.pannumber)){
        throw new MyError('Please enter a valid pan number')
          }
          props.bankDetails({
          "name": props.accountname,
          "bankName": props.bankname,
          "ifscCode": props.ifsccode,
          "accountNumber": props.accnumber,
          "panNumber": props.pannumber
  })
    }catch(e){
        console.log(e,"error in Catch Block")
       addToast(e.message, {appearance: 'error', autoDismiss:true})
    }
    }

  return (
<form onSubmit={submitdetails} className='new_card_class'>
  {props.loading && <LoaderComponent />
 }  
 <div>
   <div className="manage_payment_heading_wrapper">
     <span className='manage_payment_heading_sec_1'>
        <span className='manage_payments_heading_wrapper'>
        <h4><b>Manage Payment</b></h4>
        <text className="manage_payments_sub_heading">
           {/* Space for text, space for text, space for text, space for text, space for text, space for text */}
        </text>
        </span>
     
     </span>
     <span className='manage_payment_heading_sec_2'>
        <img className="manage_payment_img" src= "/icon/manage_payment.svg"  />
     </span>
   </div>
  </div>
  <div style={{padding:'1rem'}}>
 <div className="flex_parent_rish">
   <span className="flex_child_rish_manage_payments">
   <input
  type="text" 
  className="form-control editbankdetailfield flex_child_rish"
  placeholder="Bank Name" 
  name="bankname"
  onChange={props.handleChange} 
  value = {props.bankname}/>

   </span>

   <span className="flex_child_rish_manage_payments">
   <input 
 type="text"
 className="form-control editbankdetailfield " 
 placeholder="Account Number" 
 name="accnumber" 
 onChange={props.handleChange} 
 value= {props.accnumber }
 />
   </span>
 </div>
 <div className="flex_parent_rish">

 <span className="flex_child_rish_manage_payments">
 <input type="text" 
 className="form-control editbankdetailfield" 
 placeholder="IFSC Code" 
 name="ifsccode" 
 onChange={props.handleChange}  
 value= {props.ifsccode}/>
 </span>
 <span className="flex_child_rish_manage_payments">
 <input
 type="text" 
 className="form-control editbankdetailfield" 
 placeholder="Pan Number" name="pannumber" 
 onChange={props.handleChange} 
 value= {props.pannumber}/>
   </span>


 </div>

 <div className="flex_parent_rish">
 <span className="flex_child_rish_manage_payments">
 <input 
 type="text" 
 className="form-control editbankdetailfield" 
 placeholder="Account Holder's Name" 
 name='accountname' 
 onChange={props.handleChange} 
 value= {props.accountname}
 />
   </span>
 </div>
</div>
<div className="text-center" style={{marginBottom:'1rem'}}>
<Button type="submit" onClick = {(e)=>submitdetails(e)} style={{position:'relative', bottom:'1rem'}} >Proceed</Button>
</div>

</form>
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
})(ManagePayment)






































