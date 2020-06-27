import React, { Component } from 'react';
import { getNotifications, set_notif_data, set_notif_id } from "../../actions/userActions";
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import "./AboutUs.css";
import LoaderComponent from '../functional/LoaderComponent';
class NotificationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowsToDisplay: 3,
            notifications:[],
            total_pages:0,
            page:0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        console.log(this.props,"this.props in didMount of Notiifcation Container")
        this.setState({
            page:this.props.page_count
        })
    }

    handleClick() {
        let total = this.props.total_count
        let total_pages = this.props.total_count/20
        if(this.state.page<total_pages){
            this.setState({
                page:this.state.page +1
            },()=>{
                this.props.getNotifications({
                    page:this.state.page
                })
                this.props.set_notif_data({
                    ...this.props.notif_data,
                    page_count:this.state.page
                })
            })
        }
    }
    render() {
        console.log(this.props,"this.props in notification component")
        // console.log(this.props.notification)
        return (
            <React.Fragment>
                    <div  className='main_content_rish Notification'>
                                <h4 style={{position:'relative',paddingTop:'1rem'}} className="section_heading_rish">Notifications</h4>
                        {
                            this.props.notifications ? this.props.notifications.slice(0, this.props.notifications.length).map((n, index) => (
                                <Link
                                    onClick={()=>{
                                        if(n.notificationScreen==="booking"){
                                            this.props.set_notif_id(n.notificationId)
                                        }
                                    }}
                                    to= {n.notificationScreen==="booking"?'/dashboard/appointments':n.notificationScreen==="insight"?'/dashboard':''}
                                    >
                                <div className='row' key={index}>
                                    <div className="col-sm-2">
                                        <img className="NotifyImg" src={n.senderImageUrl || '/profile.jpg'} alt="NoImg"></img>
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
                        
                        {this.props.notifications.length ===0  ? <div className="text-center"><h6 className="rish_sub_heading">No Notification</h6></div>: <div className="text-center"><button onClick={this.handleClick} className="NotificationViewMore">View more</button></div>}
                          {this.props.get_notifs_loading &&
                          <LoaderComponent />
                         }
                        
                    </div>
                    <div className='col-md-3'></div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    // notification: state.user.notificationData,
    notif_data :state.user.data.notif_data,
    notif_id:state.user.notif_id
})
export default connect(mapStateToProps, {  set_notif_data, set_notif_id })(NotificationComponent)
