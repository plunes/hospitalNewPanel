import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useRef } from "react"
import LoaderComponent from "./LoaderComponent"
let url = ""

 const ProfileImage= React.memo((props) => {
    const profileImageRef  = useRef()
    
  const { addToast } = useToasts()
 
  if(!!profileImageRef.current){    
    if(profileImageRef.current.value.length!==0){
      if(!!props.uploadRet){
        if(!!props.uploadRet.success){
          // addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
          profileImageRef.current.value = ""
          props.updateImage({
              imageUrl:props.uploadRet.data.imageUrl
          })
           url = props.uploadRet.data.imageUrl
        }else{
          addToast(props.uploadRet.message, {appearance: 'error', autoDismiss:true})
        }
        props.loadingOff()
        props.uploadRetClr()
    }
    }
  }
 


  if(!!props.updateImageRet){
    if(!!props.updateImageRet.success){
      addToast(props.updateImageRet.message, {appearance: 'success', autoDismiss:true}) 
      props.set_user_info({
        imageUrl:url
      })
    }else{
      addToast(props.updateImageRet.message, {appearance: 'error', autoDismiss:true})
    }
    props.updateImageClr()
}

  const handleImageClick = ()=>{
      let element = document.getElementById('uploadInput')
      element.click()
  }

  const handleUploadImage = (e) => {
    e.preventDefault();
    e.stopPropagation()
    var reader = new FileReader();
    var file = e.target.files[0];

    if(!!file){
      if (file.size > 2 * 1024 * 1024) {
        addToast('File size should be less than 2MB', {appearance: 'error', autoDismiss:true})
      } else {
        props.upload({ file: file, field: 'file' })
        reader.onloadend = () => {
        reader.readAsDataURL(file);
      }
    }
  }else{
    addToast('No File Found', {appearance: 'error', autoDismiss:true})
  }
}

   const uploadImage = () => {
       let deviceId = localStorage.getItem('deviceId' || [])
        if(deviceId){
          props.logoutOtherDevices({
                deviceId:deviceId
           })
            // addToast("Enter all the details",{ appearance: 'error', autoDismiss:true  })
        }else if(props.newPassword !== props.rePassword){
          addToast("Please refresh and try again",{ appearance: 'error', autoDismiss:true  })
        }else{
            props.logoutOtherDevices({
                 deviceId:[deviceId]
            })
        }
    }

  return (
<React.Fragment>
  <div style={{position:'relative'}}>
    <input  
    style={{display:'inline',display:'none'}}
    id="uploadInput"
    type="file" accept="image/jpe ,image/png, image/jpeg" 
    onChange ={(e)=>handleUploadImage(e)}
    ref = {profileImageRef}
    />
    {props.loading && <LoaderComponent style={{top:'30%'}} />}
    <div style={{position:'relative'}} className=' blackdot'>
    <img 
    onClick={(e)=>handleImageClick(e)}
    className="  profile_image_rish"
    style={{cursor:'pointer'}}
    src={(!!props.user?props.user.imageUrl:'/profile.jpg')} 
    alt=""> 
    </img>
      <div className="edit_image2">
          <img onClick={(e)=>handleImageClick(e)} className="edit_icn2 cursor-pointer"src={'/pen_editor.svg'} />
      </div>
    </div>
    </div>
</React.Fragment>
  )
})
 

export default ProfileImage