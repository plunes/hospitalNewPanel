import React, { Component } from 'react';
import { getBooking, getBookingClr, changeAppoint, changeAppointClr,
     getTimeslot, reschedule_appointment_clr, reschedule_appointment,
     set_notif_id } from '../../actions/userActions'
import { connect } from 'react-redux';
import  "./AvailabilityComponent.css";
import "./appointment.css"
import Modal from 'react-modal';
import LoaderComponent from "../functional/LoaderComponent"

import  { dates } from "../../utils/common_utilities"

import RescheduleComponent from '../RescheduleComponent';
import NewNotif from '../functional/NewNotif';
import AnimatedMount from "../../HOC/AnimatedMount"
import InsightProgressBar from "../functional/InsightProgressBar"
import  PhotoGallery from "../functional/PhotoGallery"
import PdfSection from "../functional/PdfSection"

function MyError(message){
    this.message = message;
}

MyError.prototype = new Error()
let time_flag = false
const getMonth = (item) =>{
        switch (item) {
            case 0:
                return "JAN"
                break;
            case 1:
                return "FEB"
                break;
            case 2:
                return "MAR"
                break;
            case 3:
                return "APR"
                break;
            case 4:
                return "MAY"
                break;
            case 5:
                return "JUN"
                break;
            case 6:
                return "JUL"
                break;
            case 7:
                return "AUG"
                break;
            case 8:
                return "SEP"
                break;
            case 9:
                return "OCT"
                break;
            case 10:
                return "NOV"
                break;
            case 11:
                return "DEC"
                break;
            default:
                break;
        }
}

