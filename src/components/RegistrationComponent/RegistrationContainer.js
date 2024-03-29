import React from 'react';
// import UserRegistrationForm from './UserRegistrationForm';
import { Redirect } from 'react-router-dom';
import '../RegistrationComponent/RegistrationComponent.css';
// import DoctorRegistrationForm from "./DoctorRegistrationForm";
import HospitalRegistrationForm from './HospitalRegistrationForm';
import  "./RegistrationComponent.css";
import Select from "../Select"

import { registerUser, registerUserClr } from "../../actions/userActions";
import HospitalSignup from "../functional/HospitalSignup"
import DoctorSignup from '../functional/DoctorSignup'
import AuthHeader from '../functional/AuthHeader'
import { get_url, getDateFormat } from '../../utils/common_utilities'
import { connect } from "react-redux"
import axios from "axios";
import NewNotif from '../functional/NewNotif';

function MyError(message){
    this.message = message;
}

MyError.prototype = new Error()

class RegistrationContainer extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            showGeneralUserForm: false,
            showDoctorForm: false,
            showHospitalForm: true,
            type:'Hospital',
            specialities:[],
            hospital:{
                name:'',
                address:'',
                mobile:'+91',
                location:'',
                registrationNo:'',
                about:'',
                specialities_selected:[],
                addFlag:false,
                email:'',
                password:'',
                regno:''
            },
            doctor:{
                name:'',
                address:'',
                location:'',
                email:'',
                password:'',
                mobile:'+91',
                dob:'',
                regno:'',
                experience:'',
                specialities_selected:[],
                regno:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.baseUrl = 'http://10.34.18.136:3000/';
        // this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handlePhoneChangeDHospital = this.handlePhoneChangeDHospital.bind(this)
        this.handlePhoneChangeDoctor = this.handlePhoneChangeDoctor.bind(this)
    }

    handlePhoneChangeDoctor(e){
        let str = e.target.value
        console.log(str.substring(0,3)," str.substring(0,2) in handlePhoneChange ")
        if(str.substring(0,3)==='+91'){
            
        }else{
            str = '+91'+e.target.value
        }
        this.setState({
            doctor:{
                ...this.state.doctor,
                mobile:str
            }
        })
    }

    handlePhoneChangeDHospital(e){
        let str = e.target.value
        console.log(str.substring(0,3)," str.substring(0,2) in handlePhoneChange ")
        if(str.substring(0,3)==='+91'){
            
        }else{
            str = '+91'+e.target.value
        }
        console.log(str.substring(0,3)," handlePhoneChangeDhosptial str.substring(0,2) ")
        if(str.substring(0,2)==='+91'){
            str.replace("+91","");
        }
        this.setState({
            hospital:{
                ...this.state.hospital,
                mobile:str
            }
           
        })
    }

    handleChange(e){
        let selectedValue = e.target.value;
        switch(selectedValue){
            case 'userForm':
                this.setState({
                    // showGeneralUserForm : true,
                    // showDoctorForm : false,
                    showHospitalForm : false,
                })
                break;
            case 'docForm':
                    this.setState({
                        // showGeneralUserForm : false,
                        // showDoctorForm : true,
                        showHospitalForm : false,
                    })
                break;
            case 'hospitalForm':
                    this.setState({
                        // showGeneralUserForm : false,
                        // showDoctorForm : false,
                        showHospitalForm : true,
                    })
                break;    
        }
    }

    selectType = (e) =>{
        console.log(e,"e.target.name","e.target.value")
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleChangeHospital = (e) =>{
        this.setState({
            hospital:{
                ...this.state.hospital,
                [e.target.name]:e.target.value
            }
        })
    }
    handleChangeDoctor = (e) =>{
        this.setState({
            doctor:{
                ...this.state.doctor,
                [e.target.name]:e.target.value
            }
        })
    }

    handleDateChange = (val) => {
        let data = (new Date(val)).getTime()
        this.setState({
            doctor:{
                ...this.state.doctor,
                'dob':getDateFormat(data)
            }
        })
    }

 componentDidMount() {
    axios.get(`${get_url()}/catalogue/getSpecialities`)
      .then(res => {
        const specialities = res.data.data;
        console.log(specialities,"get specialities");
        let array = []
        specialities.forEach((s) => {
          let data = {
            name: s.speciality,
            id: s.specialityId,
            value:s.speciality
          }
          array.push(data);
        })
        this.setState({ specialities: array });
      });
  }

  handleSpecialitySelect = (e) =>{
    try{
        let arr = [...this.state.hospital.specialities_selected]
        if(arr.includes(e.target.value))
        throw new MyError(`${e.target.value} is already selected`)
        arr.unshift(e.target.value)
        this.setState({
           hospital:{
            ...this.state.hospital,
            specialities_selected:arr
           }
        })
    } catch (e){
        this.setState({
            ret:{
                success:true,
                message:e.message
            }
        })
    }
  }

  handleSpecialitySelectDoctor = (e)=>{
    try{
        let arr = [...this.state.doctor.specialities_selected]
        if(arr.includes(e.target.value))
        throw new MyError(`${e.target.value} is already selected`)
        arr.unshift(e.target.value)
        this.setState({
            doctor:{
                ...this.state.doctor,
                specialities_selected:arr
            }
        })
    } catch (e){
        this.setState({
            ret:{
                success:true,
                message:e.message
            }
        })
    }
  }

  removeSpeciality = (data) =>{
    let arr = JSON.parse(JSON.stringify(this.state.hospital.specialities_selected))
    let i = arr.indexOf(data)
    arr.splice(i,1)
    this.setState({
        hospital:{
            ...this.state.hospital,
            specialities_selected:arr
        }
    })
  }

  removeSpecialityDoctor = (data) =>{
    let arr = JSON.parse(JSON.stringify(this.state.hospital.specialities_selected))
    let i = arr.indexOf(data)
    arr.splice(i,1)
    this.setState({
        doctor:{
            ...this.state.hospital,
            specialities_selected:arr
        }
    })
  }

  registerUser =(data)=>{
      console.log(data, "data in register User")
      console.log(typeof(data), "data  type in register User")
      this.setState({
          loading:true
      },()=>{
        if((this.state.type==="Hospital" || (this.state.type==="Lab"))){
          
            this.props.registerUser({
                ...data,
                userType:this.state.type
            })
        }else if(this.state.type==="Doctors"){
           
          this.props.registerUser({
              ...data,
              userType:'Doctor'
          })
        }else{
  
        }
      })
 }

 successRegister = ()=>{
     this.setState({
         loading:false
     })
 }

 handle_location_change = (data,type) =>{
     console.log(data,"data in handle_location_change")
   if(this.state.type === 'Doctors'){
    this.setState({
        doctor:{
            ...this.state.doctor,
            ...data
        }
      })
   }else {
    this.setState({
        hospital:{
            ...this.state.hospital,
            ...data
        }
      })
   }
   
  }
   
    render() {
        const { showLogin } = this.state
        console.log(this.state,"state in Registration Component")
        if (showLogin) {
            return <Redirect to='/signin' />
        }
        return (
           <div>
               <NewNotif
                ret = {this.state.ret}
                retClr = {()=>this.setState({ret:false})}
               />
               <div className="row">
               <AuthHeader />
               </div>
                <div className='row'>
                    <div className='col-md-6 sidetimgcol'>
                        <img className="sigun_imu"  src="signup.png" alt="SignUp" />
                    </div>
                    <div className='col-md-6 signup-wrap-new'>
                        <div className="signupHospitalForm" >
                            <div>
                                <h4 className="signUpText">Sign up</h4>
                            </div>
                            {/* <div className="form-group">
                            <SelectComponent
                                options = {[{
                                    value:'Doctors',
                                    name:'Doctors'
                                },
                                {
                                    value:'Hospital',
                                    name:'Hospital'
                                    
                                },
                                {
                                    value:'Lab',
                                    name:'Lab'
                                },
                            ]}
                                handleChange = {this.selectType}
                                value = {this.state.type}
                                multiple ={false}
                                name = "type"
                                label = ""
                   />
                   </div> */}
                            <div className="form-group">
                            <Select
                                id="sdasd"
                                arrow_class = "login_arrow_class"
                                handleChange = {this.selectType}
                                input_text_class = "login_select"
                                value = {this.state.type}
                                multiple ={false}
                                name = "type"
                                label = ""
                                // label="React Select"
                                placeholder = "Select user type"
                                variant="no_border"
                                value={this.state.type}
                                options = {[{
                                    value:'Doctors',
                                    name:'Doctors'
                                },
                                {
                                    value:'Hospital',
                                    name:'Hospital'
                                    
                                },
                                {
                                    value:'Lab',
                                    name:'Lab'
                                },
                            ]}
                             // disabled ={true}
                            loading = {true}
                 />
                            </div>


                            {
                                ((this.state.type==="Hospital") || (this.state.type==="Lab")) ?
                                <HospitalSignup 
                                    handleChange = {this.handleChangeHospital}
                                    data = {this.state.hospital}
                                    specialities = {this.state.specialities}
                                    specialities_selected = {this.state.hospital.specialities_selected}
                                    handleSpecialitySelect = {this.handleSpecialitySelect}
                                    removeSpeciality = {this.removeSpeciality}
                                    addFlag = {this.state.addFlag}
                                    addFlagToggle = {()=>this.setState({addFlag:!this.state.addFlag})}
                                    registerUser = {this.registerUser}
                                    registerUserRet = {this.props.registerUserRet}
                                    registerUserClr = {this.props.registerUserClr}
                                    loading = {this.state.loading}
                                    successRegister = {this.successRegister}
                                    handle_location_change = {this.handle_location_change}
                                    lab = {this.state.type==="Lab"}
                                    handlePhoneChangeDHospital = {this.handlePhoneChangeDHospital}
                                /> : null 
                            }
                            {
                                this.state.type ==="Doctors" ?
                                <DoctorSignup 
                                data = {this.state.doctor}
                                handleDateChange = {this.handleDateChange}
                                specialities = {this.state.specialities}
                                specialities_selected = {this.state.hospital.specialities_selected}
                                handleSpecialitySelect = {this.handleSpecialitySelectDoctor}
                                removeSpeciality = {this.removeSpecialityDoctor}
                                addFlag = {this.state.addFlag}
                                addFlagToggle = {()=>this.setState({addFlag:!this.state.addFlag})}
                                handleChange = {this.handleChangeDoctor}
                                specialities_selected = {this.state.doctor.specialities_selected}
                                registerUser = {this.registerUser}
                                loading = {this.state.loading}
                                successRegister = {this.successRegister}
                                registerUserRet = {this.props.registerUserRet}
                                registerUserClr = {this.props.registerUserClr}
                                handlePhoneChangeDoctor = {this.handlePhoneChangeDoctor}
                                handle_location_change = {this.handle_location_change}
                                />:null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    registerUserRet:state.user.registerUserRet
  })
  export default connect(mapStateToProps, {
  registerUser,
  registerUserClr
  })(RegistrationContainer)
