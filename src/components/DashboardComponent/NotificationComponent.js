import React, { Component } from 'react';
import { getNotifications } from "../../actions/userActions";
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import "./AboutUs.css";
import LoaderComponent from '../functional/LoaderComponent';
class NotificationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowsToDisplay: 3,
            notifications:[]
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }
    render() {
        console.log(this.props,"this.props in notification component")
        // console.log(this.props.notification)
        return (
            <React.Fragment>
                    <div className='col-md-8 Notification AllComponents'>
                        {this.props.get_notifs_loading && <LoaderComponent />}
                        <h4 className="Notify">Notifications</h4>
                        {
                            this.props.notifications ? this.props.notifications.slice(0, this.props.notifications.length).map((n, index) => (
                                <Link
                                    to= {n.notificationScreen==="booking"?'/dashboard/appointments':n.notificationScreen==="insight"?'/dashboard':''}
                                    >
                                <div className='row' key={index}>
                                    
                                    <div className="col-sm-2">
                                        <img className="NotifyImg" src={n.senderImageUrl || '/profile.png'} alt="NoImg"></img>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="NotifierName">{n.senderName}</p>
                                        <span className="intro_di" key={index}>{n.notification}</span>
                                    </div>
                                    <div className="col-sm-4"><p className="text-center"></p></div>
                                    <hr className="PaymentHR"></hr>
                                </div>
                              </Link>
                            )) : false
                        }
                        <div className="text-center"><button onClick={this.handleClick} className="NotificationViewMore">View more</button></div>
                    </div>
                    <div className='col-md-3'></div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    // notification: state.user.notificationData
})
export default connect(mapStateToProps, { getNotifications })(NotificationComponent)
