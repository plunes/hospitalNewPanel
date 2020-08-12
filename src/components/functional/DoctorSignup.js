import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import React,  { useState, useRef } from "react"
import { Redirect } from "react-router-dom"
import { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator'
import Select from "../Select";
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { only_alphabets, is_positive_real_number } from "../../utils/common_utilities"
import Map from "../MapComponent"



 const DoctorSignup= (props) => {
  const redirect = () =>{
    return <Redirect to="/signin" />
  }
  const [password, setPassword] = useState(false);
  const { addToast } = useToasts()
  const dob_ref = useRef()
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

   const submitDetails = () => {
        if(props.data.name === '' ||props.data.email==='' || props.data.mobile==="" || props.data.password==="" ||   props.data.address === '' ||props.data.regno==='' || props.data.specialities_selected===" " || props.data.experience==="" || props.data.dob==="" ){
            addToast("Enter all the details",{ appearance: 'error', autoDismiss:true })
        }else{
            if(!validator.isEmail(props.data.email)){
                addToast("Enter valid email address",{ appearance: 'error', autoDismiss:true })
            }else if(!isValidPhoneNumber(props.data.mobile)){
                addToast("Enter valid mobile number",{ appearance: 'error', autoDismiss:true })
            }else if(!validator.isLength(props.data.password, { min: 8, max: 50 })){
                addToast("Password length must between 8 to 50 characters",{ appearance: 'error', autoDismiss:true })
            }else if(!validator.isNumeric(props.data.experience)){
                addToast("Experience must be a number",{ appearance: 'error', autoDismiss:true })
            }else if(props.specialities_selected.length ===0){
              addToast("Please select a speciality",{ appearance: 'error', autoDismiss:true })
            }else if(props.data.location ===''){
              addToast("Please provide your location",{ appearance: 'error', autoDismiss:true })
            }
            else{
              let specialitiesArr = JSON.parse(JSON.stringify(props.specialities))
              let arr = JSON.parse(JSON.stringify(props.data.specialities_selected))
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
              console.log(arr,"sdsd")
                props.registerUser({
                    name:props.data.name,
                    address:props.data.address,
                    mobileNumber:props.data.mobile,
                    userType:"Doctor",
                    location:props.data.location,
                    registrationNumber:props.data.regno,
                    specialities:arr,
                    email:props.data.email,
                    password:props.data.password,
                    dob:props.data.dob,
                    experience:props.data.experience,
                    googleAddress:props.data.googleAddress
               })

            //     props.submitProfileDetails({
            //         fullname:props.fullname,
            //         phone:props.phone,
            //         email:props.email,
            //         location:props.location
            //    })
            //    props.loading()
            }
        }
    }


  return (
    <div style={{position:'relative'}}>
        {props.loading && <LoaderComponent />}

      <div className="form-group">
        <input
          className="form-control customborder"
          name="name"
          placeholder="Name"
          onChange={(e)=> props.handleChange(e)}
          required
          value = {props.data.name}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control customborder"
          name="mobile"
          placeholder="Mobile Number"
          onChange={props.handlePhoneChangeDoctor}
          required
          value = {props.data.mobile}
        />
      </div>

      <div className="form-group">
        <input
          className="form-control customborder"
          name="email"
          placeholder="Email Id"
          onChange={props.handleChange}
          required
          value = {props.data.email}
        />
      </div>

      <div className="form-group">
      <DateTimePicker
        inputProps={{
          style:{
            // border:'5px solid red'
          },
          className:'inpi_rish'
        }}
         placeholder="Your Date of Birth"
         name="dob"
         onChange={props.handleDateChange}
         time={false}
         max = {new Date()}
        //  max={new Date(1023301800000)}
  />
        {/* <input
          type="date"
          ref = {dob_ref}
          className="form-control customborder "
          name="dob"
          placeholder="Date of Birth"
          onChange={props.handleChange}
          required
          value = {props.data.dob}
        /> */}
      </div>


      <div className="form-group">
        <input
          autocomplete="off" 
          readonly 
          onfocus="this.removeAttribute('readonly');"
          className="form-control customborder"
          name="password"
          placeholder="Password"
          onChange={props.handleChange}
          required
          type={password?"password":'text'}
          value = {props.data.password}
        />
        <span onClick={()=>setPassword(!password)} toggle="#password-field" className=" field-icon toggle-password"> <i className={password?"fa fa-fw fa-eye-slash password_eye":'fa fa-fw fa-eye password_eye'} /> </span>
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
                              location:data.location,
                              googleAddress:data.address
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
          name="regno"
          placeholder="Professional Reg. No"
          onChange={props.handleChange}
          required
          value = {props.data.regno}
        ></input>
      </div>
       
      {/* <div className="form-group">
      <SelectComponent
           options = {props.specialities}
           handleChange = {props.handleSpecialitySelect}
           value = {props.data.specialities_selected}
           multiple ={false}
           name = "specialities_selected"
           placeholder="Specialization"
           label = ""
        />
      </div> */}

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
           value = {props.specialities_selected[props.specialities_selected.length -1]}
           multiple ={false}
           name = "speciality"
           label = "Speciality"
           placeholder="Choose Specialities"
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


      <div className="form-group">
        <input
          className="form-control customborder"
          name="experience"
          placeholder="Experience (In Years)"
          onChange={(e)=>{
            if(is_positive_real_number(e.target.value)){
              props.handleChange(e)
            }
          }}
          required
          type="number"
          value = {props.data.experience}
        ></input>
      </div>
       
      <div className=" buttonSignUp  margin-top-medium_ris">
        <button onClick={()=>submitDetails()}  className="btn btn-success text-center signupHosbtn">
          Submit
        </button>
        </div>
        <div className="text-center">
        <span className="signup_registring">
          By registering, you agree to our
        </span>
        <span className="signup_tos">Term of Services</span>
      </div>
    <br />
  </div>

     )
}
 

export default DoctorSignup