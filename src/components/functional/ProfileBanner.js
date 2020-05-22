import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useRef } from "react"
import LoaderComponent from "./LoaderComponent"

 const ProfileBanner= (props) => {
    console.log(props,"props in Profile Image")
  const { addToast } = useToasts()
  const bannerImageRef  = useRef()
 
  if(!!bannerImageRef.current){
    if(bannerImageRef.current.value.length!==0){
      if(!!props.uploadRet){
          if(!!props.uploadRet.success){
            bannerImageRef.current.value = ''
            // addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
            props.updateBanner({
                coverImageUrl:props.uploadRet.data.imageUrl
            })
          }else{
            addToast(props.uploadRet.message, {appearance: 'error', autoDismiss:true})
          }
          props.uploadRetClr()
      }
    }
  }



  if(!!props.updateBannerRet){
    if(!!props.updateBannerRet.success){
      console.log("inside update bAnner ret")
      addToast(props.updateBannerRet.message, {appearance: 'success', autoDismiss:true}) 
      props.getProfileDetails()
      props.loadingOff()
    }else{
      addToast(props.updateBannerRet.message, {appearance: 'error', autoDismiss:true})
      props.loadingOff()
    }
    props.updateBannerClr()
}

  const handleImageClick = ()=>{
      let element = document.getElementById('profile_banner_input')
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

  return (
<React.Fragment>
    <input  
    style={{display:'inline',display:'none'}}
    id="profile_banner_input"
    type="file" accept="image/jpe ,image/png, image/jpeg" 
    onChange ={(e)=>handleUploadImage(e)}
    ref = {bannerImageRef}
    />
   
     <div  className="row sur">
          <p className="HospitalCover">
          <div style={{position:"relative"}}>
         {props.loading && <LoaderComponent />}
            <img className="HospitalCoverImg mas_hos img-loading_rish" 
            src={(!!props.user?props.user.coverImageUrl:'/maxhos.png')} 
            alt=""></img>
             </div>
            </p>
           
        </div>
        <div className="edit_image">
            <img className="edit_icn"  onClick={(e)=>handleImageClick(e)} src={'/pen_editor.svg'}></img>
        </div>
    {/* <img 
    onClick={(e)=>handleImageClick(e)}
    className="blackdot"
    style={{cursor:'pointer'}}
    src={(!!props.user?props.user.imageUrl:'/profile.png')} 
    alt=""> 
    </img> */}
</React.Fragment>
  )
}
 

export default ProfileBanner