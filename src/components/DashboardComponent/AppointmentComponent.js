import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { getBooking, getBookingClr } from '../../actions/userActions'
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import  "./AvailabilityComponent.css";
import "./appointment.css"
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class AppointmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen : false,
            upcoming_bookings:[],
            cancelled_booking:[],
            confirmed_booking:[]
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal =  this.closeModal.bind(this);
    }
    async componentDidMount(){
     await this.props.getBooking();
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
                upcoming_bookings:upcoming_bookings
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


    render() {
        // console.log(this.props,"this.props in Appointments")
        // console.log(this.props.bookings, 'bookings');
        console.log(this.state,"this.state in AppointmentComponent")
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
                    <div className="Appoint AllComponents">
                        <div className="AppointBodyrow1">Appointments</div>
                                {/* {
                                    this.props.bookings  ? this.props.bookings.map((b, index)=>(
                                    <div className="AppointBody" key = {index}>
                                        <div className='row AppointBodyrow2'>
                                            <div className='col-sm-3'>
                                              
                                                <div className="AppointNameBold"><b>{b.appointmentTime}</b></div>
                                            </div>
                                            <div className='col-sm-2 Appointimgrow'>
                                               
                                            </div>
                                            <div className='col-sm-5'>
                                                <div className="AppointNameBold">{b.userName}</div>
                                               
                                                <div className="AppointStatus">{b.bookingStatus}</div>
                                            </div>
                                            <div className='col-sm-2'>
                                                <img src="./loc.png"></img>
                                            </div>
                                        </div>
                                        <div className="AppointBodyrow2 appointBookId">Booking Id: {b.bookingId}</div>
                                        <div className="row AppointBodyrow2">
                                            <div className="col-md-6">
                                                <div className="">{b.serviceName}</div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-center AppointNameBold">&#8377;{b.totalAmount}</div>
                                               
                                            </div>
                                        
                                        </div>
                                        <div className="text-center"><u><b>Payment Status</b></u></div>
                                        <div className='progres'>
                                            <ul className="progressbar">
                                                <li class="active">Booked in 100</li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div className="text-center">Payments done by patient</div>
                                        <div className="text-center tip"><a href="" className='appointCreateP'>Create Prescription</a></div>
                                        <div className="text-center ideaDiv">
                                            <button className='idea' onClick={this.openModal}>
                                                <img src="./idea.svg"></img>
                                                <p className='tip'>Tips for more Conversions</p>
                                            </button>
                                        </div>
                                            <hr></hr>
                                    </div>
                                    )) : false
                                } */}
 
                          <div className="container">
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
                                      <h4>NOV 20</h4>
                                      <p>11 Nov 2019 <br/>09:00 AM</p>
                                      </div>
                                      
                                              <div className="col-lg-2">
                                                  <img src="/pexel_1.png" />
                                                  </div>
                                                  <div className="col-lg-4 nov_2">
                                                    <h4>{item.userName}</h4>
                                                    <p>{item.professionalAddress}</p> 
                                                  </div>
                                        
                                      <div className="col-lg-2 loc_tab">
                                      <img src="/loc.png" />
                                      </div>
                                </div>
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-4">
                                    <p className="gr_con">Confirmed</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re">Cancel</p>
                                 </div>
                                </div>
                                {/* 2nd--end */}
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-6">
                                    <p className="brace_m">Dental Braces</p>
                                 </div>
                                 <div className="col-lg-6">
                                 <p className="dental_th">30000</p>
                                 </div>
                                </div>
                                {/* 3rd--end */}
                                <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                                <div className="row">
                                   <div className="graph_cir righr_side_p"><img src="/right.svg" className="right_im" /><span>Booked in 100</span></div>
                                
                                   <div className="graph_cir"><img src="/right.svg" className="right_im" /><span className="thousent">6000</span></div>
                                    <div className="gray_circ">100%<span>30000</span></div>
                                 </div>
                                 <div className="grap_bod"></div><div className="grap_bod2"></div>
                                 <p className="pay_ptint">Payments done by patient</p>
                                 <p className="pay_green">Create Prescription</p>
                                 <div className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>
                                   </React.Fragment>
                               })}
                                </TabPanel>
                                <TabPanel className="ardee_ci">
                                    {this.state.confirmed_booking.map((item,i)=>{
                                   return <React.Fragment>
                                        <div className="row">
                                  <div className="col-lg-3 nov_2">
                                      <h4>NOV 20</h4>
                                      <p>11 Nov 2019 <br/>09:00 AM</p>
                                      </div>
                                      
                                              <div className="col-lg-2">
                                                  <img src="/pexel_1.png" />
                                                  </div>
                                                  <div className="col-lg-4 nov_2">
                                                  <h4>{item.userName}</h4>
                                                  <p>{item.professionalAddress}</p>
                                                </div> 
                                        
                                      <div className="col-lg-2 loc_tab">
                                    <div className="round-image">
                                      <img src={item.userImageUrl} />
                                      </div>
                                     </div>
                                </div>
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-4">
                                    <p className="gr_con">Confirmed</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re">Cancel</p>
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
                                <div className="row">
                                   <div className="graph_cir righr_side_p"><img src="/right.svg" className="right_im" /><span>{`Booked in ${item.totalAmount}`}</span></div>
                                
                                  
                                    <div className="gray_circ">100%<span>{`${item.totalAmount}`}</span></div>
                                 </div>
                                 <div className="grap_bod"></div><div className="grap_bod2"></div>
                                 <p className="pay_ptint">Payments done by patient</p>
                                 <p className="pay_green">Create Prescription</p>
                                 
                                   </React.Fragment>
                               })} 
                               <div className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>
                                </TabPanel>
                                <TabPanel className="ardee_ci">
                                {this.state.upcoming_bookings.map((item,i)=>{
                                   return <React.Fragment>
                                        <div className="row">
                                  <div className="col-lg-3 nov_2">
                                      <h4>NOV 20</h4>
                                      <p>11 Nov 2019 <br/>09:00 AM</p>
                                      </div>
                                      
                                              <div className="col-lg-2">
                                                  <img src="/pexel_1.png" />
                                                  </div>
                                                  <div className="col-lg-4 nov_2">
                                                  <h4>Shikha Singh</h4>
                                                      <p>C9/38, Gate No. 3, Block C, Ardee City, Sector 52, Gurugram, Haryana 122003, India</p> 
                                                  </div>
                                        
                                      <div className="col-lg-2 loc_tab">
                                      <img src="/loc.png" />
                                      </div>
                                </div>
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-4">
                                    <p className="gr_con">Confirmed</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="res_udle">Reschedule</p>
                                 </div>
                                 <div className="col-lg-4">
                                 <p className="con_re">Cancel</p>
                                 </div>
                                </div>
                                {/* 2nd--end */}
                                <div className="row confrm_mar_sec">
                                <div className="col-lg-6">
                                    <p className="brace_m">Dental Braces</p>
                                 </div>
                                 <div className="col-lg-6">
                                 <p className="dental_th">30000</p>
                                 </div>
                                </div>
                                {/* 3rd--end */}
                                <div className="col-lg-12 py_stu"><h2>Payment Status</h2></div>
                                <div className="row">
                                   <div className="graph_cir righr_side_p"><img src="/right.svg" className="right_im" /><span>Booked in 100</span></div>
                                
                                   <div className="graph_cir"><img src="/right.svg" className="right_im" /><span className="thousent">6000</span></div>
                                    <div className="gray_circ">100%<span>30000</span></div>
                                 </div>
                                 <div className="grap_bod"></div><div className="grap_bod2"></div>
                                 <p className="pay_ptint">Payments done by patient</p>
                                 <p className="pay_green">Create Prescription</p>
                                   </React.Fragment>
                               })}                           
                                 <div className="bg_bulb"><img src="/bulb.svg" /><p>Tips for more Conversions</p></div>       
                                                           
                                 </TabPanel>
                                
                               
                            </Tabs>

                             </div>   

            </div>
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
                <div className='col-md-3'></div>
            </div>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    bookings: state.user.bookingData,
    getBookingRet:state.user.getBookingRet
})

export default connect(mapStateToProps, {getBooking, getBookingClr})(AppointmentComponent);