const getDay = (i) =>{
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


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class AppointmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen : false,
            upcoming_bookings:[],
            cancelled_bookings:[],
            confirmed_bookings:[],
            get_bookings_loading:false,
            firstRender:true,
            defaultDate:new Date,
            tabIndex:0
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal =  this.closeModal.bind(this);
    }
     componentDidMount(){
         console.log(this.props.notif_id,"this.props.notif_id in didMoint")
      this.setState({
        get_bookings_loading:true
      },()=>{
        this.props.getBooking()
        time_flag =true
      })
      this.props.getTimeslot()
    }
    openModal(){
        this.setState({
            modalIsOpen : true
        })
    }

    closeModal(){
        this.setState({
            modalIsOpen : false
        })
    }

    dateTimeObject = (seconds) =>{
        let date = new Date(parseInt(seconds, 10))
        return  {
            monthAndDate: `${getMonth(date.getMonth())}  ${date.getDate()>9?date.getDate():"0"+date.getDate()}`,
            fullDate:  `${date.getDate()>9?date.getDate():"0"+date.getDate()} ${getMonth(date.getMonth())}  ${date.getFullYear()} `,
            time: `${date.getHours()>9?date.getHours():"0"+date.getHours()}:${date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()} ${date.getHours()>=12?"PM":'AM'}`,
        }
    }

    conformBooking = ()=>{
        this.props.changeAppoint({
            ...this.state.selected_booking,
            type:'confirming'
        })
    }

    cancellAppointmentSubmit=()=>{
        this.props.changeAppoint({
            ...this.state.selected_booking,
            type:'cancel'
        })
    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps.getBookingRet){
            if(nextProps.getBookingRet.success){
                let appointments_arr = []
                let redirect_index =false
                let redirect_type =''
               if(!!nextProps.notif_id){
                   console.log(nextProps.notif_id,"nextProps.notif_id")
                try{
                    console.log(nextProps.getBookingRet,"nextProps.getBookingRet.")
                     appointments_arr = [...nextProps.getBookingRet.data]
                    console.log(appointments_arr.length,"pika booS")
                    for (var i = 0, len = appointments_arr.length ; i < len; i++) {
                        console.log(appointments_arr[i]._id,"all ids")
                      if(appointments_arr[i]._id === nextProps.notif_id){
                          redirect_index = i
                          redirect_type = ((appointments_arr[i].bookingStatus=== "Confirmed") &&  (appointments_arr[i].doctorConfirmation===true) )?'confirmed_bookings':(appointments_arr[i].bookingStatus=== "Cancelled")?'cancelled_bookings':'upcoming_bookings'
                          this.setState({
                            tabIndex:((appointments_arr[i].bookingStatus=== "Confirmed") &&  (appointments_arr[i].doctorConfirmation===true) )?1:(appointments_arr[i].bookingStatus=== "Cancelled")?2:0
                          })
                          throw new MyError(nextProps.notif_id)
                      }
                  }
                  }catch(e){
                      console.log(e.message,"this is our message in catch Block")
                      nextProps.set_notif_id(false)
                  }
               }
               let confirmed_bookings = []
               let cancelled_bookings = []
               let upcoming_bookings = []
               console.log(this.state,"this.state before sorting")
               nextProps.getBookingRet.data.forEach(data =>{

                let flag = dates.compare(new Date(), new Date(data.appointmentTime/1000))

                let time_now =  ((new Date()).getTime()) > data.appointmentTime
                data.flag = flag
                console.log(time_now, data, "======>>>>>>>>>>>>")
                   console.log(redirect_index,redirect_type,"redirect_index and redirect type")
                   if(((data.bookingStatus==="Confirmed") && (data.doctorConfirmation===true)) || time_now ){
                       if(!!redirect_index){
                         if(appointments_arr[redirect_index]._id !== data._id){
                            confirmed_bookings.push(data)
                         }
                       }else{
                        confirmed_bookings.push(data)
                       }
                      
                   }else if(data.bookingStatus==="Cancelled"){
                    if(!!redirect_index){
                        if(appointments_arr[redirect_index]._id !== data._id){
                            console.log("cancelled_bookings")
                            cancelled_bookings.push(data)
                        }
                      }else{
                        cancelled_bookings.push(data)
                      }

                   }else{
                    if(!!redirect_index){
                        if(appointments_arr[redirect_index]._id !== data._id){
                            upcoming_bookings.push(data)
                        }
                      }else{
                        upcoming_bookings.push(data)
                      }
                   }
               })

               if(!!redirect_index){
                   if(redirect_type==="confirmed_bookings"){
                    confirmed_bookings.unshift(appointments_arr[redirect_index])
                   }else if(redirect_type==="cancelled_bookings"){
                    cancelled_bookings.unshift(appointments_arr[redirect_index])
                   }else {
                    upcoming_bookings.unshift(appointments_arr[redirect_index])
                   }          
               }

               confirmed_bookings.map((item, index) => {
                    let insImages = []
                    if(item.insuranceDetails && Array.isArray(item.insuranceDetails.insuranceCard)) {
                        item.insuranceDetails.insuranceCard.map((insuranceCard) => {
                            insImages.push({
                            imageUrl: insuranceCard
                            })
                        })
                    }
                    if(item.insuranceDetails)
                        item.insuranceDetails.insuranceCard = insImages
               })
               upcoming_bookings.map((item, index) => {
                    let insImages = []
                    if(item.insuranceDetails && Array.isArray(item.insuranceDetails.insuranceCard)) {
                        item.insuranceDetails.insuranceCard.map((insuranceCard) => {
                            insImages.push({
                            imageUrl: insuranceCard
                            })
                        })
                    }
                    if(item.insuranceDetails)
                        item.insuranceDetails.insuranceCard = insImages
               })
               cancelled_bookings.map((item, index) => {
                    let insImages = []
                    if(item.insuranceDetails && Array.isArray(item.insuranceDetails.insuranceCard)) {
                        item.insuranceDetails.insuranceCard.map((insuranceCard) => {
                            insImages.push({
                            imageUrl: insuranceCard
                            })
                        })
                    }
                    if(item.insuranceDetails)
                        item.insuranceDetails.insuranceCard = insImages
               })

               this.setState({
                confirmed_bookings:confirmed_bookings,
                cancelled_bookings:cancelled_bookings,
                upcoming_bookings:upcoming_bookings,
                get_bookings_loading:false,
               
               },()=>{
                   time_flag=false
               })
            }else{
                this.setState({
                    confirmed_bookings:[],
                    cancelled_bookings:[],
                    upcoming_bookings:[]
                })
            }
            nextProps.getBookingClr()
        }


        if(((!!nextProps.timeSlot) && (this.state.firstRender))){
            let arr = []
            nextProps.timeSlot.forEach((item,i)=>{
                let time_slots = [...item.slots]
                let slots_arr = []
                time_slots.forEach(data=>{
                  slots_arr.push(this.stringToTime(data))
                })
                  let obj = {}
                  obj.day = getDay(i)
                  obj.closed = item.closed==="false"?false:true
                  obj.slots = slots_arr
                  arr.push(obj)
            })
            this.setState({
              slots:arr,
              firstRender:false
            })
          }

          if(nextProps.reschedule_appointment_ret){
              if(nextProps.reschedule_appointment_ret.success){
                    let selected_bookings = [...this.state[this.state.reschedule_appointment.type]]
                    console.log(selected_bookings,"updated_arr updated_arr")
                    let  update_arr = selected_bookings.map((item)=>{
                        if(item._id===this.state.reschedule_appointment.reschedule_id){
                            return {
                                ...item,
                                appointmentTime:this.state.reschedule_appointment.appointmentTime
                            }
                        }else{
                            return item
                        }
                    })
                    this.setState({
                        [this.state.reschedule_appointment.type]:update_arr,
                        success_reschedule_id:this.state.reschedule_appointment.reschedule_id
                    })
              }else{
                
              }
          }
    }

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
              timestamp:new Date(2020, 1, 1, fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10) , parseInt(fromMinute,10) , 0 , 0).getTime()
            },
            to:{
              hour:toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10),
              minutes:parseInt(toMinutes,10),
              timestamp:new Date(2020, 1, 1,toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10) , parseInt(toMinutes,10) , 0 , 0).getTime()
            }
        }
           return obj
        }

    confirmBooking = (item,type) =>{
        if(item.bookingStatus==="Cancellation Requested"){
            this.setState({
                ret:{
                    success:false,
                    message:"User has requested cancellation on this appointment"
                }
            })
        }else{
            this.setState({
                selected_booking:item,
                confirm_modal_flag:true,
                selected_type:type,
                toType:'confirmed_bookings'
            })
        }
       
    }

    cancelBooking = (item,type) =>{
        if(item.bookingStatus==="Cancellation Requested"){
            this.setState({
                ret:{
                    success:false,
                    message:"User has requested cancellation on this appointment"
                }
            })
        }else{
        this.setState({
            selected_booking:item,
            cancel_modal_flag:true,
            selected_type:type,
            toType:'cancelled_bookings'
        })
    }
    }

    closeConfirmModal = () =>{
        this.setState({
            selected_booking:{},
            confirm_modal_flag:false,
            status_change_confirm:false
        })
    }

    closeCancelModal = () =>{
        this.setState({
            selected_booking:{},
            cancel_modal_flag:false,
            status_change_confirm:false
        })
    }

    getProgressbar = (item) =>{
        console.log(item.paidBookingAmount,item.totalAmount,"=======================>")
                  let totalAmount = item.totalAmount
                    let percent = 0
                    if(totalAmount===0){
                        percent = 100
                    }else {
                        percent = Math.floor((item.paidBookingAmount/item.totalAmount) * 100)
                    }
                     
        return  (<React.Fragment>   <div className="appointment-progress-wrapper u-margin-top-medium"> <InsightProgressBar
                      progress = {percent}
                      version = "payment"
                      data = {item}
                        />
                     </div>
                     </React.Fragment>)


    // return <ul className="list-unstyled multi-steps">
    //     {item.paymentProgress.map((payment,i)=>{
    //         if(i===0){
    //             return   <li className={!!payment.status?'active_ris ':'not_active_ris'}>Booked</li>
    //         }else if(i===(item.paymentProgress.length-1)){
    //             return <li className={!!payment.status?"not_active_ris":"not_active_ris not-paid_ris"} ><i className="fa fa-rupee-sign"></i>{payment.amount}</li>
    //         }else{
    //             return  <li className={!!payment.status?'not_active_ris':'not_active_ris not-paid_ris'} ><i className="fa fa-rupee-sign"></i>{payment.amount}</li>
    //         }
    //     })}
    //     </ul>
    }

    changeAppointClr = ()=>{
        let arr = []
            if(this.state.selected_type==="upcoming_bookings"){
                arr = [...this.state.upcoming_bookings]
            }else if(this.state.selected_type==="cancelled_bookings"){
                arr = [...this.state.cancelled_bookings]
            }else if(this.state.selected_type==="confirmed_bookings"){
                arr = [...this.state.confirmed_bookings ]
            }
            let newArr = arr.filter((item,i)=>item._id!==this.state.selected_booking._id)
            let toArr = []
            if(this.state.toType==="cancelled_bookings"){
                toArr = [...this.state.cancelled_bookings]
            }else if(this.state.toType==="confirmed_bookings"){
                toArr = [...this.state.confirmed_bookings]
            }
            toArr.unshift(this.state.selected_booking)
            this.setState({
                [this.state.selected_type]:newArr,
                [this.state.toType]:toArr,
                status_change_confirm:true
            },()=>{
                this.props.changeAppointClr()
            })
    }

    selected_callback = (value) =>{
        console.log(value,"value in selected_callback")
        this.setState({
            reschedule_selected:value
        })
    }

    reschedule_appointment = (data) =>{
        this.setState({
            reschedule_appointment:{
                type:data.bookingType,
                reschedule_id:data.params.bookingId,
                appointmentTime:data.body.appointmentTime
            }
        },()=>{
            this.props.reschedule_appointment(data)
        })
    }


    render() {
        console.log(this.props,"props in AppointmentLoading")
        console.log(this.state,"state in AppointmentLoading")
        let time_now = ((new Date()).getTime())
        if(!!this.state.get_bookings_loading){
           return   <div className='main_content_rish'>
           <LoaderComponent />
           {/* <MeasureTime  
                flag = {this.state.get_bookings_loading}
                /> */}
       </div>
        }
        return (
            <React.Fragment>
                <NewNotif
                    ret = {this.props.changeAppointRet}
                    retClr = {this.changeAppointClr}
                /> 
            <NewNotif
                    ret = {this.props.reschedule_appointment_ret}
                    retClr = {this.props.reschedule_appointment_clr}
                />
                 <NewNotif
                    ret = {this.state.ret}
                    retClr = {()=>this.setState({ret:false})}
                />
                <div className='transparent_main_content_rish'>
                    <div>
                         <div className={`appointment_header_wrapper new_card_class ${this.state.tabIndex===0?'border_radius_fix_right':this.state.tabIndex===2?'border_radius_fix_left':''}`}>
                             <span onClick = {() => this.setState({ tabIndex:0 })}  className={`appointment_header_child-1 ${this.state.tabIndex===0?'active_appointment_header':''}`}>
                                <text className='appointment_header_text'>UPCOMING</text>
                             </span>
                             <span onClick = {() => this.setState({ tabIndex:1 })}  className={`appointment_header_child-1 ${this.state.tabIndex===1?'active_appointment_header':''}`}>
                                 <text className='appointment_header_text'>CONFIRMED</text>
                            </span>                     
                            <span onClick = {() => this.setState({ tabIndex:2 })} className={`appointment_header_child-1 ${this.state.tabIndex===2?'active_appointment_header':''}`}>
                               <text className='appointment_header_text'>CANCELLED</text>
                            </span>
                         </div>
                         <div>
                             {this.state.tabIndex ===0 && <div>
                                {this.state.upcoming_bookings.length==0 && <div className='text-center no-appointment_ris' style={{position:'relative'}}>
                                        <h3>No  Appointments</h3>
                                        </div>}
                                    {this.state.upcoming_bookings.map((item,i)=>{
                                   return <React.Fragment>
                                       <div className='appointment_card_wrapper new_card_class'>
                                           <div className='appointment_card_profile'>
                                             <div className="appointment_card_profile_profile ">
                                                <div className="child-1">
                                                    <img  src={item.userImageUrl} className="appointment_user_img img-loading-small_rish" />
                                                </div>

                                                <div  className=' child-2'>
                                                    <text  className='appointment_text child-1 display_block'>{item.userName} {!!item.centerLocation?<text className="green_text_rish">{` ${item.centerLocation}`}</text>:''}</text>
                                                    <text className='appointment_text child-2 display_block'>{`Phone no: ${item.userMobileNumber}`}</text>
                                                    <span className="align-item-apart">
                                                    <text className='appointment_text'>{this.dateTimeObject(item.appointmentTime).fullDate}</text>
                                                    <text className='appointment_text' >{this.dateTimeObject(item.appointmentTime).time}</text>
                                                    </span>
                                                </div> 
                                              </div>

                                          <div style={{width:'70%', opacity:'0.8'}}>
                                                <text className='appointment_text' >{item.professionalAddress}</text>
                                              </div>


                                                {item.haveInsurance && <div className="insurance-wrap-new" >
                                                    <div className="insurance-details">
                                                        <span className="child-1">
                                                            Please make sure policy is not expired
                                                        </span>
                                                        <span className="child-2">
                                                              {item.insuranceDetails.insurancePartner}
                                                        </span>
                                                        <hr />
                                                    </div>
                                                    <div className="insurance-details">
                                                        <span className="child-1">
                                                            Policy Number
                                                        </span>
                                                        <span className="child-2">
                                                              {item.insuranceDetails.policyNumber}
                                                        </span>
                                                        <hr />
                                                    </div>
                                                   <div className="insurance-wrap-new-2">
                                                   <div className="appointment-insurance-wrap">
                                                        <span>Insurance Card</span>
                                                      <div className="photo-gallery-wrapper">
                                                        {console.log(item.insuranceDetails, "WTF")}
                                                          <PhotoGallery id={`upcomming_booking-${i}`} data={item.insuranceDetails.insuranceCard} />
                                                      </div>
                                                    </div>
                                                    <div className="appointment-insurance-wrap">
                                                        <span>Insurance Document</span>
                                                      <div className="photo-gallery-wrapper">
                                                          {/* <PdfSection data={[{
                                                              reportUrl:item.insuranceDetails.insurancePolicy
                                                          }]} /> */}
                                                         <a
                                                            href={item.insuranceDetails.insurancePolicy}
                                                            target="_blank"
                                                        ><img src='https://cdn-icons-png.flaticon.com/512/32/32329.png' className="insurance-document" /></a>
                                                      </div>
                                                    </div>
                                                </div>

                                                    </div>}
                                            </div>
                                           <div className='appointment_card_data'>
                                           { (time_now<item.appointmentTime )   &&  <div className="row confrm_mar_sec">
                                                <div className="col-lg-2">
                                                    <p className="gr_con underline"><text onClick={()=>this.confirmBooking(item,"upcoming_bookings","confirmed_bookings")}>Confirm</text></p>
                                                </div>
                                                <div className="col-lg-8">
                                                <RescheduleComponent
                                                reschedule_appointment = {this.reschedule_appointment}
                                                value = {item}
                                                success_reschedule_id = {this.state.success_reschedule_id}
                                                remove_success_id = {()=>this.setState({success_reschedule_id:false})}
                                                slots = {this.state.slots}
                                                selected_callback = {this.selected_callback}
                                                defaultValue = {this.state.defaultDate}
                                                type="upcoming_bookings"
                                                />
                                                </div>
                                                <div className="col-lg-2">
                                                <p className="con_re underline"><text onClick={()=>this.cancelBooking(item,"upcoming_bookings","cancelled_bookings")}>Cancel</text></p>
                                                </div>
                                                </div>
                                                }

                                  {/* 2nd--end */}
                                  <div className="row confrm_mar_sec">
                                <div className="col-lg-6">
                                    <p className="brace_m">{item.serviceName}</p>
                                 </div>
                                 <div className="col-lg-6">
                                    <p className="dental_th"><i class="fa fa-rupee-sign"></i>{item.totalAmount}</p>
                                 </div>
                                </div>
                                {/* 3rd--end */}
                                <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                                {this.getProgressbar(item)}                        
                                    <div className="two_chil">
                                 <p className="pay_ptint">Payments done by patient</p>
                                 </div>
                                           </div>
                                       </div>
                                   </React.Fragment>
                               })} 
                                  <div style={{cursor:'pointer'}} onClick={()=>this.setState({modalIsOpen:true})}  className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>
                                 </div>}
                         
                              {this.state.tabIndex===1 && <div>
                                {this.state.confirmed_bookings.length==0 && <div className='text-center no-appointment_ris' style={{position:'relative'}}>
                                        <h3>No  Appointments</h3>
                                        </div>}
                                    {this.state.confirmed_bookings.map((item,i)=>{
                                   return <React.Fragment>
                                       <div className='appointment_card_wrapper new_card_class'>
                                       <div className='appointment_card_profile'>
                                             <div className="appointment_card_profile_profile ">
                                                <div className="child-1">
                                                    <img  src={item.userImageUrl} className="appointment_user_img img-loading-small_rish" />
                                                </div>

                                                <div  className=' child-2'>
                                                    <text  className='appointment_text child-1 display_block'>{item.userName} {!!item.centerLocation?<text className="green_text_rish">{` ${item.centerLocation}`}</text>:''}</text>
                                                    <text className='appointment_text child-2 display_block'>{`Phone no: ${item.userMobileNumber}`}</text>
                                                    <span className="align-item-apart">
                                                    <text className='appointment_text'>{this.dateTimeObject(item.appointmentTime).fullDate}</text>
                                                    <text className='appointment_text' >{this.dateTimeObject(item.appointmentTime).time}</text>
                                                    </span>
                                                </div> 
                                              </div>

                                          <div style={{width:'70%', opacity:'0.8'}}>
                                                <text className='appointment_text' >{item.professionalAddress}</text>
                                              </div>

                                              
                                                {item.haveInsurance && <div className="insurance-wrap-new" >
                                                    <div className="insurance-details">
                                                        <span className="child-1">
                                                            Please make sure policy is not expired
                                                        </span>
                                                        <span className="child-2">
                                                              {item.insuranceDetails.insurancePartner}
                                                        </span>
                                                        <hr />
                                                    </div>
                                                    <div className="insurance-details">
                                                        <span className="child-1">
                                                            Policy Number
                                                        </span>
                                                        <span className="child-2">
                                                        {item.insuranceDetails.policyNumber}
                                                        </span>
                                                        <hr />
                                                    </div>
                                                   <div className="insurance-wrap-new-2">
                                                   <div className="appointment-insurance-wrap">
                                                        <span>Insurance Card</span>
                                                      <div className="photo-gallery-wrapper">
                                                          <PhotoGallery  id={`confirmed_booking-${i}`} data={item.insuranceDetails.insuranceCard} />
                                                      </div>
                                                    </div>
                                                    <div className="appointment-insurance-wrap">
                                                        <span>Insurance Document</span>
                                                      <div className="photo-gallery-wrapper">
                                                          {/* <PdfSection data={[{
                                                              reportUrl:item.insuranceDetails.insurancePolicy
                                                          }]} /> */}
                                                         <a
                                                            href={item.insuranceDetails.insurancePolicy}
                                                            target="_blank"
                                                        ><img src='https://cdn-icons-png.flaticon.com/512/32/32329.png' className="insurance-document" /></a>
                                                      </div>
                                                    </div>
                                                </div>

                                                    </div>}
                                            </div>
                                           <div className='appointment_card_data'>

                                           {(((item.bookingStatus!=="Confirmed") || (item.doctorConfirmation!==true))) &&
                                           <div className=" u-margin-top-small text-center">
                                              <text className=" confrm_mar_sec bold-text"> No Action (Doctor confirmation pending)</text> </div>}
                                           {  (time_now < item.appointmentTime) && <div className="row confrm_mar_sec">
                                <div className="col-lg-2">
                                    <p className="gr_con ">
                                        {((item.bookingStatus !=="Confirmed") || (item.doctorConfirmation!==true))?
                                              <text onClick={()=>this.confirmBooking(item,"upcoming_bookings","confirmed_bookings")}>Confirm (Doctor confirmation pending)</text>
                                        :<text>Confirmed</text>}
                                       </p>
                                 </div>
                                 <div className="col-lg-8">
                                 <RescheduleComponent
                                 reschedule_appointment = {this.reschedule_appointment}
                                 value = {item}
                                 success_reschedule_id = {this.state.success_reschedule_id}
                                 slots = {this.state.slots}
                                 selected_callback = {this.selected_callback}
                                 defaultValue = {this.state.defaultDate}
                                 remove_success_id = {()=>this.setState({success_reschedule_id:false})}
                                 type="confirmed_bookings"
                                />
                                 </div>
                                 <div className="col-lg-2">
                                 <p className="con_re underline"><text onClick={()=>this.cancelBooking(item,'confirmed_bookings','cancelled_bookings')}>Cancel</text></p>
                                 </div>
                                </div>}

                                  {/* 2nd--end */}
                                  <div className="row confrm_mar_sec">
                                <div className="col-lg-6">
                                    <p className="brace_m">{item.serviceName}</p>
                                 </div>
                                 <div className="col-lg-6">
                                    <p className="dental_th"><i class="fa fa-rupee-sign"></i>{item.totalAmount}</p>
                                 </div>
                                </div>
                                {/* 3rd--end */}
                                <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                                {this.getProgressbar(item)}                        
                                    <div className="two_chil">
                                 <p className="pay_ptint">Payments done by patient</p>
                                 </div>
                                           </div>
                                       </div>
                                   </React.Fragment>
                               })} 
                                  <div style={{cursor:'pointer'}} onClick={()=>this.setState({modalIsOpen:true})}  className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>
                                  </div>}
                         
                         </div>

                               
                         {this.state.tabIndex===2 && <div>
                                {this.state.cancelled_bookings.length==0 && <div className='text-center no-appointment_ris' style={{position:'relative'}}>
                                        <h3>No  Appointments</h3>
                                        </div>}
                                    {this.state.cancelled_bookings.map((item,i)=>{
                                   return <React.Fragment>
                                       <div className='appointment_card_wrapper new_card_class'>
                                           <div className='appointment_card_profile'>
                                             <div className="appointment_card_profile_profile ">
                                                <div className="child-1">
                                                    <img  src={item.userImageUrl} className="appointment_user_img img-loading-small_rish" />
                                                </div>

                                                <div  className=' child-2'>
                                                    <text  className='appointment_text child-1 display_block'>{item.userName} {!!item.centerLocation?<text className="green_text_rish">{` ${item.centerLocation}`}</text>:''}</text>
                                                    <text className='appointment_text child-2 display_block'>{`Phone no: ${item.userMobileNumber}`}</text>
                                                    <span className="align-item-apart">
                                                    <text className='appointment_text'>{this.dateTimeObject(item.appointmentTime).fullDate}</text>
                                                    <text className='appointment_text' >{this.dateTimeObject(item.appointmentTime).time}</text>
                                                    </span>
                                                </div> 
                                              </div>

                                              <div style={{width:'70%', opacity:'0.8'}}>
                                                <text className='appointment_text' >{item.professionalAddress}</text>
                                              </div>

                                                {item.haveInsurance && <div className="insurance-wrap-new" >
                                                    <div className="insurance-details">
                                                        <span className="child-1">
                                                            Please make sure policy is not expired
                                                        </span>
                                                        <span className="child-2">
                                                              {item.insuranceDetails.insurancePartner}
                                                        </span>
                                                        <hr />
                                                    </div>
                                                    <div className="insurance-details">
                                                        <span className="child-1">
                                                            Policy Number
                                                        </span>
                                                        <span className="child-2">
                                                              {item.insuranceDetails.policyNumber}
                                                        </span>
                                                        <hr />
                                                    </div>
                                                   <div className="insurance-wrap-new-2">
                                                   <div className="appointment-insurance-wrap">
                                                        <span>Insurance Card</span>
                                                      <div className="photo-gallery-wrapper">
                                                          <PhotoGallery  id={`cancelled_booking-${i}`} data={item.insuranceDetails.insuranceCard} />
                                                      </div>
                                                    </div>
                                                    <div className="appointment-insurance-wrap">
                                                        <span>Insurance Document</span>
                                                      <div className="photo-gallery-wrapper">
                                                          {/* <PdfSection data={[{
                                                              reportUrl:item.insuranceDetails.insurancePolicy
                                                          }]} /> */}
                                                         <a
                                                            href={item.insuranceDetails.insurancePolicy}
                                                            target="_blank"
                                                        ><img src='https://cdn-icons-png.flaticon.com/512/32/32329.png' className="insurance-document" /></a>
                                                      </div>
                                                    </div>
                                                </div>

                                                    </div>}
                                            </div>
                                           <div className='appointment_card_data'>
                                           { (time_now<item.appointmentTime)   &&  <div className="row confrm_mar_sec">
                                                    <div className="col-lg-2">
                                                        <p className="gr_con "><text></text></p>
                                                        {/* <p className="gr_con "><text>Confirm</text></p> */}
                                                    </div>
                                                    <div className="col-lg-8">
                                                    <RescheduleComponent
                                                    reschedule_appointment = {this.reschedule_appointment}
                                                    value = {item}
                                                    success_reschedule_id = {this.state.success_reschedule_id}
                                                    slots = {this.state.slots}
                                                    selected_callback = {this.selected_callback}
                                                    defaultValue = {this.state.defaultDate}
                                                    remove_success_id = {()=>this.setState({success_reschedule_id:false})}
                                                    type="cancelled_bookings"
                                                    />
                                                    </div>
                                                    <div className="col-lg-2">
                                                    <p className="con_re "><text></text></p>
                                                    {/* <p className="con_re "><text>Cancelled</text></p> */}
                                                    </div>
                                                    </div>}
                                
                                  <div className="row confrm_mar_sec">
                                <div className="col-lg-6">
                                    <p className="brace_m">{item.serviceName}</p>
                                 </div>
                                 <div className="col-lg-6">
                                    <p className="dental_th"><i class="fa fa-rupee-sign"></i>{item.totalAmount}</p>
                                 </div>
                                </div>
                                {/* 3rd--end */}
                                <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                                {this.getProgressbar(item)}                        
                                    <div className="two_chil">
                                 <p className="pay_ptint">Payments done by patient</p>
                                 </div>
                                           </div>
                                       </div>
                                   </React.Fragment>
                               })} 
                                  <div style={{cursor:'pointer'}} onClick={()=>this.setState({modalIsOpen:true})}  className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>
                                  </div>}      
                            <Modal
                            isOpen={this.state.confirm_modal_flag}
                            onAfterOpen={()=>console.log("On After modall gets called")}
                            onRequestClose={this.closeConfirmModal}
                            style={customStyles}
                            ariaHideApp={false}
                            contentLabel="Example Modal" className='redeemModal modal_pdd'>
                            <div className='text-right'><button type='button' onClick={this.closeConfirmModal} className='redeemCross'><img src="/cross.jpg" alt="" style={{ width: "65%" }}></img></button></div>
                        <h4 className="update_price" ref={subtitle => this.subtitle = subtitle}>{this.state.status_change_confirm?<b style={{margin:'.5rem'}}>Appointment has been <br></br>successfully confirmed</b>:
                            <b>Confirm Appointment for <br></br>Patient</b>
                        }</h4>
                            <div>
                            {/* <div style={{position:'relative'}}>
                            {true && <LoaderComponent />}  
                            </div> */}
                      {!this.state.status_change_confirm && <div className="time_clo my_avl text-center">
                             <button onClick={()=>this.conformBooking()} className="common-button">Yes</button>
                             <button onClick={()=>this.closeConfirmModal()} className="common-button-white  ml-5">No</button>
                      </div>}
                           </div>    
                         </Modal>        
                         <Modal
                            isOpen={this.state.cancel_modal_flag}
                            onAfterOpen={()=>console.log("On After modall gets called")}
                            onRequestClose={this.closeCancelModal}
                            style={customStyles}
                            ariaHideApp={false}
                            contentLabel="Example Modal" className='redeemModal modal_pdd'>
                            <div className='text-right'><button type='button' onClick={this.closeCancelModal} className='redeemCross'><img src="/cross.jpg" alt="" style={{ width: "65%" }}></img></button></div>
                        <h4 className="update_price" ref={subtitle => this.subtitle = subtitle}>{this.state.status_change_confirm?<b style={{margin:'.5rem'}}>Appointment has been <br></br>successfully Cancelled</b>:
                            <b>Cancel Appointment for <br></br>Patient</b>
                        }</h4>
                            <div>
                            {/* <div style={{position:'relative'}}>
                            {true && <LoaderComponent />}  
                            </div> */}
                      {!this.state.status_change_confirm && <div className="time_clo my_avl text-center">
                             <button onClick={()=>this.cancellAppointmentSubmit()} className="common-button">Yes</button>
                             <button onClick={()=>this.closeCancelModal()} className="common-button-white  ml-5">No</button>
                      </div>}
                           </div>    
                         </Modal>    
       <Modal
          isOpen={this.state.modalIsOpen}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        //   contentLabel="Example Modal"
       >
        <div className="text-right"><button onClick={this.closeModal} className="cross"><img src="/cross.jpg" alt="" className="covidCross"></img></button></div>
        <div className="text-center"><h4><b>Tips for more Conversions</b></h4></div><br></br>
        <div className='row tipsrow'>
              <div className='col-md-2 vertical_center_ris'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10 vertical_center_ris'><b>Call up the Patients</b></div>     
        </div>
        <div className='row tipsrow'>
              <div className='col-md-2 vertical_center_ris_r'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10 vertical_center_ris'><b>Make them Comfortable</b></div>     
        </div>
        <div className='row tipsrow'>
              <div className='col-md-2 vertical_center_ris'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10 vertical_center_ris'><b>Please respect the time of patients as they care about it most</b></div>     
        </div>
        <div className='row tipsrow'>
              <div className='col-md-2'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10 vertical_center_ris'><b>Introduce proper communication with Patients</b></div>     
        </div>
         
        </Modal>
        </div>
                </div>
                <div className='col-md-3'></div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => ({
    bookings: state.user.bookingData,
    getBookingRet:state.user.getBookingRet,
    changeAppointRet:state.user.changeAppointRet,
    timeSlot : state.user.timeSlot,
    reschedule_appointment_ret:state.user.reschedule_appointment_ret,
    notif_id:state.user.notif_id
})

    
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
  })(connect(mapStateToProps, {
    getBooking, 
    getBookingClr, 
    changeAppoint, 
    changeAppointClr,
    reschedule_appointment,
    reschedule_appointment_clr,
    set_notif_id,
    getTimeslot })(AppointmentComponent))

