import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { getBooking } from '../../actions/userActions'
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
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
                                    </div>
                                    )) : false
                                }

                    </div>
                    <div>Payment Status</div>
                    <ProgressBar variant="success" now={40} />
                    <div>Payments done by patient</div>
                    <a href="">Create Prescription</a>
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

