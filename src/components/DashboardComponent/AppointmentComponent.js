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
            cancelled_booking:[],
            confirmed_booking:[],
            get_bookings_loading:false
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal =  this.closeModal.bind(this);
    }
     componentDidMount(){
      this.setState({
        get_bookings_loading:true
      },()=>this.props.getBooking())
      
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
        console.log(date,"date in dateTimeObject")
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
               let confirmed_booking = []
               let cancelled_booking = []
               let upcoming_bookings = []

               nextProps.getBookingRet.data.forEach(data =>{
                   if(data.bookingStatus==="Confirmed"){
                       confirmed_booking.push(data)
                   }else if(data.bookingStatus==="Cancelled"){
                       cancelled_booking.push(data)
                   }else{
                       upcoming_bookings.push(data)
                   }
               })
               this.setState({
                confirmed_booking:confirmed_booking,
                cancelled_booking:cancelled_booking,
                upcoming_bookings:upcoming_bookings,
                get_bookings_loading:false
               })
            }else{
                this.setState({
                    confirmed_booking:[],
                    cancelled_booking:[],
                    upcoming_bookings:[]
                })
            }
            nextProps.getBookingClr()
        }
    }

    confirmBooking = (item) =>{
        this.setState({
            selected_booking:item,
            confirm_modal_flag:true
        })
    }

    cancelBooking = (item) =>{
        this.setState({
            selected_booking:item,
            cancel_modal_flag:true
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
        console.log(item,'item in getProgressbar')
        if(false){
            return  <React.Fragment>
            <div className="prog col-lg-12">
          <ul class="progressbar">
                     <li class="active bokd">Booked</li><span className="sispan">100</span>
                     <li className="ten"><span>{(item.paidAmmount)*0.5}</span></li>
                     <li className="thirtyp active">{item.totalAmount}</li>
             </ul>
           </div>
          </React.Fragment>
        }else{
            return   <React.Fragment>
             <div className="prog col-lg-12">
          <ul class="progressbar">
                     <li class="active bokd">Booked</li><span className="sispan">100</span>
                     <li className="ten active"><span>{item.paidAmmount}</span></li>
                     <li className="thirtyp ">{item.totalAmount}</li>
             </ul>
           </div>
        </React.Fragment>
        }
    }

    changeAppointClr = ()=>{
        if(this.props.changeAppointRet.type==="confirming"){
                console.log("Iniside conforming clear in ChangeAppoint Clear")
                this.props.changeAppointClr()
               this.setState({
                    status_change_confirm:true
               })
        }else{
            console.log("Iniside CancelClear clear in Other Clear")
            this.props.changeAppointClr()
           this.setState({
                status_change_confirm:true
           })
        }
    }


    render() {
        // console.log(this.props,"this.props in Appointments")
        // console.log(this.props.bookings, 'bookings');
        console.log(this.state,"this.state in AppointmentComponent")
        if(!!this.state.get_bookings_loading){
           return   <div className='col-md-8'>
           <div className="Appoint AllComponents">
             <div style={{position:'relative', width:'100%',height:'100%'}}>
           <LoaderComponent />
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
                <div className='col-md-8'>
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
                                   console.log(item,"item in Appointments")
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
                                    <p className="gr_con underline"><text onClick={()=>this.confirmBooking(item)}>Confirm</text></p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle underline">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re underline"><text onClick={()=>this.cancelBooking(item)}>Cancel</text></p>
                                 </div>
                                </div>
                                {/* 2nd--end */}
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-6">
                                    <p className="brace_m">{item.serviceName}</p>
                                 </div>
                                 <div className="col-lg-6">
                                    <p className="dental_th">{item.totalAmount}</p>
                                 </div>
                                </div>
                                {/* 3rd--end */}
                                <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                                {this.getProgressbar(item)}                        
                                    <div className="two_chil">
                                 <p className="pay_ptint">Payments done by patient</p>
                                 <p className="pay_green">Create Prescription</p>
                                 </div>
                                   </React.Fragment>
                               })} 
                                </TabPanel>
                                <TabPanel className="ardee_ci">
                                    {this.state.confirmed_booking.map((item,i)=>{
                                        console.log(item,"item in Appointments in confirmed")
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
                                    <p className="gr_con underline"><text onClick={()=>this.confirmBooking(item)}>Confirm</text></p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle underline">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re underline"><text onClick={()=>this.cancelBooking(item)}>Cancel</text></p>
                                 </div>
                                </div>
                                {/* 2nd--end */}
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-6">
                                    <p className="brace_m">{item.serviceName}</p>
                                 </div>
                                 <div className="col-lg-6">
                                    <p className="dental_th">{item.totalAmount}</p>
                                 </div>
                                </div>
                                {/* 3rd--end */}
                                <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                                {this.getProgressbar(item)}                        
                                    <div className="two_chil">
                                 <p className="pay_ptint">Payments done by patient</p>
                                 <p className="pay_green">Create Prescription</p>
                                 </div>
                                   </React.Fragment>
                               })} 
                               <div className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>
                                </TabPanel>
                                <TabPanel className="ardee_ci">
                                {this.state.cancelled_booking.map((item,i)=>{
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
                                    <p className="gr_con underline"><text onClick={()=>this.confirmBooking(item)}>Confirm</text></p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle underline">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re underline"><text onClick={()=>this.cancelBooking(item)}>Cancel</text></p>
                                 </div>
                          </div>
                          {/* 2nd--end */}
                          <div className="row confrm_mar_sec">
                          <div className="col-lg-6">
                              <p className="brace_m">{item.serviceName}</p>
                           </div>
                           <div className="col-lg-6">
                              <p className="dental_th">{item.totalAmount}</p>
                           </div>
                          </div>
                          {/* 3rd--end */}
                          <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                          {this.getProgressbar(item)}                        
                              <div className="two_chil">
                           <p className="pay_ptint">Payments done by patient</p>
                           <p className="pay_green">Create Prescription</p>
                           </div>
                             </React.Fragment>
                         })}                      
                                 <div className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>       
                                                           
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
              <div className='col-md-2'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10'><b>Call up the Patients</b></div>     
        </div>
        <div className='row tipsrow'>
              <div className='col-md-2'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10'><b>Make them Comfortable</b></div>     
        </div>
        <div className='row tipsrow'>
              <div className='col-md-2'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10'><b>Please respect the time of patients as they care about it most</b></div>     
        </div>
        <div className='row tipsrow'>
              <div className='col-md-2'><img src="/smallIdea.svg" alt=""></img></div> 
              <div className='col-md-10'><b>Introduce proper communication with Patients</b></div>     
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

