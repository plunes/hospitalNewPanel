import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import Select from "../Select"
import React, { useRef, useState, useEffect } from "react"
import { is_positive_whole_number, get_url_params } from "../../utils/common_utilities"

 const AddDoctorForm= (props) => {
  console.log(props,"props in AddDoctor form")
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
  
  useEffect(() => {
    console.log(myRef,"myref")
    executeScroll(myRef)
    console.log('mount it!');
}, [])

  const { addToast } = useToasts()
  const doctorImageRef = useRef()


  if(!!props.uploadRet){
      if(!!props.uploadRet.success){
          console.log(props.uploadRet,"props.uploadRet")
         props.setImage(props.uploadRet.data)
         addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.uploadRet.message, {appearance: 'success', autoDismiss:true})
      }
      props.loadingImageOff()
      props.uploadRetClr()
  }

  if(!!props.addDoctorRet){
    if(!!props.addDoctorRet.success){
       addToast(props.addDoctorRet.message, {appearance: 'success', autoDismiss:true}) 
       console.log(props.addDoctorRet,"props.addDoctorRet")
       props.set_user_info({
        ...props.prof_data,
        doctors:[...props.addDoctorRet.data.doctors]
       })
       props.clear_data()
    }else{
      addToast(props.addDoctorRet.message, {appearance: 'error', autoDismiss:true})
    }
    props.getUserDetails()
    props.addDoctorClr()
    props.addDoctorLoadingOff()
}

   const submitdetails = () => {
        if(props.name === '' || props.department === '' ||props.designation==='' || props.experience==="" || props.education==="" || props.specialitie_chosen===" " ){
            addToast("Enter all the details",{ appearance: 'error', autoDismiss:true })
        }
        // else if(!!!props.doctorProfileImage){
        //   addToast("Please provide a profile image",{ appearance: 'error', autoDismiss:true })
        // }
        
        else if(!!!props.consultationFee){
          addToast("Please enter consultation fee",{ appearance: 'error', autoDismiss:true })
        }else{
            props.submitdetails({
                 name:props.name,
                 designation:props.designation,
                 department:props.department,
                 experience:props.experience,
                 education:props.education,
                 consultationFee:props.consultationFee,
                 services_chosen:props.services_chosen,
                 specialitie_chosen:props.specialitie_chosen,
                 doctorProfileImage:props.doctorProfileImage,
                 doctorId:get_url_params('id')?get_url_params('id'):undefined
            })
        }
    }

    const handleImageClick = ()=>{
        let element = document.getElementById('doctorImageInput')
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

  console.log(props,"props in AddDoctorForm")


  return (
    <React.Fragment>
    <div className="profile_secti">
      <div style={{height:'10px',width:'10px',position:'absolute',top:'-10px'}} ref={myRef}></div>
       {props.addDoctorLoading && <LoaderComponent />}
    <h5 className="pfo_im">Profile Image</h5>
   <div className="row">
     <div className="col-lg-2 col-md-4 image_wrapper_add_doctor position-relative">
   {props.laodingImage &&  <LoaderComponent />}
     <input  
    style={{display:'inline',display:'none'}}
    id="doctorImageInput"
    type="file" accept="image/jpe ,image/png, image/jpeg" 
    onChange ={(e)=>handleUploadImage(e)}
    ref = {doctorImageRef}
    />
         <img src={!!props.doctorProfileImage?props.doctorProfileImage:'/account.svg'} className="accout"/>
         <img onClick={(e)=>handleImageClick(e)} src="/camera.svg" className=" profile_camera_rish cursor-pointer" />
       </div>
       <div className="col-lg-3">
  <h6 className="fil_nm">{!!props.doctorImageName?props.doctorImageName:'File Name'}</h6>
       <button  onClick={(e)=>handleImageClick(e)} className="upld common-button">Upload</button>
       </div>
   </div>
   <form class="shake" role="form" method="post" id="contactForm" name="contact-form" data-toggle="validator">
        
         <div class="form-group label-floating">
           <label class="control-label control_label_ris" for="name">Name</label>
           <input class="form-control no_padding_ris btm_in_bdr" value= {props.name} onChange={props.handleChange} id="name" type="text" name="name" required data-error="Please enter your name" />
           <div class="help-block with-errors"></div>
         </div>
        
         <div class="form-group label-floating">
           <label class="control-label control_label_ris" for="education">Education Qualification</label>
           <input class="form-control no_padding_ris btm_in_bdr" value= {props.education} onChange={props.handleChange} id="educationqua" type="education" name="education" required data-error="Please enter your education qulification" />
           <div class="help-block with-errors"></div>
         </div>

         <div class="form-group label-floating">
           <label class="control-label control_label_ris" for="education">Department</label>
           <input class="form-control no_padding_ris btm_in_bdr" value= {props.department} onChange={props.handleChange} id="department"  name="department" required data-error="Please enter your education qulification" />
           <div class="help-block with-errors"></div>
         </div>

         <div class="form-group label-floating">
           <label class="control-label control_label_ris">Designation</label>
           <input class="form-control no_padding_ris btm_in_bdr" id="msg_Designation" value= {props.designation} onChange={props.handleChange} type="text" name="designation" required data-error="Please enter your message Designation" />
           <div class="help-block with-errors"></div>
         </div> 
         
          <div className="row form-group label-floating">
          <div class="col-lg-6 col-12">
                   <Select
                    options = {props.specialities}
                    handleChange = {props.handleSelectChange}
                    value = {props.specialitie_chosen}
                    multiple ={false}
                    name = "specialitie_chosen"
                    label = "Speciality"
                    placeholder = "Choose Spectiality"
                   />
           </div>
           <div class="col-lg-6 col-12">
                   <Select
                     options = {props.services}
                     handleChange = {props.handleSelectChange}
                     value = {props.services_chosen}
                     name = "services_chosen"
                     label = "Service"
                     placeholder = "Choose Service"
                   />
           </div>
            </div>
        
         <div class="form-group label-floating">
             <label for="message" class="control-label control_label_ris">Experience</label>
             <input class="form-control no_padding_ris btm_in_bdr" value= {props.experience} onChange={props.handleChange} id="msg_Experience" type="number" name="experience" required data-error="Please enter your message Experience" />
             <div class="help-block with-errors"></div>
         </div>
       
     </form>
 </div>

   <div className="time_she">
       <h3 className="abaily text-center">Availability</h3>
       <div className="row text-center">
         <div className="col-lg-2"><h4>All</h4></div>
         <div className="col-lg-4"><h4>From - To</h4></div>
         <div className="col-lg-4"><h4>From - To</h4></div>
         <div className="col-lg-2"><h4>Closed</h4></div>
       </div>
     
       {props.slots.map((item,i)=>(
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">{item.day.charAt(0).toUpperCase()}</p></div>
                      <div className="col-lg-4"><p><span onClick={()=>props.slotClicked(item.slots.morning,'morning','from', item)} className="time_bor cursor-pointer">{props.timeToString(item.slots.morning.from) || "N/A"}</span><span onClick={()=>props.slotClicked(item.slots.morning,'morning','to', item)} className="time_bor cursor-pointer">{props.timeToString(item.slots.morning.to) || "N/A"}</span></p></div>
                      <div className="col-lg-4"><p><span onClick={()=>props.slotClicked(item.slots.evening,'evening','from', item)} className="time_bor cursor-pointer">{props.timeToString(item.slots.evening.from) || "N/A"}</span><span onClick={()=>props.slotClicked(item.slots.evening,'evening','to', item)} className="time_bor cursor-pointer">{props.timeToString(item.slots.evening.to) || "N/A"}</span></p></div>
                      <div className="col-lg-2">
                         <div 
                      onClick = {(e)=>props.handleCloseDay(item,i,e)} 
                      className='circul_rund'> 
                    <label className={item.closed?'green-background ':''} for="checkbox"></label></div></div>
                     
                      {/* <div className="col-lg-2">
                         <div 
                      onClick = {(e)=>props.handleCloseDay(item,i,e)} 
                      className='round'> 
                    <label className={item.closed?'green-background ':''} for="checkbox"></label></div></div> */}
                    </div>
                   ))}
      
       <div className="consul_fee">
    <div className="cdcd_sfd">           
       {props.editConsultFlag && <span onClick={()=>props.submitConsultaion()} className="edi_intr hover_underline margin-5">Save</span> }
    <span onClick={()=>props.toggleSubmitConultation()} className="edi_intr hover_underline margin-5">{props.editConsultFlag?"Cancel":'Edit'}</span>
    </div>
       <div className="row">
       
         <div className="col-lg-8"><h2 className="fee_cun_ch">Consultation Fee</h2></div>
         <div className="col-lg-4">
             <h2 className="fee_ru">
             &#x20B9;
             {!!props.editConsultFlag?<input value={props.consultationFee} onChange={(e)=>{
               if(is_positive_whole_number(e.target.value)){
                props.handleChange(e)
               }
             }}
             name="consultationFee"
             className="no_brdr_input consultaion_input"
             type="number"
             />:props.consultationFee}
              
             </h2>
             </div>
       </div>
       
         <div className="time_clo text-center">
         <button onClick={()=>submitdetails()} className="common-button">Submit</button>
         </div>
   </div>
   </div>
  
  </React.Fragment>
  )
}
 

export default AddDoctorForm