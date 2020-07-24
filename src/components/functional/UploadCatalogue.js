import React , { useState , useEffect} from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'

const UploadCatalogue = (props) => {
    const { addToast } = useToasts()
    const [ success, setSuccess ] = useState(false)
    // if(!!props.uploadRet){
    //     if(!!props.uploadRet.success){
    //       addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
         

    //     }else{
    //       addToast(props.uploadRet.message, {appearance: 'error', autoDismiss:true})
    //     }
    //     // props.uploadRetClr()
    // }
  



  useEffect( () => {
    if(!!props.uploadProceduresRet){
      if(!!props.uploadProceduresRet.success){
        addToast(props.uploadProceduresRet.message, {appearance: 'success', autoDismiss:true}) 
        // props.getProfileDetails()
        setSuccess(true)
        setTimeout(()=>{
           props.closeModal()
        }, 5000)
        // props.closeModal()
      }else{
        addToast(props.uploadProceduresRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.uploadProceduresClr()
  }

  if(!!props.downloadCatalogueRet){
    if(!!props.downloadCatalogueRet.success){
      addToast(props.downloadCatalogueRet.message, {appearance: 'success', autoDismiss:true}) 
    }else{
      addToast(props.downloadCatalogueRet.message, {appearance: 'error', autoDismiss:true})
    }
    props.downloadCatalogueClr()
}
 }, [props.uploadProceduresRet,  props.downloadCatalogueRet])

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
        <div style={{fontWeight:'600'}} className="modal-heading_ris">Add Catalogue</div>
      {success ?  <div className="text-center margin-top-medium_ris">
         <text style={{fontSize:'1.5rem'}}>We have received your catalog, We would be uploading it after verification in the next 24-48 hours</text>
       </div> :
        <div className="text-center margin-top-medium_ris">
        <button onClick={()=>handleButtonClick()} type="button" className="btn btn-light-green">
            <span className="glyphicon glyphicon-search"></span> Upload Catalogue
        </button>
       <div>
       <text className='catalogue_note'><text className='bold'>Note :</text>Upload your Catalogue from here in a file or go to "Available Procedures" section to add prices of services directly to your catalogue and start receiving Patients
       </text>
       <div className="text-center margin_top_small_rish"> <text onClick = {()=> props.downloadCatalogue()} className='link_text_rish '>Click to download a sample</text></div>
       </div>
       <input  
    style={{display:'inline',display:'none'}}
    id="uploatCatalogue"
    type="file" 
    accept=".pdf, .docx, .xlsx"
    onChange ={(e)=>handleUpload(e)}
    />
</div>}
      
      
        </div>   
    )
}

 export default UploadCatalogue