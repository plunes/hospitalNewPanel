import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { getNotifications } from "../../actions/userActions";
import { connect } from 'react-redux';
import "./AboutUs.css";
class NotificationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowsToDisplay: 3
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }
    async componentDidMount() {
        await this.props.getNotifications()
    }
    render() {
        // console.log(this.props.notification)
        return (
            <div>
                <div className='row'>
                    <DashboardHeader />
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <SidebarComponent />
                    </div>
                    <div className='col-md-5 Notification'>
                        <h4 className="Notify">Notifications</h4>
                        {
                            this.props.notification ? this.props.notification.slice(0, this.state.rowsToDisplay).map((n, index) => (
                                <div className='row' key={index}>
                                    <div className="col-sm-2">
                                        <img className="NotifyImg" src={n.senderImageUrl || '/profile.png'} alt="NoImg"></img>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="NotifierName">{n.senderName}</p>
                                        <span key={index}>{n.notification}</span>
                                    </div>
                                    <div className="col-sm-4"><p className="text-center"></p></div>
                                    <hr className="PaymentHR"></hr>
                                </div>
                            )) : false
                        }
                        <div className="text-center"><button onClick={this.handleClick} className="NotificationViewMore">View more</button></div>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    notification: state.user.notificationData
})
export default connect(mapStateToProps, { getNotifications })(NotificationComponent)
