import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import { getNotifications } from "../../actions/userActions";
import { sendCounterZero } from "../../actions/userActions";
import history from "../../history";
import  { Link } from "react-router-dom"
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';



class DashboardHeader extends Component {

    constructor(props){
      super(props)
      this.state = {
        valid:true
      }
      this.handleClick = this.handleClick.bind(this)
    }
   


  handleClick(){
    let unreadN = this.props.unreadNotification
    //console.log(this.props.notificationCount, '656')
    // this.props.sendCounterZero(unreadN);
    history.push('/notification')
  }

  componentWillReceiveProps(nextProps){
    if(!!nextProps.notif_count_flag){
      console.log("Nextropsin dashboard header")
      nextProps.remove_notif_count_ret()
    }
  }
  // async componentDidMount(){
  //   await this.props.getNotifications()
  // }
  render() {
    const authObject = this.props.authObject
    console.log(this.props,'props in HeaderCompoent');
  console.log(window.location.pathname,"window.location in header")
        return   <nav className="navbar custom_ha navbar-expand-md custom-navbar ">
        <div className="header_wrapper_rish oversize_wrap_rish display_flex">
          <div className="header_wrapper_logo_child_rish ">
            <div style={{position:'relative',width:'100%', height:'100%'}} className='center_align_rish' >
              <Link to="/dashboard">
                <img src="/icon/plunes_transparent_logo.svg" style={{marginLeft:'2rem'}} className="logo_rish cursor-pointer" />
              </Link>
            </div>
          
          </div>
        <div className="header_wrapper_links_child_rish mobile_header_links">
           <button className="navbar-toggler navbar-toggler-right custom-toggler" type="button" >
            <i className="fa fa-bars" aria-hidden="true"></i>
           </button>
             <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto Three_butn dr_lis_mobile">
                  
                <li className="nav-item header_li_rish">
                <Link to= "/dashboard/payments"
                    onClick = {()=>this.setState({valid:!this.state.valid},()=>this.props.togglePayment())}>
                  <text   className={`${window.location.pathname==='/dashboard/payments'?'green_text_rish':'header_link_text'} `} >Payments</text></Link>
                  </li> 
                 <li className="nav-item header_li_rish">
                 <a  rel= "noopener" target="_blanck" href={`https://plockr.plunes.com/auth/${localStorage.getItem('token')}`}>
                  <text   className={`${window.location.pathname==='/signin'?'green_text_rish':'header_link_text'} `} >Plockr</text>
                     </a>
                  </li> 

                   <li className="nav-item header_li_rish">
                <Link to= "/dashboard/notification"
                     style={{position:'relative'}}
                     onClick = {()=>this.setState({valid:!this.state.valid},()=>this.props.toggleNotif())}>
                  <img className='' src="/icon/notification_header_icon.svg" />
                  <text  className={`${window.location.pathname==='/dashboard/notification'?'green_text_rish':'header_link_text'} `} >Notifications</text>
                  <div className="notif_badge_wrapper_rish">
                    <NotificationBadge count={this.props.count} effect={Effect.SCALE}/>
                  </div>
                  </Link>
                  </li> 
                  <li className="nav-item header_li_rish">
                  <Link to="/dashboard/profile"  
                   onClick = {()=>this.setState({valid:!this.state.valid},()=>this.props.toggleProfile())}>
                  <img className="sol-img2" src={this.props.prof_data.imageUrl || '/profile.jpg'}  alt='Not available'/>
                  <text  className={`${window.location.pathname==='/dashboard/profile'?'green_text_rish':'header_link_text'} `} >{this.props.user.name}</text></Link>
                  </li> 
                 </ul>
             </div>  
        </div>
      </div>
  </nav>
        }
  }
      


//fetch userDetails reducer
const mapStateToProps = state => ({
  user : state.user.userDetail,
  prof_data:state.user.data.prof_data
})
//export default connect(mapStateToProps, {})(DashboardHeader)
export default connect(mapStateToProps, {getNotifications, sendCounterZero})(DashboardHeader)


// export default DashboardHeader;