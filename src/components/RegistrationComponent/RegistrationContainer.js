import React from 'react';
// import UserRegistrationForm from './UserRegistrationForm';
import { Redirect } from 'react-router-dom';
import '../RegistrationComponent/RegistrationComponent.css';
// import DoctorRegistrationForm from "./DoctorRegistrationForm";
import HospitalRegistrationForm from './HospitalRegistrationForm';
import  "./RegistrationComponent.css";

import { registerUser, registerUserClr } from "../../actions/userActions";
import SelectComponent from '../SelectComponent'
import HospitalSignup from "../functional/HospitalSignup"
import DoctorSignup from '../functional/DoctorSignup'
import AuthHeader from '../functional/AuthHeader'

import { connect } from "react-redux"

import axios from "axios";

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
                mobile:'',
                registrationNo:'',
                about:'',
                specialities_selected:[],
                addFlag:false,
                email:'',
                password:''
            },
            doctor:{
                name:'',
                address:'',
                email:'',
                password:'',
                mobile:'',
                dob:'',
                regno:'',
                experience:'',
                specialities_selected:" ",
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.baseUrl = 'http://10.34.18.136:3000/';
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
 componentDidMount() {
    axios.get(`http://www.plunes.co/v4/catalogue_manager/specialities`)
      .then(res => {
        const specialities = res.data.data;
        // console.log(specialities);
        let array = []
        specialities.forEach((s) => {
          let data = {
            name: s.speciality,
            id: s._id,
            value:s.speciality
          }
          array.push(data);
        })
        this.setState({ specialities: array });
      });
  }

  handleSpecialitySelect = (e) =>{
        let arr = JSON.parse(JSON.stringify(this.state.hospital.specialities_selected))
        arr.push(e.target.value)
        this.setState({
            hospital:{
                ...this.state.hospital,
                specialities_selected:arr
            }
        })
  }

  handleSpecialitySelectDoctor = (e)=>{
    this.setState({
        doctor:{
            ...this.state.doctor,
            specialities_selected:e.target.value
        }
    })
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

  registerUser =(data)=>{
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
   
    render() {
        const { showLogin } = this.state
        console.log(this.state,"state in Registration Component")
        if (showLogin) {
            return <Redirect to='/login' />
        }
        return (
           <div>
               <div className="row">
               <AuthHeader />
               </div>
                <div className='row'>
                    <div className='col-md-6 sidetimgcol'>
                        <img className="signImage"  src="signup.png" alt="SignUp" />
                    </div>
                    <div className='col-md-6'>
                        <div className='col-md-1'>
                        </div>
                        <div className="col-md-7 signupHospitalForm" >
                            <div>
                                <h4 className="signUpText">Sign up</h4>
                            </div>
                            <div className="form-group">
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
                                    lab = {this.state.type==="Lab"}
                                /> : null 
                            }
                            {
                                this.state.type ==="Doctors" ?
                                <DoctorSignup 
                                data = {this.state.doctor}
                                specialities = {this.state.specialities}
                                handleChange = {this.handleChangeDoctor}
                                specialities_selected = {this.state.doctor.specialities_selected}
                                handleSpecialitySelect = {this.handleSpecialitySelectDoctor}
                                registerUser = {this.registerUser}
                                loading = {this.state.loading}
                                successRegister = {this.successRegister}
                                registerUserRet = {this.props.registerUserRet}
                                registerUserClr = {this.props.registerUserClr}
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
