import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import { getBooking, getBookingClr } from '../../actions/userActions'
import { initiatePayment } from '../../actions/userActions'
import Modal from 'react-modal';
import Payments from "../Payments"
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

class PaymentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            payments:[]
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }
    handleModal(){
        this.setState({
            modalIsOpen :  false
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.getBookingRet){
            if(nextProps.getBookingRet.success){
                this.setState({
                    payments:nextProps.getBookingRet.data
                })
            }
            nextProps.getBookingClr()
        }
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

    dateTimeObject = (seconds) =>{
        let date = new Date(parseInt(seconds, 10))
        return  {
            monthAndDate: `${getMonth(date.getMonth())}  ${date.getDate()>9?date.getDate():"0"+date.getDate()}`,
            fullDate:  `${date.getDate()>9?date.getDate():"0"+date.getDate()} ${getMonth(date.getMonth())}  ${date.getFullYear()} `,
            time: `${date.getHours()>9?date.getHours():"0"+date.getHours()}:${date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()} ${date.getHours()>12?"PM":'AM'}`,
        }
    }


    render() {
       console.log(this.props, 'this.props in PaymentComponent')
       console.log(this.state, 'this.state in PaymentComponent')
    //  return  (
    //      <React.Fragment>
    //          <Payments />
    //      </React.Fragment>
    //  )

        return (
           <React.Fragment>
                    <div className='main_content_rish new_card_class'>
                    <div className= 'text-center paymnt_heding'><h4 style={{position:'relative',paddingTop:'1rem'}} className="section_heading_rish">Payments</h4></div><br></br>
                        {
                            this.state.payments.map((p, index) => {
                                 console.log(p.bookingStatus,"bookingStatus")
                                 if(p.bookingStatus !== 'Cancelled'){
                                    return ( <React.Fragment>
                                    <div key={index} className='payment_flex_wrapper'>
                                    <div className='payment_flex_image'>
                                        <a href="#">
                                         <img src={p.userImageUrl} className="rorpy_im img-loading-small_rish" /></a>
                                       </div>
                                   <div className='payment_flex_content'>
                                       <div className='PaymentUN'>{p.userName}</div>
                                       <div><p className="ser_nme">{p.serviceName}</p></div>
                                      
                                       <h6>{this.dateTimeObject(p.appointmentTime).monthAndDate}</h6>
                                   <p className="ser_nme">{this.dateTimeObject(p.appointmentTime).fullDate}<br/>{this.dateTimeObject(p.appointmentTime).time}</p>            
                                 {/* {p.appointmentTime} */}
                                         
                                   </div>
                                   <div className='payment_flex_requested'>
                                       <div className='PaymentUN'>&#x20b9;{p.paidAmount}</div><br></br>
                                       {
                                           p.redeemStatus === null ? <button type='button' onClick={() => this.handleClick(p)} className='redeemBtn'><u>Redeem</u></button> : <div><p className="ser_nme">{p.redeemStatus}</p></div>
                                       }
                                   </div>
                               </div>
                                <hr className="PaymentHR"></hr>
                                </React.Fragment>
                               )
                                 }
                            })
                        }
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                        contentLabel="Example Modal" className='redeemModal'>
                        <div className='text-right'><button type='button' onClick = {this.handleModal} className='redeemCross rud_bu'><img src= "/cross.jpg" style={{width:"65%"}} alt=""></img></button></div>
                        <div className='text-center'>
                             <img src= "/smile.svg" alt = 'Not available' style={{width:"18%"}}></img>
                        </div>
                        <br></br>
                        <h5 ref={subtitle => this.subtitle = subtitle} style={{textAlign:"center"}}>Payment has been initiated from our end. You will get the payment within 24 hours.</h5>                        
                    </Modal>
                    <div className='col-md-3'></div>
         </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    payment: state.user.bookingData,
    user:state.user,
    getBookingRet:state.user.getBookingRet
})
export default connect(mapStateToProps, { getBooking, initiatePayment, getBookingClr })(PaymentComponent)
