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
                        <div className="AppointBodyrow1"></div>
                            {
                                this.props.bookings  ? this.props.bookings.map((b, index)=>(
                                <div key = {index}>
                                    <div>
                                        {b.serviceName}
                                    </div>
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

