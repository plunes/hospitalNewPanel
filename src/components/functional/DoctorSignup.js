import { ToastProvider, useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import SelectComponent from "../SelectComponent"
import React,  { useState } from "react"
import { Redirect } from "react-router-dom"
import {
    isValidPhoneNumber,
  } from 'react-phone-number-input';
import validator from 'validator'
 const DoctorSignup= (props) => {

  const redirect = () =>{
    return <Redirect to="/" />
  }


  console.log(props.loadingState,"props in EditProfileForm")
  const [password, setPassword] = useState(false);
  const { addToast } = useToasts()
  if(!!props.registerUserRet){
      if(!!props.registerUserRet.success){
        addToast(props.registerUserRet.message, {appearance: 'success', autoDismiss:true}) 
        return  <Redirect to="/" />
      }else{
        addToast(props.registerUserRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.successRegister()
      props.registerUserClr()
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
            }
            else{

                let specialitiesArr = JSON.parse(JSON.stringify(props.specialities))
                let spec = props.data.specialities_selected
                   let id =''
                   specialitiesArr.forEach((data,i)=>{
                       if(data.name === spec){
                        id=data.id
                       }
                   })
                   let arr = [
                    {
                        specialityId:id,
                        services:[]
                    }
                   ]
            
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
                    experience:props.data.experience
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
          onChange={props.handleChange}
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
        <input
          className="form-control customborder "
          name="dob"
          placeholder="Date of Birth"
          onChange={props.handleChange}
          required
          onfocus="(this.type='date')"
          value = {props.data.dob}
        />
      </div>


      <div className="form-group">
        <input
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
        <label className="">Location</label>
        <textarea name="address"
          className="form-control customborder"
          onChange={props.handleChange}
          value = {props.data.address}
          customborder="true">
        </textarea>
      </div>
      
      <div className="form-group">
        <input
          className="form-control customborder"
          name="regno"
          placeholder="Professional Reg. No"
          onChange={props.handleChange}
          required
          value = {props.data.regno}
        ></input>
      </div>
       
      <div className="form-group">
      <SelectComponent
           options = {props.specialities}
           handleChange = {props.handleSpecialitySelect}
           value = {props.data.specialities_selected}
           multiple ={false}
           name = "specialities_selected"
           placeholder="Specialization"
           label = ""
        />
      </div>

      <div className="form-group">
        <input
          className="form-control customborder"
          name="experience"
          placeholder="Experience"
          onChange={props.handleChange}
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