import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import Select from "../Select"
import React, { useRef, useState, useEffect } from "react"
import { is_positive_whole_number, get_url_params } from "../../utils/common_utilities"
import AnimatedMount from "../../HOC/AnimatedMount"
import Button from "./Button"
import DeletePopup from "./DeletePopup"
import Timerow from "./Timerow"
import WeekWidget from "./WeekWidget"

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

  useEffect(() => {
     if(props.delete_profile_ret){
       if(!!props.delete_profile_ret.success){
        addToast(props.delete_profile_ret.message, {appearance: 'success', autoDismiss:true}) 
        props.set_user_info({
          ...props.prof_data,
          doctors:[...props.prof_data.doctors.filter(item=>(item._id !== get_url_params('id')))]
         })
        props.clear_data()
       }else{
        addToast(props.delete_profile_ret.message, {appearance: 'error', autoDismiss:true}) 
       }
       props.delete_profile_loading()
     }
}, [props.delete_profile_ret])


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
       addToast("Doctor profile successfully submitted", {appearance: 'success', autoDismiss:true}) 
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
          let obj = {
            name:props.name,
            designation:props.designation,
            department:props.department,
            experience:props.experience,
            education:props.education,
            services_chosen:props.services_chosen,
            specialitie_chosen:props.specialitie_chosen,
            doctorProfileImage:!!props.doctorProfileImage?props.doctorProfileImage:'',
            refUserId:!!props.refUserId?props.refUserId:'',
            doctorId:get_url_params('id')?get_url_params('id'):undefined
          }

          if(!!props.services_chosen) {
            obj.consultationFee = props.consultationFee
          }
            props.submitdetails({
                ...obj   
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
    <h5 className="pfo_im">Profile Image
    
   
    </h5>
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
    <Button type='button' onClick={(e)=>handleImageClick(e)}>Upload</Button>
         {/* <Button  className="upld common-button" onClick={(e)=>handleImageClick(e)}>Upload</Button> */}
       {/* <button >Upload</button> */}
       </div>
   </div>
   <form class="shake" role="form" method="post" id="contactForm" name="contact-form" data-toggle="validator">
        
         <div class="form-group label-floating">
           <label class="control-label control_label_ris" for="name">Name</label>
           <input class="form-control no_padding_ris btm_in_bdr" value= {props.name} onChange={props.handleChange} id="name" type="text" name="name" required data-error="Please enter your name" />
           <div class="help-block with-errors"></div>
         </div>
        
         <div class="form-group label-floating">
           <label class="control-label control_label_ris" for="education">Educational Qualification</label>
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
                    placeholder = "Choose speciality"
                   />
           </div>
           <div class="col-lg-6 col-12">
                   <Select
                     options = {props.services}
                     handleChange = {props.handleSelectChange}
                     value = {!!props.services_chosen?props.services_chosen:''}
                     name = "services_chosen"
                     label = "Service"
                     placeholder = "Choose service"
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
       
       <div className="u-margin-5-auto u-margin-top-small">
                                 <WeekWidget
                                   variant = {"box"}
                                   data={props.selected_slot}
                                   onClick={props.set_slot}
                                 />
                                
                            </div>

                            <div className=" u-margin-top-small">
                              <div className="checkbox-input checkbox-big u-display-flex">
                                  <input checked={!props.selected_slot.closed} onClick={()=>props.sloct_checkbox()} type="checkbox" id="html"/>
                                   <label  className="u-margin-auto" for="html">{!props.selected_slot.closed?'OPEN':'CLOSED'}</label>
                              </div>
                            </div>

{props.selected_slot.slots.map((item, i)=>{
                              console.log(i,"i in map")
                              return   <div className="u-margin-top-small">
                                    <Timerow 
                                        data = {item}
                                        remove_slot = {props.remove_slot}
                                        key_prop={i}
                                        timeToString = {props.timeToString}
                                        time_selected = {props.time_selected}
                                      />  
                            </div>
   })}

                            <div className="u-margin-top-small">
                                 <img onClick={props.add_slot}   src="/add_icon.svg" className="add-icon-time-row cursor-pointer" />
                             </div>
                             <div className="u-margin-top-mini">
                                 <span className="add-more-slots">Add more slots</span>
                             </div>
                             {/* <div className='u-margin-top-mini text-center'>
                                  <Button style={{fontSize:"3rem"}}  onClick={()=>props.handleSubmitAvail()}>Submit</Button>
                             </div>  */}

                             <div className=' u-margin-top-small text-center'>
                  <span className="availability_heading_span">
                      Apply this time slot to
                  </span>
                  <div className="u-margin-5-auto u-margin-top-small">
                                 <WeekWidget
                                   variant = {"circle"}
                                   data={props.selected_slot}
                                   selected_days={props.selected_days}
                                   onClick={props.set_selected_days}
                                   alternate = {true}
                                 />
                                
                    </div>
                    <div className='u-margin-top-small text-center'>
                                  <Button style={{fontSize:"2rem"}}  onClick={()=>props.apply_to_all()}>Apply</Button>
                      </div> 
                 </div>
      
    {!!props.services_chosen &&     <div className="consul_fee">
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
              <Button onClick = {submitdetails}>Submit</Button>
            {/* <button onClick={()=>submitdetails()} className="common-button">Submit</button> */}
            </div>
         </div>}
         {!!get_url_params('id') &&  <div className='text-center'>
              <DeletePopup 
              yesClick = {(e)=>props.delete_profile({doctor_id:get_url_params('id')})}
              title="Are you sure you want to remove this profile?"
              id="delete_button"
              >
              <Button className='margin_top_medium_rish' type='button' id="delete_button" icon = "delete" >Delete Profile</Button>
              </DeletePopup>
              
             </div>} 
   </div>
  
  </React.Fragment>
  )
}
 

export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: 'translate3d(0, -2rem, 0)',
    transition: 'opacity 100ms ease-out, transform 100ms ease-out',
  },
  mountedStyle: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .5s ease-out, transform .5s ease-out',
  },
})(AddDoctorForm)
