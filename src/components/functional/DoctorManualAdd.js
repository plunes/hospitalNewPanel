import React, { useRef } from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'


const DoctorManualAdd = (props) => {
    const achievementRef = useRef()
    const { addToast } = useToasts()

    if(!!props.addDoctorRet){
            if(!!props.addDoctorRet.success){
                addToast(props.addDoctorRet.message, {appearance: 'success', autoDismiss:true}) 
              }else{
                addToast(props.addDoctorRet.message, {appearance: 'error', autoDismiss:true})
              }
              props.addDoctorClr()
    }
  
    if(!!props.uploadRet){
      if(!!props.uploadRet.success){
        addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
        // props.toggleAchievementImage(props.uploadRet.data.imageUrl)
      }else{
        addToast(props.uploadRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.uploadRetClr()
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
      props.upload({ file: file, field: 'file'})
      reader.onloadend = () => {
      reader.readAsDataURL(file);
    }
  }
}else{
  addToast('No File Found', {appearance: 'error', autoDismiss:true})
}
}


const submitdetails = () => {
    if(props.achieveTitle === ''){
        addToast("Enter title of Achievement",{ appearance: 'error', autoDismiss:true })
    }else{
        props.updateAchievement({
            title:props.achieveTitle,
            imageUrl:props.achievementImage,
            type:'addAchievement'
        })
    }
}




    return (
        <div className ='modal-wrapper-medium_ris'>
        <div className="modal-heading_ris">Add Achievement</div>
        {!props.achievementImage && <div className='margin-top-small_ris text-center'>
            <button onClick={()=>handleButtonClick()}
         className="common-button">Upload</button>
         <input
            style={{display:'inline',display:'none'}}
            id="uploatCatalogue"
            type="file" 
            accept=".jpg, .jpg, .jpeg"
            onChange ={(e)=>handleUpload(e)}
    />
        </div>   }
       {
           props.achievementImage &&  <div className="text-center margin-top-small_ris">
           <img className="achievement_image" src={props.achievementImage} />
           </div>
       }
   

        {/* <p className="modal-p_ris margin-top-medium_ris text-center">We'll update you when we upload your price</p>
        <p className="modal-p_ris margin-top-small_ris text-center">Prefered format <strong>(xlsx)</strong></p>
        <div className="text-center margin-top-medium_ris"> */}
        {/* </div> */}
       
       <div className='margin-top-small_ris '>
       <p className="intro col-lg-9"><strong>Tite</strong> </p>
       <textarea 
            name="title" 
            ref={achievementRef}
            //    onKeyDown={keyPress}
            onChange ={props.handleAchievementChange}
            value={props.achieveTitle} 
            rows="4" 
            cols="50"
            name="comment" 
            form="usrform" /> 
       </div>

       <div className='margin-top-small_ris text-center'>
            <button onClick={()=>submitdetails()}
            className="common-button">Save Achievement</button>
       </div>
        
        </div>         
    )
}

 export default DoctorManualAdd