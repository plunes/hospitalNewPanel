
import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React from "react"

 const ManagePayment= (props) => {
   console.log(props.loadingState,"props in EditProfileForm")
  const { addToast } = useToasts()
  if(!!props.submitBankDetailsRet){
      if(!!props.submitBankDetailsRet.success){
        addToast(props.submitBankDetailsRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.submitBankDetailsRet.message, {appearance: 'success', autoDismiss:true})
      }
      props.loadingOff()
      props.submitBankDetailsClr()
  }

   const submitdetails = (e) => {
       e.preventDefault()
        if(props.bankname === '' ||props.accnumber==='' || props.ifsccode==="" || props.pannumber===""  ||  props.accountname==="" ){
            addToast("Enter all the details",{ appearance: 'error' })
        }else{
            props.bankDetails({
                    "name": props.accountname,
                    "bankName": props.bankname,
                    "ifscCode": props.ifsccode,
                    "accountNumber": props.accnumber,
                    "panNumber": props.pannumber
            })
        }
    }


  return (
<form onSubmit={submitdetails} className="ManagePayForm AllComponents">
  {props.loading && <LoaderComponent />
 }  
 <div className="ManagePay"><h4><b>Manage Payment</b></h4></div>
 <div className="managePay">
 <input
  type="text" 
  className="form-control editbankdetailfield"
  placeholder="Bank Name" 
  name="bankname"
  onChange={props.handleChange} 
  value = {props.bankname}/>

 <input 
 type="text"
 className="form-control editbankdetailfield" 
 placeholder="Account Number" 
 name="accnumber" 
 onChange={props.handleChange} 
 value= {props.accnumber }
 />
 <input type="text" 
 className="form-control editbankdetailfield" 
 placeholder="IFSC Code" 
 name="ifsccode" 
 onChange={props.handleChange}  
 value= {props.ifsccode}/>

 <input
 type="text" 
 className="form-control editbankdetailfield" 
 placeholder="Pan Number" name="pannumber" 
 onChange={props.handleChange} 
 value= {props.pannumber}/>
 <input 
 type="text" 
 className="form-control editbankdetailfield" 
 placeholder="Account Holder's Name" 
 name='accountname' 
 onChange={props.handleChange} 
 value= {props.accountname}
 />
 <button type="submit" className="btn btn-success proceedbtn">Proceed</button>
 </div>
</form>
  )
}
 

export default ManagePayment







































