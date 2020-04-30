import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import { bankDetails, submitBankDetailsClr, upload,
   uploadRetClr, getServ, getServClr, getSpecs,
    getSpecsClr, addDoctor, addDoctorClr } from "../../actions/userActions";

import AddDoctorForm from '../functional/AddDoctorForm'
import "../DEvelopment.css"

const slots = [
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "monday",
      "closed" : false
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "tuesday",
      "closed" : false
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "wednesday",
      "closed" : false
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "thursday",
      "closed" : false
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "friday",
      "closed" : false
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "saturday",
      "closed" : false
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "sunday",
      "closed" : true
  }
]

class AddDoctorComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDetails : {},
            bankname: '',
            accnumber:  '',
            ifsccode: '',
            pannumber: '',
            accountname: '',
            loading:true,
            specialities:[],
            services:[],
            specialitie_chosen:' ',
            services_chosen:' ',
            name:'',
            education:'',
            designation:'',
            experience:'',
            doctorProfileImage:false,
            doctorImageName:false,
            consultationFee:3000,
            addDoctorLoading:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
          });
    }
    handleSubmit(e){
        e.preventDefault();
        let data = {
            "name": this.state.accountname,
            "bankName": this.state.bankname,
            "ifscCode": this.state.ifsccode,
            "accountNumber": this.state.accnumber,
            "panNumber": this.state.pannumber
        }
        this.props.bankDetails(data);
        
    }

    bankDetails = (data) =>{
        this.setState({
            loading:true
        })
        this.props.bankDetails(data)
    }
    loadingOff = () =>{
        this.setState({
            loading:false
        })
    }
    
     componentWillReceiveProps(nextProps){
      console.log(this.props,"props in compoentWo")
      if(nextProps.getSpecsRet){
        if(nextProps.getSpecsRet.success){
          console.log(nextProps.getSpecsRet,"nextProps.getSpecsRet")
          let arr = []
          let specialities = JSON.parse(JSON.stringify(nextProps.getSpecsRet.data))
          specialities.forEach((item,i)=>{
            let obj = {
              name:item,
              value:item
            }
            arr.push(obj)
          })
          this.setState({
            specialities:arr
          })
        }else{
          console.log("Unable to get Specs")
        }
        nextProps.getSpecsClr()
      }

      if(nextProps.getServRet){
        if(nextProps.getServRet.success){
          console.log(nextProps.getServRet,"nextProps.getServRet")
          let specialities = JSON.parse(JSON.stringify(nextProps.getServRet.data))
          let   arr = specialities.map((item,i)=>{
                  item.name = item.service
                  item.value = item.service
                  return item
          })
          this.setState({
            services:arr
          })
        }else{
          console.log("Unable to get Specs")
        }
        nextProps.getServClr()
      }

        // this.setState({
        //     userDetails : nextProps.user
        // }, () => {
        //     if(this.state.userDetails.bankDetails){
        //         this.setState({
        //             bankname : this.state.userDetails.bankDetails.bankName,
        //             accnumber : this.state.userDetails.bankDetails.accountNumber,
        //             ifsccode : this.state.userDetails.bankDetails.ifscCode,
        //             pannumber : this.state.userDetails.bankDetails.panNumber,
        //             accountname : this.state.userDetails.bankDetails.name,
        //             loading:false
        //         }, () => {
        //             console.log(this.state.userDetails.bankDetails.bankName)
        //         })
        //     }
        
        // })
      
    }

    async componentDidMount(){
       this.props.getSpecs()
    }

    handleChange = (e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    handleSelectChange = (e) =>{
    console.log(e,"e in handleSelectChange")

      this.setState({
        [e.target.name]:e.target.value
      },()=>{
        if(e.target.name==="specialitie_chosen"){
          this.setState({
            services_chosen:[]
          })
          this.props.getServ({
            name:this.state.specialitie_chosen
          })
        }
      })
    }

    submitdetails = (data) =>{
      console.log(data,"data in SubmitDetails")
      let services = JSON.parse(JSON.stringify(this.state.services))
      let service = services.filter((item,i)=>(
        item.name = data.services_chosen
      ))
      let specialities = [
        {
         specialityId:service[0].specialityId,
         services:[
           {
             price:service[0].consultationFee,
             category:["Consultation"],
             homeCollection:false,
             variance:0,
             serviceId:service[0].serviceId
           }
         ]
        }
]
      let obj = {
        name:data.name,
        education:data.education,
        designation:data.designation,
        department:'',
        timeSlots:slots,
        experience:data.experience,
        imageUrl:data.doctorProfileImage,
        prescription:{},
        hospitalName:this.props.user.name,
        specialities:specialities
      }

      this.setState({
        addDoctorLoading:true
      },()=>this.props.addDoctor(obj))
      console.log(obj,"Obj submitDoctor")
    }
    upload = (data) =>{
      this.setState({
        laodingImage:true
      },()=>this.props.upload(data))
    }

    setImage = (data) =>{
     this.setState({
      doctorProfileImage:data.imageUrl,
      doctorImageName:data.filename
     })
    }

    render() {
      console.log(this.state,"this.state in AddComponent")
      
        return (
            <div>
            <div className='row'>
                <DashboardHeader />
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <SidebarComponent />
                </div>
                <div className='col-md-7'>
                    <div className="border_dev">
                <div className="add_dr">
                    <div className="add_srch_d">
          <h4>Add Doctors</h4>
          <p>Search for a doctor by name or email</p>
          </div>
          {/* <div className="search_b">
          <form action="#" method="get">
              <label className="sech_b">Search</label>
            <input list="browsers" name="browser" placeholder="Dr. Surbhi" className="cus_inp col-lg-12"/>
            <img src="/search.png" className="pst_srch"/>
             <div className="box_pnl">
              <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_1.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Sudha Sethi</h6>
                    <p>Anaesthesia, Fortis Hospital, Mohali</p>
                  </div>
             </div>
             
             <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_2.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Minal Sharma</h6>
                    <p>Neurology, Fortis Hospital, Jaipur</p>
                  </div>
             </div>
                
                 <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_3.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Anita Gupta</h6>
                    <p>Gynecology, Fortis Hospital, Jaipur</p>
                  </div>
             </div>
                
                  <div className="row">
                  <div className="col-lg-2"><img src="/pixel_4.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Anita Joshi</h6>
                    <p>Gynecology, Fortis Hospital, Jaipur</p>
                  </div>
             </div>
               
            </div>
            </form>
            </div>
           
              <div className="add_mnu">
                  <div className="aero_dn">
               <a href="#" className="A_nu">Add Manually</a>
               <i class="fa fa-angle-up" aria-hidden="true"></i>
               </div>

               <div className="aero_up">
               <a href="#" className="A_up">Add Manually</a>
               <i class="fa fa-chevron-down" aria-hidden="true"></i>
               </div>

               <div className="manualy_pnl">
              <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_1.png"className="pixel" /></div>
                  <div className="col-lg-4 sudha_a">
                   <h6>Dr. Sudha Sethi</h6>
                    <p>MBBS, DGO HOD, Gynecology 10yrs experience Fortis Hospital, Ludhiana</p>
                  </div>
                  <div className="col-lg-2 offset-lg-4">
                      <div className="fa_min">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  </div>
             </div>
             
             <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_2.png"className="pixel" /></div>
                  <div className="col-lg-4 sudha_a">
                   <h6>Dr. Minal Sharma</h6>
                    <p>BDS, MDS Surgeon, Dentistry 17yrs experience Fortis Hospital, Jaipur</p>
                  </div>
                  <div className="col-lg-2 offset-lg-4">
                      <div className="fa_min">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  </div>
             </div>
                
                 <div className="row">
                  <div className="col-lg-2"><img src="/pexel_3.png"className="pixel" /></div>
                  <div className="col-lg-4 sudha_a">
                   <h6>Dr. Anita Gupta</h6>
                    <p>BPTh, BPT Therapist, Physiotherapy 8yrs experience Fortis Hospital,Gurgaon</p>
                  </div>
                  <div className="col-lg-2 offset-lg-4">
                      <div className="fa_min">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  </div>
             </div>
               
               
            </div>
          </div>
           */}
            <AddDoctorForm   
              upload = {this.upload}
              uploadRet = {this.props.uploadRet}
              uploadRetClr = {this.props.uploadRetClr}
              specialities = {this.state.specialities}
              services = {this.state.services}
              specialitie_chosen = {this.state.specialitie_chosen}
              services_chosen = {this.state.services_chosen}
              handleSelectChange = {this.handleSelectChange}
              name = {this.state.name}
              education = {this.state.education}
              designation  = {this.state.designation}
              experience = {this.state.experience}
              handleChange = {this.handleChange}
              submitdetails = {this.submitdetails}
              laodingImage = {this.state.laodingImage}
              loadingImageOff = {()=>this.setState({laodingImage:false})}
              setImage = {this.setImage}
              doctorProfileImage = {this.state.doctorProfileImage}
              doctorImageName = {this.state.doctorImageName}
              addDoctor = {this.props.addDoctor}
              addDoctorClr = {this.props.addDoctorClr}
              addDoctorRet = {this.props.addDoctorRet}
              addDoctorLoading = {this.state.addDoctorLoading}
              addDoctorLoadingOff = {()=>this.setState({addDoctorLoading:false})}
              editConsultFlag = {this.state.editConsultFlag}
              consultationFee= {this.state.consultationFee}
              submitConsultaion = {()=>this.setState({editConsultFlag:false})}
              toggleSubmitConultation = {()=>this.setState({editConsultFlag:!this.state.editConsultFlag})}
            />
        </div>
        </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = state => ({
    user : state.user.userDetail,
    submitBankDetailsRet:state.user.submitBankDetailsRet,
    getServRet:state.user.getServRet,
    getSpecsRet:state.user.getSpecsRet,
    uploadRet:state.user.uploadRet,
    addDoctorRet:state.user.addDoctorRet
  })
  export default connect(mapStateToProps, {bankDetails,
  submitBankDetailsClr,
  getSpecsClr,
  getSpecs,
  getServ,
  getServClr,
  upload,
  uploadRetClr,
  addDoctor,
  addDoctorClr
  })(AddDoctorComponent)

