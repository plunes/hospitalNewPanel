import React, { useRef, useState } from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import Button from "./Button"


const AddAchievement = React.memo((props) => {
    const achievementRef = useRef()
    const { addToast } = useToasts()
    const [ loading, setLoading ] = useState(false)

    if(!!props.updateAchievementRet){
        if(props.updateAchievementRet.type === 'addAchievement'){
            if(!!props.updateAchievementRet.success){
               console.log("SetLoading in updateAchhievementRet")
                props.toggleLoading()
                props.achievementSuccess()
                addToast(props.updateAchievementRet.message, {appearance: 'success', autoDismiss:true}) 
              }else{
                addToast(props.updateAchievementRet.message, {appearance: 'error', autoDismiss:true})
              }
              props.updateAchievementClr()
        }
    }
  
    if(!!props.uploadRet){
      if(!!props.uploadRet.success){
        console.log("SetLoading in updateAchhievementRet")
        props.toggleLoading()
        document.getElementById('uploatCatalogue').value = null;
        addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
        props.toggleAchievementImage(props.uploadRet.data.imageUrl)
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
      document.getElementById('uploatCatalogue').value = null;
      addToast('File size should be less than 2MB', {appearance: 'error', autoDismiss:true})
    } else {
      console.log("SetLoading in HandleUpload")
      props.toggleLoading()
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
    if(props.achieveTitle ===''){
        addToast("Add title to continue",{ appearance: 'error', autoDismiss:true })
    }else if(!props.achievementImage){
      addToast("Add an image to continue",{ appearance: 'error', autoDismiss:true })
    }
    else{
      let achievements = [...props.achievements]
      let newAchievements = []
      achievements.forEach((item,j)=>{
        if(!!item){
            newAchievements.push(item)
        }
      })
       let obj = {
        title:props.achieveTitle,
        imageUrl:props.achievementImage,
        achievement:''
       }
       newAchievements.push(obj)
       props.toggleLoading()
        props.updateAchievement({
            achievements:newAchievements,
            type:'addAchievement'
        })
    }
}


  console.log(props,"prpops in add achievement")

    return (
        <div className ='modal-wrapper-medium_ris'>
        <div className="modal-heading_ris">Add Achievement</div>
        {props.loading && <LoaderComponent/>}
        {!props.achievementImage && <div className='margin-top-small_ris text-center'>
        <Button onClick={()=>handleButtonClick()}
        >Upload</Button>
         <input
            style={{display:'inline',display:'none'}}
            id="uploatCatalogue"
            type="file" 
            accept=".jpg, .jpeg, .png"
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
       {/* <p className="intro col-lg-9"><strong>Title</strong> </p> */}
       <textarea 
            name="title" 
            ref={achievementRef}
            //    onKeyDown={keyPress}
            onChange ={props.handleAchievementChange}
            value={props.achieveTitle} 
            rows="4" 
            cols="50"
            placeholder="Enter title "
            name="comment" 
            form="usrform" /> 
       </div>

       <div className='margin-top-small_ris text-center'>

       <Button onClick={()=>submitdetails()}>Save Achievement</Button>
       </div>
        
        </div>         
    )
})

 export default AddAchievement