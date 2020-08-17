import React , { useState , useEffect} from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'
import Button  from "./Button"
import Select from "../Select"

const UploadCatalogue = (props) => {
    const { addToast } = useToasts()
    const [ success, setSuccess ] = useState(false)
    const [upload, set_upload] = useState(true)
    const [speciality, set_speciality] = useState({
      name:'Complete Catlogue',
      value:'Complete Catlogue'
    })

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
      props.uploadProcedures({ file: file, field: 'file',id:speciality.value==="Complete Catlogue"?false:speciality.value})
      reader.onloadend = () => {
      reader.readAsDataURL(file);
    }
  }
}else{
  addToast('No File Found', {appearance: 'error', autoDismiss:true})
}
}

const speciality_name = [{name:'Complete Catlogue',value:'Complete Catlogue'},...props.specialities].filter(item=>{
     return !!(item.value === speciality.value)
})

    return (
        <div className ='modal-wrapper-medium_rish margin_top_medium_rish'>
             <div style={{fontWeight:'600'}} className="modal-heading_ris">Update Catalogue</div>
              <div className="tabs-header margin_top_small_rish">
                          <div style={{marginBottom:'1rem'}} className={`appointment_header_wrapper new_card_class`}>
                                  <span onClick={(e)=>set_upload(true)}   className={`appointment_header_child-1 ${upload?'active_appointment_header':''}`}>
                                      <text className={`appointment_header_text ${upload?'green-text-rish':''}`}>Upload Services</text>
                                      <div>
                                     
                                      </div>
                                  </span>                 
                                  <span onClick={(e)=>set_upload(false)}    className={`appointment_header_child-1 ${!upload?'active_appointment_header':''}`}>
                                  <text className={`appointment_header_text ${!upload?'green-text-rish':''}`}>Download Samples</text>
                                  </span>
                          </div>
              </div>

         {upload?<div className="upload_section_wrapper">
          {success ?  <div  style={{width:'95%',margin:'auto'}} className="text-center margin-top-medium_ris">
               <text style={{fontSize:'1.5rem'}}>We have received your catalog, We would be uploading it after verification in the next 24-48 hours</text>
              </div> :
        <React.Fragment>
          <div style={{width:'80%'}} className='catalogue_note'>
            <text className='bold'>Note :</text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
           </div>
          <div style={{width:'50%',margin:'auto'}} className="text-center margin-top-medium_ris">
              <Select
                  options = {[{name:'Complete Catlogue',value:'Complete Catlogue'},...props.specialities]}
                  handleChange = {(e)=>set_speciality({name:e.target.name ,value:e.target.value})}
                  placeholder= "Speciality"
                  input_text_class = "catalogue_dropdown"
                  wrapper_class = "catalogue_dropdown_wrapper"
                  value = {speciality.value}
                  name = "speciality_chosen"
                  label = "Speciality" />
       </div>
           <div className="text-center margin-top-medium_ris">
                <Button onClick={()=>handleButtonClick()} type="button">
                  {speciality.name==="Complete Catlogue"?"Upload Catalogue":`Upload ${speciality_name[0].name} `}
                </Button>
              </div>
       </React.Fragment>
       }
         </div>:
         <div  className="upload_section_wrapper">
              <React.Fragment>
              <div  style={{width:'80%'}} className='catalogue_note'><text className='bold'>Note :</text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.  </div>

              <div style={{width:'50%',margin:'auto'}} className="text-center margin-top-medium_ris">
              <Select
                    options = {[{name:'Complete Catlogue',value:'Complete Catlogue'},...props.specialities]}
                  handleChange = {(e)=>set_speciality({name:e.target.name ,value:e.target.value})}
                  placeholder= "Speciality"
                  input_text_class = "catalogue_dropdown"
                  wrapper_class = "catalogue_dropdown_wrapper"
                  value = {speciality.value}
                  name = "speciality_chosen"
                  label = "Speciality" />
               </div>
             
              <div className="text-center margin-top-medium_ris">
              <Button onClick={()=>props.downloadCatalogue(speciality.value==="Complete Catlogue"?false:speciality.value)} icon="download" type="button">
               {speciality.name==="Complete Catlogue"?"Dowload Sample":`Download ${speciality_name[0].name} Sample`}
              </Button>
          </div>
          </React.Fragment>
           </div>}
      
      
            {/* <div className="text-center margin_top_small_rish"> <text onClick = {()=> props.downloadCatalogue()} className='link_text_rish '>Click to download a sample</text></div> */}
            <input  
            style={{display:'inline',display:'none'}}
            id="uploatCatalogue"
            type="file" 
            accept=".pdf, .docx, .xlsx"
            onChange ={(e)=>handleUpload(e)}
            />
            </div>   
    )
}

 export default UploadCatalogue