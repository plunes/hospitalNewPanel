import React from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'

const UploadCatalogue = (props) => {
    const { addToast } = useToasts()
    if(!!props.uploadRet){
        if(!!props.uploadRet.success){
          addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
        //   props.updateImage({
        //       imageUrl:props.uploadRet.url
        //   })
        }else{
          addToast(props.uploadRet.message, {appearance: 'error', autoDismiss:true})
        }
        props.uploadRetClr()
    }
  
    if(!!props.uploadProceduresRet){
      if(!!props.uploadProceduresRet.success){
        addToast(props.uploadProceduresRet.message, {appearance: 'success', autoDismiss:true}) 
        // props.getProfileDetails()
        props.closeModal()
      }else{
        addToast(props.uploadProceduresRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.uploadProceduresClr()
  }

  const handleButtonClick = ()=>{
    let element = document.getElementById('uploatCatalogue')
    element.click()
}

const handleUpload = (e) => {
  e.preventDefault();
  e.stopPropagation()
  var reader = new FileReader();
  var file = e.target.files[0];

  if(!!file){
    if (file.size > 2 * 1024 * 1024) {
      console.log("File Tooo Big")
      addToast('File size should be less than 2MB', {appearance: 'error', autoDismiss:true})
    } else {
      props.uploadProcedures({ file: file, field: 'file'})
      reader.onloadend = () => {
      reader.readAsDataURL(file);
    }
  }
}else{
  addToast('No File Found', {appearance: 'error', autoDismiss:true})
}
}



    return (
        <div className ='modal-wrapper-small_ris'>
        <div className="modal-heading_ris">Add Catalogue</div>
        <p className="modal-p_ris margin-top-medium_ris text-center">We'll update you when we upload your price</p>
        <p className="modal-p_ris margin-top-small_ris text-center">Prefered format <strong>(xlsx)</strong></p>
        <div className="text-center margin-top-medium_ris">
        <button onClick={()=>handleButtonClick()}
         className="common-button">Upload</button>
         <input  
    style={{display:'inline',display:'none'}}
    id="uploatCatalogue"
    type="file" 
    accept=".pdf, .docx, .xlsx"
    onChange ={(e)=>handleUpload(e)}
    />
        </div>
        </div>         
    )
}

 export default UploadCatalogue