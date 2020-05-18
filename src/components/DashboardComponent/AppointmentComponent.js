import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { getBooking, getBookingClr, changeAppoint, changeAppointClr } from '../../actions/userActions'
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import  "./AvailabilityComponent.css";
import "./appointment.css"
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NotifFunc from '../functional/NotifFunc';
import LoaderComponent from "../functional/LoaderComponent"
import MeasureTime from "../MeasureTime"
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
            get_bookings_loading:false
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal =  this.closeModal.bind(this);
    }
     componentDidMount(){
      this.setState({
        get_bookings_loading:true
      },()=>{
        this.props.getBooking()
        time_flag =true
      })
      
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
            time: `${date.getHours()>9?date.getHours():"0"+date.getHours()}:${date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()} ${date.getHours()>12?"PM":'AM'}`,
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
               let confirmed_bookings = []
               let cancelled_bookings = []
               let upcoming_bookings = []
               nextProps.getBookingRet.data.forEach(data =>{
                   if((data.bookingStatus==="Confirmed") && (data.doctorConfirmation===true) ){
                       confirmed_bookings.push(data)
                   }else if(data.bookingStatus==="Cancelled"){
                       cancelled_bookings.push(data)
                   }else{
                       upcoming_bookings.push(data)
                   }
               })
               this.setState({
                confirmed_bookings:confirmed_bookings,
                cancelled_bookings:cancelled_bookings,
                upcoming_bookings:upcoming_bookings,
                get_bookings_loading:false
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
    }

    confirmBooking = (item,type) =>{
        this.setState({
            selected_booking:item,
            confirm_modal_flag:true,
            selected_type:type,
            toType:'confirmed_bookings'
        })
    }

    cancelBooking = (item,type) =>{
        this.setState({
            selected_booking:item,
            cancel_modal_flag:true,
            selected_type:type,
            toType:'cancelled_bookings'
        })
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
        if(item.paidAmount===0){
            return   <React.Fragment>
            <ul className="list-unstyled multi-steps">
                <li className="not_active_ris">Booked</li>
                <li className="not_active_ris not-paid_ris" ><i className="fa fa-rupee-sign"></i>{item.totalAmount}</li>
           </ul>
        </React.Fragment>
        }
       else if(item.paidAmount<item.totalAmount){
        return  <React.Fragment>
        <ul className="list-unstyled multi-steps">
            <li className="active_ris">Booked</li>
            <li className="not_active_ris" ><i className="fa fa-rupee-sign"></i>{item.paidAmount}</li>
            <li className="not_active_ris" ><i className="fa fa-rupee-sign"></i>{item.totalAmount}</li>
       </ul>
      </React.Fragment>
    }else if(item.paidAmmount===item.totalAmount){
        <ul className="list-unstyled multi-steps">
                <li className="active_ris">Booked</li>
                <li className="not_active_ris" ><i className="fa fa-rupee-sign"></i>{item.totalAmount}</li>
           </ul>
    }
    }

    changeAppointClr = ()=>{
        let arr = []
            if(this.state.selected_type==="upcoming_bookings"){
                arr = JSON.parse(JSON.stringify(this.state.upcoming_bookings))
            }else if(this.state.selected_type==="cancelled_bookings"){
                arr = JSON.parse(JSON.stringify(this.state.cancelled_bookings))
            }else if(this.state.selected_type==="confirmed_bookings"){
                arr = JSON.parse(JSON.stringify(this.state.confirmed_bookings))
            }
            let newArr = arr.filter((item,i)=>item._id!==this.state.selected_booking._id)
            let toArr = []
            if(this.state.toType==="cancelled_bookings"){
                toArr = JSON.parse(JSON.stringify(this.state.cancelled_bookings))
            }else if(this.state.toType==="confirmed_bookings"){
                toArr = JSON.parse(JSON.stringify(this.state.confirmed_bookings))
            }
            toArr.push(this.state.selected_booking)
            this.setState({
                [this.state.selected_type]:newArr,
                [this.state.toType]:toArr,
                status_change_confirm:true
            },()=>{
                this.props.changeAppointClr()
            })
    }


    render() {
        // console.log(this.state,"this.state in AppointmentComponent")
        console.log(time_flag,"time_flag in render")
        console.log(this.state.get_bookings_loading,"this.state.getBookings loading in appointment")
        if(!!this.state.get_bookings_loading){
           return   <div className='col-md-8'>
           <div className="Appoint AllComponents">
             <div style={{position:'relative', width:'100%',height:'100%'}}>
           <LoaderComponent />
           {/* <MeasureTime  
                flag = {this.state.get_bookings_loading}
                /> */}
       </div>
       </div>
       </div>
        }
        return (
            <React.Fragment>
               

               
                <NotifFunc
                    ret = {this.props.changeAppointRet}
                    retClr = {this.changeAppointClr}
                />
                <div className='col-md-8 col-xl-9'>
                    <div className="Appoint AllComponents">
                        <div className="AppointBodyrow1">Appointments</div>
                        
                            <Tabs className="tab_pd">
                                <TabList>
                                <div className="row upcmg_fnt">
                                <Tab className="col-lg-4"><a href="#">Upcoming</a></Tab>
                                <Tab className="col-lg-4"><a href="#">Confirmed</a></Tab>
                                <Tab className="col-lg-4"><a href="#">Cancelled</a></Tab>
                                </div>
                               
                                </TabList>
                              <div className="upcoming_bdr"></div>
                                <TabPanel className="ardee_ci">
                               {this.state.upcoming_bookings.map((item,i)=>{
                                   return <React.Fragment>
                                        <div className="row">
                                  <div className="col-lg-3 nov_2">
                                      <h4>{this.dateTimeObject(item.appointmentTime).monthAndDate}</h4>
                                    <p>{this.dateTimeObject(item.appointmentTime).fullDate}<br/>{this.dateTimeObject(item.appointmentTime).time}</p>
                                      </div>
                                              <div className="col-lg-2">
                                                  <img  src={item.professionalImageUrl} className="frame_de" />
                                                  </div>
                                                  <div className="col-lg-4 nov_2">
                                                  <h4>{item.userName}</h4>
                                                  <p>{`Phone no: ${item.userMobileNumber}`}</p>
                                                  <p>{item.professionalAddress}</p>
                                                </div> 
                                      <div className="col-lg-2 loc_tab">
                                    <div className="round-image">
                                      <img src={item.userImageUrl} className="rund_im"/>
                                      </div>
                                     </div>
                                </div>
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-4">
                                    <p className="gr_con underline"><text onClick={()=>this.confirmBooking(item,"upcoming_bookings","confirmed_bookings")}>Confirm</text></p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle underline">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re underline"><text onClick={()=>this.cancelBooking(item,"upcoming_bookings","cancelled_bookings")}>Cancel</text></p>
                                 </div>
                                </div>
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
                                 {/* <p className="pay_green">Create Prescription</p> */}
                                 </div>
                                 <hr className="appoint-hr_ris"/>
                                   </React.Fragment>
                               })}
                                </TabPanel>
                                <TabPanel className="ardee_ci">
                                    {this.state.confirmed_bookings.map((item,i)=>{
                                   return <React.Fragment>
                                        <div className="row">
                                        <div className="col-lg-3 nov_2">
                                      <h4>{this.dateTimeObject(item.appointmentTime).monthAndDate}</h4>
                                    <p>{this.dateTimeObject(item.appointmentTime).fullDate}<br/>{this.dateTimeObject(item.appointmentTime).time}</p>
                                      </div>
                                              <div className="col-lg-2">
                                                  <img  src={item.professionalImageUrl} className="frame_de" />
                                                  </div>
                                                  <div className="col-lg-4 nov_2">
                                                  <h4>{item.userName}</h4>
                                                  <p>{`Phone no: ${item.userMobileNumber}`}</p>
                                                  <p>{item.professionalAddress}</p>
                                                </div> 
                                      <div className="col-lg-2 loc_tab">
                                    <div className="round-image">
                                      <img src={item.userImageUrl} className="rund_im"/>
                                      </div>
                                     </div>
                                </div>
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-4">
                                    <p className="gr_con "><text>Confirmed</text></p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle ">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re underline"><text onClick={()=>this.cancelBooking(item,'confirmed_bookings','cancelled_bookings')}>Cancel</text></p>
                                 </div>
                                </div>
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
                                 {/* <p className="pay_green">Create Prescription</p> */}
                                 </div>
                                 <hr className="appoint-hr_ris"/>
                                   </React.Fragment>
                               })} 
                               <div style={{cursor:'pointer'}} onClick={()=>this.setState({modalIsOpen:true})}  className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>
                                </TabPanel>
                                <TabPanel className="ardee_ci">
                                {this.state.cancelled_bookings.map((item,i)=>{
                                  return <React.Fragment>
                                  <div className="row">
                                  <div className="col-lg-3 nov_2">
                                      <h4>{this.dateTimeObject(item.appointmentTime).monthAndDate}</h4>
                                    <p>{this.dateTimeObject(item.appointmentTime).fullDate}<br/>{this.dateTimeObject(item.appointmentTime).time}</p>
                                      </div>
                                        <div className="col-lg-2">
                                            <img  src={item.professionalImageUrl} className="frame_de" />
                                            </div>
                                            <div className="col-lg-4 nov_2">
                                            <h4>{item.userName}</h4>
                                            <p>{`Phone no: ${item.userMobileNumber}`}</p>
                                            <p>{item.professionalAddress}</p>
                                          </div> 
                                <div className="col-lg-2 loc_tab">
                              <div className="round-image">
                                <img src={item.userImageUrl} className="rund_im"/>
                                </div>
                               </div>
                          </div>
                          <div className="row confrm_mar_sec">
                                <div className="col-lg-4">
                                    <p className="gr_con "><text>Confirm</text></p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle ">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re "><text>Cancelled</text></p>
                                 </div>
                          </div>
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
                           {/* <p className="pay_green">Create Prescription</p> */}
                           </div>
                           <hr className="appoint-hr_ris"/>
                             </React.Fragment>
                         })}                      
                                 <div style={{cursor:'pointer'}} onClick={()=>this.setState({modalIsOpen:true})} className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>       
                                                           
                                 </TabPanel>
                                
                               
                            </Tabs>

                            <Modal
                            isOpen={this.state.confirm_modal_flag}
                            onAfterOpen={()=>console.log("On After modall gets called")}
                            onRequestClose={this.closeConfirmModal}
                            style={customStyles}
                            ariaHideApp={false}
                            contentLabel="Example Modal" className='redeemModal modal_pdd'>
                            <div className='text-right'><button type='button' onClick={this.closeConfirmModal} className='redeemCross'><img src="/cross.png" alt="" style={{ width: "65%" }}></img></button></div>
                        <h4 className="update_price" ref={subtitle => this.subtitle = subtitle}>{this.state.status_change_confirm?<b style={{margin:'.5rem'}}>Appointment has been <br></br>successfully confirmed</b>:
                            <b>Confirm Appointment for <br></br>Patient</b>
                        }</h4>
                            <div>
                            {/* <div style={{position:'relative'}}>
                            {true && <LoaderComponent />}  
                            </div> */}
                      {!this.state.status_change_confirm && <div className="time_clo my_avl text-center">
                             <button onClick={()=>this.conformBooking()} className="common-button">Yes</button>
                             <button onClick={()=>this. this.closeConfirmModal()} className="common-button-white  ml-5">No</button>
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
                            <div className='text-right'><button type='button' onClick={this.closeCancelModal} className='redeemCross'><img src="/cross.png" alt="" style={{ width: "65%" }}></img></button></div>
                        <h4 className="update_price" ref={subtitle => this.subtitle = subtitle}>{this.state.status_change_confirm?<b style={{margin:'.5rem'}}>Appointment has been <br></br>successfully Cancelled</b>:
                            <b>Cancel Appointment for <br></br>Patient</b>
                        }</h4>
                            <div>
                            {/* <div style={{position:'relative'}}>
                            {true && <LoaderComponent />}  
                            </div> */}
                      {!this.state.status_change_confirm && <div className="time_clo my_avl text-center">
                             <button onClick={()=>this.cancellAppointmentSubmit()} className="common-button">Yes</button>
                             <button onClick={()=>this. this.closeCancelModal()} className="common-button-white  ml-5">No</button>
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
        <div className="text-right"><button onClick={this.closeModal} className="cross"><img src="/cross.png" alt="" className="covidCross"></img></button></div>
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
    changeAppointRet:state.user.changeAppointRet
})

export default connect(mapStateToProps, {getBooking, getBookingClr, changeAppoint, changeAppointClr })(AppointmentComponent);

