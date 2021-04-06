import {  useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import { Link } from "react-router-dom"
import React, { useState } from "react"
import { isValidPhoneNumber} from 'react-phone-number-input';
import validator from 'validator'
import Select from "../Select"

 const Login= (props) => {
   console.log(props,"props in HospitalSignup")
  const { addToast } = useToasts()
  const [ password, setPassword ] = useState(false)
  if(!!props.newUserRet){
    if(!!props.newUserRet.success){
      addToast(props.newUserRet.message, {appearance: 'success', autoDismiss:true}) 
    }else{
      addToast(props.newUserRet.message, {appearance: 'error', autoDismiss:true})
    }
    props.newUserClr()
    props.loadingOff()
}

   const submitdetails = (e) => {  
     if(!!e){
       e.preventDefault()
     }
    if(props.email === '' || props.email === undefined){
        addToast("Please enter your Id or Phone number",{ appearance: 'error', autoDismiss:true })
    }else if(props.password===''){
      addToast("Please enter your password",{ appearance: 'error', autoDismiss:true })
    } else{
        let error = false
        let message = ""  

        if(!validator.isLength(props.password, { min: 8, max: 50 })){
            error = true
            addToast("Password length must between 8 to 50 characters",{ appearance: 'error', autoDismiss:true })
        } 

        if(!error){
            props.handleSubmit({
                email:props.email,
                password:props.password
           })
        }else{
            // addToast(message,{ appearance: 'error', autoDismiss:true })
        }        
    }
    }

console.log(props.email,"email")
  return (
      <React.Fragment>
          <div className="sign_in_body_wrapper margin-top-medium_ris">
          <div>
    <h4 style={{fontWeight:'400'}} className="signUpText">Log In</h4>
</div>
    <div style={{position:'relative'}}>
    {props.loading && <LoaderComponent />}
                      {/* <Select
                         id="login_select"
                         handleChange = {props.handle_type_change}
                         value = {props.type}
                         multiple ={false}
                         name = "type"
                         label = ""
                         input_text_class = "login_select"
                         arrow_class = "login_arrow_class"
                         placeholder = "Select user type"
                         variant="no_border"
                         options = {[{
                                value:'admin',
                                name:'Admin'
                            },
                            {
                                value:'center',
                                name:'Center'
                                
                            }
                           ]}
                      loading = {true}
                 /> */}
                 <form onSubmit={(e)=>submitdetails(e)}>    
      <div className="form-group sign_in_form_group">
        <input
          autocomplete="off" 
          readonly 
          onfocus="this.removeAttribute('readonly');"
          className="form-control customborder"
          name="email"
          // placeholder={`Enter ${props.type==="admin"?'Phonenumber':'Id'} `}
          placeholder = "Enter Phone number or Center Id"
          // onChange={props.type==="admin"?props.handle_phone_change:props.handleChange}
          onChange={props.handleChange}
          required
          value = {props.email}
        />
      </div>
      <div className="form-group sign_in_form_group">
      <input
          autocomplete="off" 
          readonly 
          onfocus="this.removeAttribute('readonly');"
          className="form-control customborder"
          name="password"
          placeholder="Password"
          onChange={props.handleChange}
          value = {props.password}
          type={password?"password":'text'}
          required
     />
     <span onClick={()=>setPassword(!password)} toggle="#password-field" className=" field-icon toggle-password"> <i className={password?"fa fa-fw fa-eye-slash password_eye":'fa fa-fw fa-eye password_eye'} /> </span>
  
    </div>
       
    <div className="form-group buttonSignUp">
        <button style={{width:'100%'}}
        //  onClick={()=>submitdetails()} 
          className="common-button margin-top-medium_ris">
          Login
        </button>
    </div>
    </form>

    <div className="text-center sign_in_forgot_password">
        <Link className="sign_in_sign_up" to= "/forgotPassword">
           Forgot Passsword
        </Link>
    </div>

    <div className="text-center sign_in_no_account margin-top-medium_ris">
        Don't have an account?
    </div>

    <div className="text-center margin-top-medium_ris  sign_in_sign_up">
    <Link className="sign_in_sign_up" to= "/signup">
        Sign Up
     </Link>
    </div>
    <br />
    </div>
 
          </div>
   
  </React.Fragment>
     )
}
 

export default Login