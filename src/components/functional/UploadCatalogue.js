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
        <div className="modal-heading_ris set_u_t">Set your Time</div>
        <div className="row modal-p_ris margin-top-small_ris text-center">
        <div className="modal-p_ris col-lg-6 time_s"><h2>8:30<small>AM</small></h2>
        
        
        </div>
        <div className="modal-p_ris col-lg-6 time_s"><h2>6:00<small>PM</small></h2>
       </div>
       <div className="new_scr2">
        <div className="new_scrol">
        <ul className="tme_d1">
         <li>6</li>
         <li>7</li>
         <li className="active">8</li>
         <li>9</li>
         <li>10</li>
         <li>11</li>
         <li>12</li>
         <li>1</li>
         <li>2</li>
         <li>3</li>
         <li>4</li>
         <li>5</li>
         <li>6</li>
          </ul>
          <ul className="tme_d">
         <li>00</li>
         <li>15</li>
         <li className="active">30</li>
         <li>45</li>
         <li>50</li>
         <li>55</li>
         <li>00</li>
         <li>10</li>
         <li>20</li>
         <li>30</li>
         <li>40</li>
         <li>50</li>
         <li>00</li>
          </ul>
          </div>
        </div>
        </div>
        <div className="text-center margin-top-medium_ris">
        <button onClick={()=>handleButtonClick()}
         className="common-button">Choose</button>
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