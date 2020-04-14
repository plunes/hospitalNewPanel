import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { getBooking } from '../../actions/userActions'
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import  "./AvailabilityComponent.css";
import Modal from 'react-modal';

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
                                            <div className='col-sm-3'>
                                                {/* <div className="AppointNameBold">13 Feb</div> */}
                                                <div className="AppointNameBold"><b>{b.appointmentTime}</b></div>
                                            </div>
                                            <div className='col-sm-2 Appointimgrow'>
                                                {/* <p className="Appointimg">M</p> */}
                                            </div>
                                            <div className='col-sm-5'>
                                                <div className="AppointNameBold">{b.userName}</div>
                                                {/* <div className="appointBookId">{b.serviceName}</div> */}
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
                                                {/* <div>Remaining amount: &#8377;{b.restAmount}</div>
                                                <div>Credit Used: &#8377;{b.creditsUsed}</div> */}
                                            </div>
                                            {/* <div className="col-md-6">
                                                <div>Paid amount: &#8377;{b.paidAmount}</div>
                                                <div>Category: </div>
                                            </div> */}
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
                                }

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
})

export default connect(mapStateToProps, {getBooking})(AppointmentComponent);

