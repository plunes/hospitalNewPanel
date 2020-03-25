import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { getBooking } from '../../actions/userActions'
import { connect } from 'react-redux';
import  "./AvailabilityComponent.css";


class AppointmentComponent extends Component {
    async componentDidMount(){
     await this.props.getBooking();
    }

    render() {
        // console.log(this.props.bookings, 'bookings');
        return (
            
            <div>
            <div className='row'>
                <DashboardHeader />
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <SidebarComponent />
                </div>
                <div className='col-md-6'>
                    <div className="Appoint AllComponents">
                        <div className="AppointBodyrow1">Appointments</div>
                           {/* <div className="AppointBody"> */}
                             {/* <div className='row AppointBodyrow2'>
                                   <div className='col-sm-3'>
                                       <div className="AppointNameBold">13 Feb</div>
                                       <div className="appointBookId">06:00 PM</div>
                                   </div>
                                   <div className='col-sm-2 Appointimgrow'>
                                       <p className="Appointimg">M</p>
                                   </div>
                                   <div className='col-sm-7'>
                                       <div className="AppointNameBold">Mahendra</div>
                                       <div className="appointBookId">USG Whole Abdomen</div>
                                       <div><a href=""  className="AppointStatus">Confirmed</a></div>
                                   </div>
                             </div> */}
                             {/* <div className="AppointBodyrow2 appointBookId">Booking Id: PLUNES-2020-02-11-1324</div> */}
                             {/* <div className="row AppointBodyrow2">
                                   <div className="col-md-6">
                                       <div>Total amount: &#8377;1764</div>
                                       <div>Remaining amount: &#8377;0</div>
                                       <div>Credit Used: &#8377;0</div>
                                   </div>
                                   <div className="col-md-6">
                                       <div>Paid amount: &#8377;1764</div>
                                       <div>Category: Basic</div>
                                   </div>
                             </div><hr></hr> */}
                    {
                        this.props.bookings  ? this.props.bookings.map((b, index)=>(
                        <div className="AppointBody" key = {index}>
                            <div className='row AppointBodyrow2'>
                                   <div className='col-sm-5'>
                                       {/* <div className="AppointNameBold">13 Feb</div> */}
                                       <div className="AppointNameBold"><b>{b.appointmentTime}</b></div>
                                   </div>
                                   <div className='col-sm-2 Appointimgrow'>
                                       {/* <p className="Appointimg">M</p> */}
                                   </div>
                                   <div className='col-sm-5'>
                                       <div className="AppointNameBold">{b.userName}</div>
                                       <div className="appointBookId">{b.serviceName}</div>
                                       <div className="AppointStatus">{b.bookingStatus}</div>
                                   </div>
                             </div>
                        <div className="AppointBodyrow2 appointBookId">Booking Id: {b.bookingId}</div>
                             <div className="row AppointBodyrow2">
                                   <div className="col-md-6">
                                       <div>Total amount: &#8377;{b.totalAmount}</div>
                                       <div>Remaining amount: &#8377;{b.restAmount}</div>
                                       <div>Credit Used: &#8377;{b.creditsUsed}</div>
                                   </div>
                                   <div className="col-md-6">
                                       <div>Paid amount: &#8377;{b.paidAmount}</div>
                                       <div>Category: </div>
                                   </div>
                             </div><hr></hr>
                        {/* <div>{b.userName}</div>
                        <div>{b.bookingStatus}</div>
                        <div>{b.appointmentTime}</div>
                        <div>{b.serviceName}</div>
                        <div>{b.paidAmount}</div>
                        <div>{b.totalAmount}</div>
                        <div>{b.restAmount}</div>
                        <hr /> */}
                        </div>
                        )) : false
                    }

                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    bookings: state.user.bookingData,
})

export default connect(mapStateToProps, {getBooking})(AppointmentComponent);

