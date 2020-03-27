import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader';
import SidebarComponent from './SidebarComponent';
import { connect } from 'react-redux';
import { getBooking } from '../../actions/userActions'
import { initiatePayment } from '../../actions/userActions'
import Modal from 'react-modal';
import './Dashboard.css';

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
class PaymentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }
    handleModal(){
        this.setState({
            modalIsOpen :  false
        })
    }
    async handleClick(paymentData) {
        let successData = await this.props.initiatePayment(paymentData);
        if (successData) {
            this.setState({
                modalIsOpen: true
            })
            await this.props.getBooking()
        }
    }
    async componentDidMount() {
        await this.props.getBooking()
    }
    render() {
       console.log(this.props.payment, 'payment')
        return (
            <div>
                <div className='row'>
                    <DashboardHeader />
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <SidebarComponent />
                    </div>
                    <div className='col-md-6 Payment AllComponents'>
                    <div className= 'text-center'><h4><b>Payments</b></h4></div><br></br>
                        {
                            this.props.payment.map((p, index) => (
                                <div key={index} className='row'>
                                    <div className='col-md-6'>
                                        <div className='PaymentUN'>{p.userName}</div>
                                        <div>{p.serviceName}</div><br></br>
                                        <div>{p.appointmentTime}</div>
                                    </div>
                                    <div className='col-md-6 text-right'>
                                        <div className='PaymentUN'>&#x20b9;{p.totalAmount}</div><br></br>
                                        {
                                            p.redeemStatus === null ? <button type='button' onClick={() => this.handleClick(p)} className='redeemBtn'><u>Redeem</u></button> : <div>{p.redeemStatus}</div>
                                        }
                                    </div>
                                    <hr className="PaymentHR"></hr>
                                </div>
                            ))
                        }
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                        contentLabel="Example Modal" className='redeemModal'>
                        <div className='text-right'><button type='button' onClick = {this.handleModal} className='redeemCross'><img src= "/cross.png" style={{width:"65%"}} alt=""></img></button></div>
                        <div className='text-center'>
                             <img src= "/smile.svg" alt = 'Not available' style={{width:"18%"}}></img>
                        </div>
                        <br></br>
                        <h5 ref={subtitle => this.subtitle = subtitle} style={{textAlign:"center"}}>Payment has been initiated from our end. You will get the payment within 24 hours.</h5>                        
                    </Modal>
                    <div className='col-md-3'></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    payment: state.user.bookingData
})
export default connect(mapStateToProps, { getBooking, initiatePayment })(PaymentComponent)
