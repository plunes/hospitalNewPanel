import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import  { logoutOtherDevices , logoutDevicesClr} from "../../actions/userActions"
// import {notify} from "../../utils/notification"
import LogoutOther from "../functional/LogoutOther"
import { Link } from "react-router-dom"

import "./AvailabilityComponent.css";
// import history from '../../history';
import AnimatedMount from "../../HOC/AnimatedMount"

 class SettingsComponent extends Component {
     constructor(props){
          super(props)
          this.state = {
               logoutDevicesLoading:false,
               errorText:false,
               successText:false
          }
          // this.handleClick = this.handleClick.bind(this);
     }
     componentDidMount(){
          this.setState({
               logoutDevicesLoading:this.props.logoutDevicesLoading
          })
         
     }

     static getDerivedStateFromProps(nextProps, prevState){
          console.log(nextProps,"nextProps in getDerivedStateFromProps")
          console.log(prevState,"prevState in getDerivedStateFromProps")
          if(nextProps.logoutDevicesLoading!==prevState.logoutDevicesLoading){
            return {logoutDevicesLoading : nextProps.logoutDevicesLoading};
          }
     
          else return null;
        }

     componentDidUpdate(prevProps, prevState) {
          console.log(prevProps,"prevProps in ComponentDidUpate")
          console.log(prevState,"prevState in ComponentDidUpate")
          if (prevState.logoutDevicesLoading !== this.state.logoutDevicesLoading) {
              // do something 
              console.log(this.state,"this.state in componentDidUpdate ")
          }
     }

     // handleClick(){
     //      this.props.history.push('/editProfile')
     // }

  
     clearNotif = () =>{
          this.setState({
              errorText:false,
              successText:false
          })
      }

     render() {
          console.log(this.props,"props in SettingsComponent")
          console.log(this.state,"state in SettingsComponent")
          return (
               <React.Fragment>
                  <div className='main_content_rish new_card_class'>
                              <div>
                                   <div className="settingpageBody">
                                   <h4 style={{position:'relative'}} className="section_heading_rish">Settings</h4>
                                        <div className="row settingfont settingtype">
                                             <div className="col-xs-3 col-sm-1 col settingtypecol1"><img src="/Account-Settings.jpg" alt=''className=""></img></div>
                                             <div className="col-xs-9 col-sm-11 col acnt">Account Settings</div>
                                        </div>
                                        <div className="accset settingfont">
                                    {/* <div className="row accsetrow">
                                                  <div className="col-sm-1 col settingcol1"><img src="/SettingNotify.jpg" alt=''className="privc_icone"></img></div>
                                                  <div className="col-sm-9 col settingcol2"><p className="typeofsetting">Notifications</p></div>
                                                  <div className="col-sm-2 col toggleswitch">
                                                       <label className="switch">
                                                            <input type="checkbox"></input>
                                                            <span className="slider round"></span>
                                                       </label>
                                                  </div>
                                             </div><hr></hr> */}
                                             <div className="row accsetrow" >
                                                  <div className="col-sm-1 col settingcol1"><img src="/Edit-Profile.jpg" alt='' className="privc_icone"></img></div>
                                                  <div className="col-sm-9 col settingcol2"><p className="typeofsetting cursor-pointer">
                                                       <Link to="/dashboard/editProfile"
                                                       role = "button"
                                                       onClick={()=>this.props.toggleEditProf()}
                                                       >
                                                       Edit Profile
                                                       </Link>
                                                       </p></div>
                                                  <div className="col-sm-2 col settingcol3"><img className="/settingcontrolarrow" src="arrow.svg" alt='' className="privc_icone"></img></div>
                                             </div>
                                        </div>
                                        <div className="row settingfont settingtype">
                                             <div className="col-sm-1 col settingtypecol1"><img src="/Profile-Settings.jpg" alt="" className=""></img></div>
                                             <div className="col-sm-11 col acnt">Privacy Setting</div>
                                        </div>
                                        <div className="accset settingfont">
                                             <div className="row accsetrow">
                                                  <div className="col-sm-1 col settingcol1"><img src="/Change-Password.jpg" alt="" className="privc_icone"></img></div>
                                                  <div className="col-sm-9 col settingcol2"><p className="typeofsetting">
                                                  <Link to="/dashboard/change-password"
                                                       role = "button"
                                                       onClick={()=>this.props.toggleChangePass()}
                                                       >
                                                       Change Password
                                                  </Link>                                                       
                                                       </p></div>
                                                  <div className="col-sm-2 col settingcol3"><img className="/settingcontrolarrow" src="arrow.svg" alt=""></img></div>
                                             </div><hr></hr>
                                             <div className="row accsetrow">
                                                  <div className="col-sm-1 col settingcol1"><img src="/Logout.jpg" alt=""className="privc_icone"></img></div>
                                                  <LogoutOther
                                                     logoutOtherDevices = {this.props.logoutOtherDevices}
                                                     logoutDevicesRet = {this.props.logoutDevicesRet}
                                                     logoutDevicesClr = {this.props.logoutDevicesClr}
                                                  
                                                  />
                                                  <div className="col-sm-2 col settingcol3"><img className="/settingcontrolarrow" src="arrow.svg" alt="" className="privc_icone"></img></div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                  <div className='col-md-3'></div>
               </React.Fragment>
          )
     }
}

const mapStateToProps = state => ({
     user: state.user.userDetail,
     logoutDevicesRet:state.user.logoutDevicesRet,
     logoutDevicesLoading:state.user.logoutDevicesLoading
})



 export default AnimatedMount({
     unmountedStyle: {
       opacity: 0,
       transform: 'translate3d(0, -2rem, 0)',
       transition: 'opacity 100ms ease-out, transform 100ms ease-out',
     },
     mountedStyle: {
       opacity: 1,
       transform: 'translate3d(0, 0, 0)',
       transition: 'opacity .5s ease-out, transform .5s ease-out',
     },
   })(connect(mapStateToProps, { 
     logoutOtherDevices,
     logoutDevicesClr
 })(SettingsComponent))