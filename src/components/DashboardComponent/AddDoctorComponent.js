import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bankDetails, submitBankDetailsClr, upload,
   uploadRetClr, getServ, getServClr, getSpecs,
    getSpecsClr, addDoctor, addDoctorClr, getEntityClr, getEntity } from "../../actions/userActions";
import AddDoctorForm from '../functional/AddDoctorForm'
import "../DEvelopment.css"
import TimeSlot from '../functional/TimeSlot'
import ModalComponent from "../ModalComponent"
const slots = [
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "monday",
      "closed" : 'false'
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "tuesday",
      "closed" : 'false'
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "wednesday",
      "closed" : 'false'
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "thursday",
      "closed" : 'false'
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "friday",
      "closed" : 'false'
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "saturday",
      "closed" : 'false'
  },
  {
      "slots" : [
          "9:00 AM-1:00 PM",
          "3:00 PM-8:00 PM"
      ],
      "day" : "sunday",
      "closed" : 'true'
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
            addDoctorLoading:false,
            slots:this.transformData(slots),
            open:false,
            selectedSlot:{},
            selectedType:{},
            selectedshift:{},
            selectedDay:{},
            getUserLoading:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
      console.log(this.props.location,"Inside compoent Will Mount")
      const urlParams = new URLSearchParams(this.props.location.search);
      const id = urlParams.get('id');
      if(!!id){
        // console.log("True case in DidMount")
        this.setState({
          getUserLoading:true,
          doctorProfileFlag:true
        },()=>this.props.getEntity({
          userId:id
        }))

      }else{
        console.log("False case in DidMount")
      }
    }

    transformData = (data) =>{
      let arr = []
      data.forEach((item,i)=>{
            let obj = {}
            obj.day =this.getDay(i)
            obj.closed = item.closed==="false"?false:true
            obj.slots = {
            morning: this.stringToTime(item.slots[0]),
            evening: this.stringToTime(item.slots[1])
            }
            arr.push(obj)
      })
      return arr
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
    onCloseModal = () => {
      this.setState({ open: false });
    };

    stringToTime =(str)=>{
      let arr = str.split('-')
      let fromMinute = arr[0].split(" ")[0].split(':')[1]
      let fromHour = arr[0].split(" ")[0].split(':')[0]
      let fromAmpm = arr[0].split(" ")[1]
      let toMinutes = arr[1].split(" ")[0].split(':')[1]
      let toHour = arr[1].split(" ")[0].split(':')[0]
      let toAmPm = arr[1].split(" ")[1]
let obj =   {
          from:{
            hour:fromAmpm==="PM"?12+parseInt(fromHour,10):parseInt(fromHour,10),
            minutes:parseInt(fromMinute,10)
          },
          to:{
            hour:toAmPm==="PM"?12+parseInt(toHour,10):parseInt(toHour,10),
            minutes:parseInt(toMinutes,10)
          }
      }
         return obj
      }
    
      timeToString = (time) =>{
        let  hour =  time.hour>12?time.hour-12:time.hour
        let minutes =  time.minutes<10?`0${time.minutes}`:time.minutes
        let timeString = `${hour}:${minutes} ${time.hour>12?'PM':'AM'}`
        return timeString
     }

     handleTimeSubmit = (data) =>{
      console.log(data,"data in handleTimeSubmit")
        let slot = JSON.parse(JSON.stringify(this.state.slots))
        let index  = ''
        let newSlot  = slot.filter((item,i)=>{
                  if(item.day === this.state.selectedDay.day){
                    index = i
                  }
                return item.day !== this.state.selectedDay.day
        })
        let newObject = {
          ...this.state.selectedDay,
          slots: {...this.state.selectedDay.slots,
                [this.state.selectedshift]:{
                  ...this.state.selectedDay.slots[this.state.selectedshift],[this.state.selectedType]:{
                    ...data
                  }
                }
          }
        }
        newSlot.splice(index,0,newObject)
        console.log(newSlot,"newSliot in handleTimeSubmit")
        this.setState({
          slots:newSlot,
          selectedSlot:{},
          selectedType:{},
          selectedshift:{},
          selectedDay:{},
          open:false
        })
    }
   
    handleCloseDay = (data,i,e) => {
      e.stopPropagation()
      let slot = JSON.parse(JSON.stringify(this.state.slots))
      let index  = ''
      let newSlot  = slot.filter((item,j)=>{
                if(item.day === data.day){
                  index = j
                }
              return  item.day !== data.day
      })
      let newObject = {
        ...data,
        closed:!data.closed
      }
      newSlot.splice(i,0,newObject)
      this.setState({
        slots:newSlot
      })
    }


    generateTimeSlot = () =>{
      return(
          <React.Fragment>
              <TimeSlot
               selectedSlot = {this.state.selectedSlot}
               selectedType = {this.state.selectedType}
               selectedshift = {this.state.selectedshift}
               submit = {this.handleTimeSubmit}
               setAvailabilityRet = {this.props.setAvailabilityRet}
               setAvailabilityClr = {this.props.setAvailabilityClr}
               loadingOff = {()=>this.setLoadingOff()}
              />
          </React.Fragment> 
      )
  }
  
  getDay = (i) =>{
     switch (i) {
      case 0:
        return 'monday'
        break;
      case 1:
        return 'tuesday'
        break;
      case 2:
        return 'wendesday'
        break;
      case 3:
        return 'thursday'
        break;
      case 4:
        return 'friday'
        break;
      case 5:
       return 'saturday'
       break;
      case 6:
       return 'sunday'
       break;
     
       default:
         break;
     }
  }
  
  generateSlotsFormat = () =>{
      let slots = JSON.parse(JSON.stringify(this.state.slots))
      let arr = []
      slots.forEach((item,i)=>{
        let obj = {}
        obj = {
          closed:item.closed,
          day:item.day,
          slots:[`${this.timeToString(item.slots.morning.from)}-${this.timeToString(item.slots.morning.to)}`,`${this.timeToString(item.slots.evening.from)}-${this.timeToString(item.slots.evening.to)}`]
        }
        arr.push(obj)
      })
      console.log(arr,"arr in generate slot");
      
      return arr
  
     
  }

  
  slotClicked = (slot,a,b,item )  =>{
    console.log(slot, a, b, item,"SlotClicked")
    this.setState({
      selectedSlot:slot,
      selectedType:b,
      selectedshift:a,
      open:true,
      selectedDay:item
    })
  }

  

     componentWillReceiveProps(nextProps){

      if(nextProps.getEntityRet){
        if(nextProps.getEntityRet.success){
          console.log(nextProps.getEntityRet,"nextProps.getEntityRet in WillReceiveProps")
          let data = nextProps.getEntityRet.data

          let arr = []
          data.timeSlots.forEach((item,i)=>{
                let obj = {}
                obj.day =this.getDay(i)
                obj.closed = item.closed
                obj.slots = {
                morning: this.stringToTime(item.slots[0]),
                evening: this.stringToTime(item.slots[1])
                }
                arr.push(obj)
          })
              this.setState({
                name:data.name,
                education:data.education,
                designation:data.designation,
                experience:data.experience,
                doctorProfileImage:data.imageUrl,
                doctorImageName:data.doctorImageName,
                specialitie_chosen:data.specialities.length!==0?data.specialities[0].specialityId:'',
                slots:arr
              })
        }else{

        }
        nextProps.getEntityClr()
      }

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
        timeSlots:this.generateSlotsFormat(),
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
           <React.Fragment>
                <div className='col-md-8 col-xl-9 AllComponents'>
                    <div className="border_dev">
                <div className="add_dr">
                    <div className="add_srch_d">
                      {this.state.doctorProfileFlag?<h4>Doctor</h4>:<h4>Add Doctor</h4>}
          
          {/* <p>Search for a doctor by name or email</p> */}
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
              timeToString = {this.timeToString}
              slotClicked = {this.slotClicked}
              handleCloseDay = {this.handleCloseDay}
              slots ={this.state.slots.length===0?[]:this.state.slots}
            />
        </div>
        <ModalComponent 
                open = {this.state.open}
                handleClose = {this.onCloseModal}
                modalBody = {this.generateTimeSlot}
                />  
        </div>
                </div>
                <div className='col-md-3'></div>
           </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    user : state.user.userDetail,
    submitBankDetailsRet:state.user.submitBankDetailsRet,
    getServRet:state.user.getServRet,
    getSpecsRet:state.user.getSpecsRet,
    uploadRet:state.user.uploadRet,
    addDoctorRet:state.user.addDoctorRet,
    getEntityRet:state.user.getEntityRet
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
  addDoctorClr,
  getEntityClr,
  getEntity
  })(AddDoctorComponent)

