import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React, { useRef , useEffect} from "react"

 const EditBio= (props) => {
  const { addToast } = useToasts()
  const textareaRef =  useRef()


  useEffect(() =>{
    if(!!props.editBioRet){
      if(!!props.editBioRet.success){
        addToast(props.editBioRet.message, {appearance: 'success', autoDismiss:true}) 
        // props.getUserDetails()
        props.set_user_info({
          biography:props.biography
        })
        props.toggleEditBio()
      }else{
        addToast(props.editBioRet.message, {appearance: 'success', autoDismiss:true})
      }
      props.loadingOff()
      props.editBioClr()
  }
  },[props.editBioRet])

 const  keyPress =(e)=>{
    if(e.keyCode === 13){
      
       // put the login here
    }else{
        props.handleBioChange(e)
    }
 }

   const submitdetails = () => {
        if(props.biography === ''){
            addToast("Enter bio",{ appearance: 'error', autoDismiss:true })
        }else{
          if(props.biography !== props.user.biography){
            props.editBio({
                biography:props.biography
            })
          }
        }
    }


  return (
    <div>
        <div style={{marginBottom:'1rem'}} className="location_edit_parent">
               <text style={{marginLeft:'1rem'}} className="location_profile_text">Introduction</text>
               <div className="edit_location_div">
                 {props.editBioFlag? 
                 <React.Fragment>
                 <span style={{width:'fit-content', marginLeft:'1rem'}} onClick={()=>props.toggleEditBio()} className="edi_intr hover_underline">Cancel</span>
                 <span style={{width:'fit-content'}} onClick={()=>submitdetails()} className="edi_intr hover_underline">Save</span>
                 </React.Fragment> 
                : <img src="/icon/edit_icon_rish.svg" onClick={()=>props.toggleEditBio()} className="edit_location_icon" />
                }
              </div>
         </div>
    <div className="col-lg-12 text_cmt">
    {props.loading && <LoaderComponent />}
   {((!props.editBioFlag) && (props.user.biography)) && <p className="loc">{props.user.biography}</p>}
  {props.editBioFlag &&  <textarea 
   name="biography" 
   ref={textareaRef}
   onChange ={props.handleBioChange}
   value={props.biography} 
   rows="4" 
   cols="90"
   name="comment" 
   form="usrform" /> 
   }
    </div>
    </div>
  )
}

export default EditBio