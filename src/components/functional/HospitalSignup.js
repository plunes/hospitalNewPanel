import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator'
import Select from "../Select"
import { only_alphabets } from  "../../utils/common_utilities"
import Map from "../MapComponent"

// let { DateTimePicker } = ReactWidgets;

// let formatter = Globalize.dateFormatter({ raw: 'MMM dd, yyyy' })

// let widget = (
//   <DateTimePicker
//     // format={formatter} 
//     defaultValue={new Date()}
//     time={false}
//   />
// )


 const HospitalSignup= (props) => {
   console.log(props,"props in HospitalSignup")
  const { addToast } = useToasts()
  const [ password, setPassword ] = useState(false)
  if(!!props.registerUserRet){
    if(!!props.registerUserRet.success){
      addToast(props.registerUserRet.message, {appearance: 'success', autoDismiss:true}) 
      props.successRegister()
      props.registerUserClr()
      return  <Redirect to="/signin" />
    }else{
      addToast(props.registerUserRet.message, {appearance: 'error', autoDismiss:true})
      props.successRegister()
      props.registerUserClr()
    }
   
}

   const submitdetails = () => {  
     console.log((props.data.mobile.substring(0,2)==="+91"),"props.data.mobile.substring(0,2))===`+91`")
     console.log(props.data,"props.data in submitdetails")
    if(props.data.name === ''){
        addToast("Please enter your name",{ appearance: 'error', autoDismiss:true })
    }else if(props.data.mobile===''){
      addToast("Please enter your phone number",{ appearance: 'error', autoDismiss:true })
    }else if(!isValidPhoneNumber(props.data.mobile)){
            addToast("Enter valid mobile number",{ appearance: 'error', autoDismiss:true })
        }else if(!validator.isEmail(props.data.email)){
            addToast("Enter valid email address",{ appearance: 'error', autoDismiss:true })
        }else if(!validator.isLength(props.data.password, { min: 8, max: 50 })){
            addToast("Password length must between 8 to 50 characters",{ appearance: 'error', autoDismiss:true })
        }else if(props.specialities_selected.length ===0){
          addToast("Please select a speciality",{ appearance: 'error', autoDismiss:true })
        }else if(!validator.isEmail(props.data.email)){
          addToast("Enter valid email address",{ appearance: 'error', autoDismiss:true })
        }
        else if(props.data.address===''){
          addToast("Please enter your address",{ appearance: 'error', autoDismiss:true })
        }
        else if(props.data.about===""){
          addToast("Please enter about",{ appearance: 'error', autoDismiss:true })
        }
        else if(props.data.regno === ''){
          addToast("Please enter registration number",{ appearance: 'error', autoDismiss:true })
        }else if(props.data.location === ''){
          addToast("Please provide your location",{ appearance: 'error', autoDismiss:true })
        }
        else{
            let specialitiesArr = [...props.specialities]
            let arr = [...props.data.specialities_selected]
            arr = arr.map((item, i)=>{
               let id =''
               specialitiesArr.forEach((data,i)=>{
                   if(data.name === item){
                    id=data.id
                   }
               })
                return {
                    specialityId:id,
                    services:[]
                }
            })
            console.log(arr, specialitiesArr,"arr in submitDetails")
            props.registerUser({
                name:props.data.name,
                address:props.data.address,
                mobileNumber:props.data.mobile,
                userType:!!props.lab?"Lab":"Hospital",
                biography:props.data.about,
                registrationNumber:props.data.regno,
                location:props.data.location,
                specialities:arr,
                email:props.data.email,
                password:props.data.password,
                regno:props.data.regno
           })
        }
    }
  return (
    <div style={{position:'relative'}}>
    {props.loading && <LoaderComponent />}
      <div className="form-group">
        <input
          className="form-control customborder"
          name="name"
          placeholder={`${!!props.lab?'Lab Name':'Hospital Name'}`}
          onChange={(e)=> props.handleChange(e)}
          required
          value = {props.data.name}
        />
      </div>
      <div className="form-group">
        <label className="">Address</label>
        <textarea name="address"
          className="form-control customborder"
          onChange={props.handleChange}
          value = {props.data.address}
          customborder="true">
        </textarea>
      </div>
      <div style={{display:'block'}}>
                        <Map
                          google={props.google}
                          label = 'Location'
                          no_save_changes = {true}
                          center={{lat: 18.5204, lng: 73.8567}}
                          location = {{
                              coordinates:[77.026344,28.457523]
                          }}
                          update_location = {(data)=>props.handle_location_change({
                              location:data.location
                          })}
                          set_cordinates = {()=>console.log()}
                          search_label = {true}
                          set_user_info =  {()=>console.log()}
                          height='300px'
                          zoom={15}
                          edit_location_loading = {props.edit_location_loading}
                          edit_location = {()=>console.log()}
                          edit_location_clr = {()=>console.log()}
                          edit_location_ret = {false}
                          />
                        </div>
      <div className="form-group margin_top_medium_rish">
        <input
          className="form-control customborder"
          name="mobile"
          placeholder="Mobile Number"
          onChange={props.handlePhoneChangeDHospital}
          value = {props.data.mobile}
          required
        />
      </div>
       
      <div className="form-group">
        <label className="">{`${props.lab?'About Lab' :'About Hospital'}`}</label>
        <textarea name="about"
          className="form-control customborder"
          onChange={props.handleChange}
          value = {props.data.about}
          customborder="true">
        </textarea>
      </div>
      <div className="form-group">
        <input
          className="form-control customborder"
          rows="3"
          name="regno"
          placeholder="Registration No"
          onChange={props.handleChange}
          required
          value = {props.data.regno}
        ></input>
      </div>
     

      <div className="text-center signupHosformfield margin-top-medium_ris ">
            <h5 style={{fontWeight:'400'}}>
             Add Specialization
            </h5>
            <p>Add Specialization and Services</p>
          </div>
          {props.addFlag?
          <React.Fragment>
        <Select
           options = {props.specialities}
           handleChange = {props.handleSpecialitySelect}
           value = {!!props.specialities_selected[props.specialities_selected.length -1]?props.specialities_selected[props.specialities_selected.length -1]:''}
           multiple ={false}
           placeholder="Choose Specialities"
           name = "speciality"
           label = "Speciality"
        />
        <div className="form-group buttonSignUp">
        <button onClick={()=>props.addFlagToggle()}  className="btn btn-success text-center signupHosbtn">
          Cancel
        </button>
        </div>
          </React.Fragment>
          : <div className="form-group buttonSignUp">
        <button onClick={()=>props.addFlagToggle()}  className="btn btn-success text-center signupHosbtn">
          Add
        </button>
        </div>}
         
        <div className="margin-top-medium_ris ">
        </div>
        
        {props.specialities_selected.map((item,i)=>(
            <React.Fragment>
             <hr />
             <div className="signup_specialities_wrapper_ris">
                 <div className="signup_speciality">
        <p className="signup_speciality_name">{item}</p>
                     <p onClick={()=>props.removeSpeciality(item)} className="signup_speciality_X">X</p>
                 </div>
             </div>
            </React.Fragment>
        ))}

      <div className="text-center signupHosformfield margin-top-medium_ris ">
        <h5>
          <strong>Manage Account</strong>
        </h5>
        <p>Add Users</p>
      </div>
      <div className="form-group">
      <h5 style={{fontWeight:'400'}}>
          Admin
        </h5>
        <p>Add User</p>
      </div>
      <div className="form-group">
        <input
          className="form-control customborder"
          name="email"
          placeholder="User Email"
          onChange={props.handleChange}
          value = {props.data.email}
          required
        />
      </div>
      <div className="form-group">
        <input
          autocomplete="off" 
          readonly 
          onfocus="this.removeAttribute('readonly');"
          className="form-control customborder"
          name="password"
          placeholder="User Password"
          onChange={props.handleChange}
          value = {props.data.password}
          type={password?"password":'text'}
          required
        />
<span onClick={()=>setPassword(!password)} toggle="#password-field" className=" field-icon toggle-password"> <i className={password?"fa fa-fw fa-eye-slash password_eye":'fa fa-fw fa-eye password_eye'} /> </span>
      </div>
      <div className="text-center">
        <p className="Plzenter">Please enter at least 8 character Password</p>
      </div>
      <div className="form-group buttonSignUp">
        <button onClick={()=>submitdetails()} className="btn btn-success text-center signupHosbtn">
          Submit
        </button>
      </div>
   
    <br />
  </div>

     )
}
 

export default HospitalSignup