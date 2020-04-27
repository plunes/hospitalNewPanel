import { ToastProvider, useToasts } from 'react-toast-notifications'
import React from "react"
import "./editProcedure.css"
import SelectComponent from  "../SelectComponent"

 const EditProcedure= (props) => {
  const { addToast } = useToasts()
//   if(!!props.resetPassRet){
//     console.log(props.resetPassRet,"props.resetPassret")
    
//       if(!!props.resetPassRet.success){
//         addToast(props.resetPassRet.message, {appearance: 'success', autoDismiss:true}) 
//       }else{
//         addToast(props.resetPassRet.message, {appearance: 'error', autoDismiss:true})
//       }
//       props.clearResetRet()
//   }

//    const submitdetails = () => {
//         if(props.newPassword === '' ||props.rePassword==='' ){
//             addToast("Enter all the details",{ appearance: 'error', autoDismiss:true  })
//         }else if(props.newPassword !== props.rePassword){
//           addToast("Passwords do not match",{ appearance: 'error', autoDismiss:true  })
//         }else{
//             props.submitResetDetails({
//                  password:props.newPassword,
//                  phone:props.user.mobileNumber
//             })
//         }
//     }



  return (
    <div className ='modal-wrapper-medium_ris'>
    <div className="modal-heading_ris">Details</div>
    {/* <form action="">
      <div className="col-lg-12">
      <label for="fname">Definition</label>
      <input type="text" id="definition" name="fname"/>
      </div>
      <div className="col-lg-12">
      <label for="lname">Material</label>
      <input type="text" id="country_code" name="country_code" pattern="[A-Za-z]{3}" title="Three letter country code"/>
      </div>
 
</form> */}
   </div>   
  )
}
 

export default EditProcedure