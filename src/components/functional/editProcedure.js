import { ToastProvider, useToasts } from 'react-toast-notifications'
import React from "react"
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
    
   </div>   
  )
}
 

export default EditProcedure