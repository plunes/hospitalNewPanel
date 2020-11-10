import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bankDetails, submitBankDetailsClr, upload,
   uploadRetClr, getServ, getServClr, getSpecs,
    getSpecsClr, addDoctor, addDoctorClr, getEntityClr, getEntity, getUserDetails, set_user_info,
     get_center_profile,  set_center_data, get_center_profile_clr } from "../../actions/userActions";
import  { delete_profile, delete_profile_loading } from "../../actions/dash_actions";
import AddDoctorForm from '../functional/AddDoctorForm'
import "../DEvelopment.css"
import TimeSlot from '../functional/TimeSlot'
import ModalComponent from "../ModalComponent"
import NewNotif from '../functional/NewNotif';
import { get_url_params, isEmpty } from '../../utils/common_utilities';
import { Redirect } from "react-router-dom"
let error_flag = false
function MyError(message){
  this.message = message;
}

MyError.prototype = new Error()

const slots =[
  {
      "slots": [
          "9:00 AM-1:00 PM",
          "2:00 PM-8:00 PM"
      ],
      "day": "Monday",
      "closed": false
  },
  {
      "slots": [
          "9:00 AM-1:00 PM",
          "2:00 PM-8:00 PM"
      ],
      "day": "Tuesday",
      "closed": false
  },
  {
      "slots": [
          "9:00 AM-1:00 PM",
          "2:00 PM-8:00 PM"
      ],
      "day": "Wednesday",
      "closed": false
  },
  {
      "slots": [
          "9:00 AM-1:00 PM",
          "2:00 PM-8:00 PM"
      ],
      "day": "Thursday",
      "closed": false
  },
  {
      "slots": [
          "9:00 AM-1:00 PM",
          "2:00 PM-8:00 PM"
      ],
      "day": "Friday",
      "closed": false
  },
  {
      "slots": [
          "9:00 AM-1:00 PM",
          "2:00 PM-8:00 PM"
      ],
      "day": "Saturday",
      "closed": false
  },
  {
      "slots": [
          "9:00 AM-1:00 PM",
          "2:00 PM-8:00 PM"
      ],
      "day": "Sunday",
      "closed": false
  }
]

class AddDoctorComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDetails : {},
            bankname: '',
            accnumber:  '',
            department:'',
            ifsccode: '',
            pannumber: '',
            accountname: '',
            loading:true,
            specialities:[],
            services:[],
            specialitie_chosen:'',
            services_chosen:false,
            name:'',
            education:'',
            designation:'',
            experience:'',
            doctorProfileImage:false,
            doctorImageName:false,
            consultationFee:0,
            addDoctorLoading:false,
            slots:this.transformData(slots),
            open:false,
            selectedSlot:{},
            selectedType:{},
            selectedshift:{},
            selectedDay:{},
            getUserLoading:false,
            editConsultFlag:false,
            error:false,
            delete_doctor_flag:false,
            slots:[],
            selected_days:[],
            selected_slot:{
            slots:[]
          }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
      const urlParams = new URLSearchParams(this.props.location.search);
      const id = urlParams.get('id');
      if(!!id){
        this.setState({
          getUserLoading:true,
          doctorProfileFlag:true
        },()=>this.props.getEntity({
          userId:id
        }))

      }else{
        console.log("False case in DidMount")
        let arr = this.transformData(slots)
       this.setState({
         slots:arr,
         selected_slot:arr[0],
         selected_days:[]
       })
      }
    let center_id = get_url_params('center')
      if(!!center_id){
        if(this.props.centers_list.length ===0){
        
          this.props.get_center_profile({center_id})
        }else{
          let center_data  = [...this.props.centers_list].filter(item=>(!!(item._id === center_id)))[0]
          this.props.set_center_data({...center_data})
        }
      }
    }

    transformData = (data) =>{
      let arr = []
      data.forEach((item,i)=>{
        let time_slots = [...item.slots]
        let slots_arr = []
        time_slots.forEach(data=>{
          slots_arr.push(this.stringToTime(data))
        })
          let obj = {}
          obj.day =this.getDay(i)
          obj.closed = item.closed==="false"?false:true
          obj.slots = slots_arr
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
      console.log(fromHour==='12',"fromHour")
let obj =   {
          from:{
            hour:fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10),
            minutes:parseInt(fromMinute,10),
            timestamp:new Date(2020, 1, 1, fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10) , parseInt(fromMinute,10) , 0 , 0).getTime()?new Date(2020, 1, 1, fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10) , parseInt(fromMinute,10) , 0 , 0).getTime():0
          },
          to:{
            hour:toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10),
            minutes:parseInt(toMinutes,10),
            timestamp:new Date(2020, 1, 1,toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10) , parseInt(toMinutes,10) , 0 , 0).getTime()?new Date(2020, 1, 1,toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10) , parseInt(toMinutes,10) , 0 , 0).getTime():0
          }
      }
         return obj
      }
    
      timeToString = (time) =>{
        if(!time){
          return 'N/A'
        }
        // console.log(hour,"hour in timetostring")
         let  hour =  time.hour>12?time.hour-12:time.hour===0?12:time.hour
         console.log(hour,time,"hour in timetostring")
         let minutes = time.minutes<10?`0${time.minutes}`:time.minutes
         let timeString = `${hour}:${minutes} ${time.hour>=12?time.hour===0?'AM':'PM':'AM'}`
         return timeString
      }

      handleTimeSubmit = (data) =>{
        console.log(data,"data in handleTimeSubmit")
      
        let slots = this.state.slots
         let updated_slots = slots.map(item=>{
           if(item.day === data.day){
             return {
               ...item,
               slots:data.slots,
             }
           }else{
             return item
           }
         })
      
      
         console.log(updated_slots,"updated_slots")
      
         this.setState({
           slots:[...updated_slots],
           selected_slot:data,
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
                       selected_time = {this.state.selected_time}
                     
                       submit = {this.handleTimeSubmit}
                       setAvailabilityRet = {this.props.setAvailabilityRet}
                       setAvailabilityClr = {this.props.setAvailabilityClr}
                       loadingOff = {()=>this.setLoadingOff()}
                       selected_slot = {this.state.selected_slot}
                      />
                  </React.Fragment> 
              )
          }

  generate_delete_doctor = () => {
    
  }
  
  getDay = (i) =>{
     switch (i) {
      case 0:
        return 'Monday'
        break;
      case 1:
        return 'Tuesday'
        break;
      case 2:
        return 'Wednesday'
        break;
      case 3:
        return 'Thursday'
        break;
      case 4:
        return 'Friday'
        break;
      case 5:
       return 'Saturday'
       break;
      case 6:
       return 'Sunday'
       break;
     
       default:
         break;
     }
  }
  
  generateSlotsFormat = () =>{
    let slots = [...this.state.slots]
    let arr = []
    console.log(slots,"slots in generateSlotsFormat")

    try {
      slots.forEach((item,i)=>{
        let push_flag = true
        let obj = {}
        let slots = []
        item.slots.forEach(slot=>{
          console.log(slot,"slot")
          if(!((!slot.from) || (!slot.to))){
            slots.push(`${this.timeToString(slot.from)}-${this.timeToString(slot.to)}`)
        } 
        })
        obj = {
          closed:item.closed,
          day:item.day,
          slots:slots
        }
        if(obj.slots.length===0){
          throw new Error("Invalid Time Slots")
        }
        arr.push(obj)
      })
     
     
    } catch(e) {
      console.log(e)
      arr = false
    }
    return arr 
}


time_selected = (data) => {
  console.log(data,"data in time_selected")
  this.setState({
    selected_time:data,
    open:true,
  })
}

set_slot = (day) => {
  this.setState({
    selected_slot:[...this.state.slots].filter(item=>{
      return (item.day === day)
    })[0]
  })
}

sloct_checkbox = () => {
  let updated_selected_slot = {...this.state.selected_slot, closed: !this.state.selected_slot.closed}
  this.setState({
    selected_slot:{
      ...updated_selected_slot
    },
    slots:[...this.state.slots].map(item=>{
         if(item.day===this.state.selected_slot.day){
             return {...updated_selected_slot}
         }else{
           return item
         }
    })
  })
}

remove_slot = (val) => {
  console.log(val,"val in remove_slot")
  let updated_selected_slot = [...this.state.selected_slot.slots].filter((item,key)=>{
    return val!==key
  })
  console.log(updated_selected_slot,"updated_selected_slot")
  this.setState({
    selected_slot:{
      ...this.state.selected_slot,
      slots:updated_selected_slot
    },
    slots:[...this.state.slots].map(item=>{
         if(item.day===this.state.selected_slot.day){
           let arr =  [...item.slots].filter((item,key)=>{
            return val!==key
          })
            return  {
              ...item,
              slots:arr
            }
         }else{
           return item
         }
    })
  })
}

set_selected_days =(day) => {
  let arr = [...this.state.selected_days]
  arr.push(day)
      this.setState({
        selected_days:arr
      })
}

apply_to_all = () => {
  console.log(this.state.selected_slot,this.state.selected_days, this.state.slots,"===============>>>")
  this.setState({
    slots:[...this.state.slots].map(item=>{
        let slot = item
        try {
            this.state.selected_days.forEach(data=>{
               if(data === item.day){
                    slot = {
                      ...this.state.selected_slot,
                      day:item.day
                     }
                     throw new Error('Dummy error')
               }
            })
        }catch (e) {
          console.log(e)

        }
        return slot
    }),
    selected_days:[]
    
  })
}


add_slot = () => {
  if(this.state.selected_slot.slots.length!==0){
    if(!!this.state.selected_slot.slots[this.state.selected_slot.slots.length -1].from)
    {
     let updated_selected_slot = [...this.state.selected_slot.slots]
     updated_selected_slot.push({
       from: false,
       to: false
     })
     console.log(updated_selected_slot,"updated_selected_slot")
     this.setState({
       selected_slot:{
         ...this.state.selected_slot,
         slots:updated_selected_slot
       },
       slots:[...this.state.slots].map(item=>{
            if(item.day===this.state.selected_slot.day){
              let arr =  [...item.slots]
              arr.push({
               from: false,
               to: false
             })
               return  {
                 ...item,
                 slots:arr
               }
            }else{
              return item
            }
       })
     })
    }
  }else {
    this.setState({
      selected_slot:{
        ...this.state.selected_slot,
        slots:[{
          from: false,
          to: false,
          timestamp:undefined
        }]
      }
    })
  }
  
}

  
  slotClicked = (slot,a,b,item )  =>{
    
    if(!isEmpty(slot)){
      this.setState({
        selectedSlot:slot,
        selectedType:b,
        selectedshift:a,
        open:true,
        selectedDay:item,
        selecteDaySlots:item.slots
      })
    }else{
      this.setState({
        ret:{
          success:false,
          message:'Hmmm .. Something seems wrong , Please contact our team to change these time slots'
        }
      })
    }

  }

  

     componentWillReceiveProps(nextProps){

      if(nextProps.getEntityRet){
        if(nextProps.getEntityRet.success){
       
          let data = nextProps.getEntityRet.data

          let arr = []
          data.timeSlots.forEach((item,i)=>{
            let time_slots = [...item.slots]
            let slots_arr = []
            time_slots.forEach(data=>{
              slots_arr.push(this.stringToTime(data))
            })
              let obj = {}
              obj.day =this.getDay(i)
              obj.closed = item.closed==="false"?false:true
              obj.slots = slots_arr
              arr.push(obj)
          })
          console.log(arr,"arr")
          try {
            this.setState({
              name:data.name,
              education:data.education,
              designation:data.designation,
              department:data.department,
              experience:data.experience,
              consultationFee:data.specialities.length!==0?!!(data.specialities[0].services.length!==0)?data.specialities[0].services[0].price[0]:'':'',
              doctorProfileImage:data.imageUrl,
              doctorImageName:data.doctorImageName,
              specialitie_chosen:data.specialities.length!==0?data.specialities[0].specialityId:'',
              slots:arr,
              selected_slot:arr[0],
              selected_days:[]
            },()=>{
              if(data.specialities.length!==0){
                try{
                  this.setState({
                    services_chosen:[]
                  })
                  this.props.getServ({
                    name:data.specialities[0].specialityName
                  })
                }catch(e) {
                  console.log(e,"e in catch block")
                }
              }
            })
          } catch (error) {
           
            throw new MyError("Unable to get doctor profile , try again later.")
          }
        }else{

        }
        nextProps.getEntityClr()
      }

      if(nextProps.getSpecsRet){
        if(nextProps.getSpecsRet.success){

          let arr = []
          let specialities = [...nextProps.getSpecsRet.data]
          specialities.forEach((item,i)=>{
            let obj = {
              name:item.speciality,
              value:item.specialityId
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
     
          let specialities = JSON.parse(JSON.stringify(nextProps.getServRet.data))
          let   arr = specialities.map((item,i)=>{
                  item.name = item.service
                  item.value = item.service
                  return item
          })
          this.setState({
            services:arr,
            services_chosen:!!arr[0]?arr[0].service:''
          })
        }else{
          console.log("Unable to get Specs")
        }
        nextProps.getServClr()
      }


      
    if(nextProps.get_center_profile_ret){
      if(nextProps.get_center_profile_ret.success){
        nextProps.set_center_data({...nextProps.get_center_profile_ret.data})
      }else{
          this.setState({
            ret:{
              success:false,
              message:nextProps.get_center_profile_ret.message
            }
          })
      }
      nextProps.get_center_profile_clr()
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
      this.setState({
        [e.target.name]:e.target.value
      },()=>{
        if(e.target.name==="specialitie_chosen"){
          try{
            let arr = [...this.state.specialities]
            arr.forEach((item)=>{
     
              if(item.value === e.target.value){
                throw new MyError(item.name)
              }
            })
          }catch(e){
          
              this.setState({
                services_chosen:[]
              })
              this.props.getServ({
                name:e.message
              })
          }
        }
      })
    }

    clear_data = () => {
      this.setState({
        name:'',
        education:'',
        designation:'',
        experience:'',
        doctorProfileImage:'',
        doctorImageName:'',
        specialitie_chosen:'',
        add_success:true
      })
    }

    submitdetails = (data) =>{
 
      if(!!error_flag){
        this.setState({
          ret:{
            success:false,
            message:'Hmmm .. Something seems wrong , Please contact our team to add doctor to this profile'
          }
        })
        return false
      }

     
      let services = JSON.parse(JSON.stringify(this.state.services))
      let service = services.filter((item,i)=>(
        item.name = data.services_chosen
      ))

      let service_arr = []
      if(!!service[0]){
        service_arr =[
          {
            price:[parseInt(this.state.consultationFee,10)],
            category:["Consultation"],
            homeCollection:false,
            variance:0,
            serviceId:service[0].serviceId
          }
        ]
      }
      let specialities = [
        {
         specialityId:this.state.specialitie_chosen,
         services:service_arr
        }
]

      let obj = {
        name:data.name,
        education:data.education,
        designation:data.designation,
        department:data.department,
        timeSlots:this.generateSlotsFormat(),
        experience:data.experience,
        imageUrl:data.doctorProfileImage,
        consultationFee:data.consultationFee,
        prescription:{},
        hospitalName:!!get_url_params('center')?this.props.center_data.name:this.props.prof_data.name,
        specialities:specialities,
        doctorId:data.doctorId
      }
      this.setState({
        addDoctorLoading:true
      },()=>this.props.addDoctor(obj))

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

    toggleSubmitConultation = () =>{
      if(!!!this.state.editConsultFlag){
        this.setState({editConsultFlag:true})
      }else{
        if(this.state.consultationFee===""){
          this.setState({
            ret:{
              success:false,
              message:'Invalid Consultion fees'
            }
          })
        }else{
          this.setState({editConsultFlag:false})
        }
      }
    }

    render() {
   console.log(this.state.slots,"slots")
      let center_id = get_url_params('center')
      if(this.state.add_success){
        if(!!center_id){
          return <Redirect to= {{
            pathname: `/dashboard/profile?center=${center_id}`
        }}  />
        }else {
          return <Redirect to= {{
            pathname: `/dashboard/profile`
        }}  />
        }
     }
      
        return (
           <React.Fragment>
                <div  style={{width:'90%'}} className='main_content_rish'>
                    <div >
                <div className="add_dr">
                    <div className="add_srch_d">
                      <NewNotif 
                        ret= {this.state.ret}
                        retClr= {()=>this.setState({
                          ret:false
                        })}
                      />
                      {this.state.doctorProfileFlag?<h4>Doctor</h4>:<h4>Add Doctor</h4>}
          </div>
        
            <AddDoctorForm  
              add_slot = {this.add_slot} 
              handleSubmitAvail = {this.handleSubmitAvail}
              set_selected_days = {this.set_selected_days}
              apply_to_all = {this.apply_to_all}
              addSlot = {this.addSlot}
              set_slot = {this.set_slot}
              remove_slot = {this.remove_slot}
              timeToString = {this.timeToString}
              time_selected = {this.time_selected}
              selected_days = {this.state.selected_days}
              selected_day = {this.state.selected_day}
              selected_slot = {this.state.selected_slot}
              upload = {this.upload}
              set_user_info = {this.props.set_user_info}
              prof_data = {!!get_url_params('center')?this.props.center_data:this.props.prof_data}
              clear_data = {this.clear_data}
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
              submitConsultaion = {this.toggleSubmitConultation}
              toggleSubmitConultation = {this.toggleSubmitConultation}
              timeToString = {this.timeToString}
              slotClicked = {this.slotClicked}
              handleCloseDay = {this.handleCloseDay}
              slots ={this.state.slots.length===0?[]:this.state.slots}
              getUserDetails = {this.props.getUserDetails}
              department = {this.state.department}
              delete_profile = {this.props.delete_profile}
              delete_profile_ret = {this.props.delete_profile_ret}
              delete_profile_loading_flag = {this.props.delete_profile_loading_flag}
              delete_profile_loading = {this.props.delete_profile_loading}
            />
        </div>
        <ModalComponent 
                open = {this.state.open}
                handleClose = {this.onCloseModal}
                modalBody = {this.generateTimeSlot}
                />  

          <ModalComponent 
                open = {this.state.delete_doctor_flag}
                handleClose = {this.toggle_delete_doctor}
                modalBody = {this.generate_delete_doctor}
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
    prof_data:state.user.data.prof_data,
    center_data:state.user.data.centers_data.center_data,
    submitBankDetailsRet:state.user.submitBankDetailsRet,
    getServRet:state.user.getServRet,
    getSpecsRet:state.user.getSpecsRet,
    uploadRet:state.user.uploadRet,
    addDoctorRet:state.user.addDoctorRet,
    getEntityRet:state.user.getEntityRet,
    prof_data:state.user.data.prof_data,
    center_data:state.user.data.centers_data.center_data,
    centers_list:state.user.data.centers_data.centers_list,
    get_center_profile_ret:state.user.get_center_profile_ret,
    delete_profile_ret:state.dash_store.delete_profile_ret,
    delete_profile_loading_flag:state.dash_store.delete_profile_loading
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
  getEntity,
  getUserDetails,
  set_user_info,
  get_center_profile,
  set_center_data,
  get_center_profile_clr,
  delete_profile,
  delete_profile_loading
  })(AddDoctorComponent)


  