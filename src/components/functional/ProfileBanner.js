import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useRef } from "react"
import LoaderComponent from "./LoaderComponent"
let url = ""

 const ProfileBanner= React.memo((props) => {
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
            url = props.uploadRet.data.imageUrl
          }else{
            addToast(props.uploadRet.message, {appearance: 'error', autoDismiss:true})
          }
          props.uploadRetClr()
      }
    }
  }



  if(!!props.updateBannerRet){
    if(!!props.updateBannerRet.success){
      addToast(props.updateBannerRet.message, {appearance: 'success', autoDismiss:true}) 
      props.set_user_info({
        coverImageUrl:url
      })
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

const on_click = () => {
  var modal = document.getElementById("myModal_rish");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg_rish");
var modalImg = document.getElementById("img01_rish");
var captionText = document.getElementById("caption_rish");
console.log(img,"img")
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = (!!props.user?props.user.coverImageUrl===''?'/maxhos.jpg':props.user.coverImageUrl:'')
  captionText.innerHTML = "Cover Image";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close_rish")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}
}

console.log(props,"props in ProfileBanner")

  return (
<React.Fragment>
    <input  
    style={{display:'inline',display:'none'}}
    id="profile_banner_input"
    type="file" accept="image/jpe ,image/png, image/jpeg" 
    onChange ={(e)=>handleUploadImage(e)}
    ref = {bannerImageRef}
    />
     <div style={{position:'relative', border:'none'}}>
         {props.loading && <LoaderComponent />}
            <img className="mas_hos " 
            onClick ={on_click}
            id="myImg_rish"
            src={(!!props.user?props.user.coverImageUrl===''?'/maxhos.jpg':props.user.coverImageUrl:'')} 
            alt=""></img>
             <div className="edit_image">
            <img className="edit_icn"  onClick={(e)=>handleImageClick(e)} src={'/pen_editor.svg'}></img>
        </div>
       
        </div>
</React.Fragment>
  )
})
 

export default ProfileBanner