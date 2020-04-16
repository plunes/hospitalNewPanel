import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import "./AvailabilityComponent.css";
// import history from '../../history';


export default class SettingsComponent extends Component {
     constructor(props){
          super(props)
          this.handleClick = this.handleClick.bind(this);
     }

     handleClick(){
          this.props.history.push('/editProfile')
     }

     render() {
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
                              <div className="settingpage">
                                   <div className="settingpageBody">
                                        <div className="settingtopic"><p >Settings</p></div>
                                        <div className="row settingfont settingtype">
                                             <div className="col-xs-3 col-sm-1 col settingtypecol1"><img src="Account-Settings.png" alt=''></img></div>
                                             <div className="col-xs-9 col-sm-11 col">Account Settings</div>
                                        </div>
                                        <div className="accset settingfont">
                                             {/* <div className="row accsetrow">
                                                  <div className="col-sm-1 col settingcol1"><img src="SettingNotify.png" alt=''></img></div>
                                                  <div className="col-sm-9 col settingcol2"><p className="typeofsetting">Notifications</p></div>
                                                  <div className="col-sm-2 col toggleswitch">
                                                       <label className="switch">
                                                            <input type="checkbox"></input>
                                                            <span className="slider round"></span>
                                                       </label>
                                                  </div>
                                             </div><hr></hr> */}
                                             <div className="row accsetrow" onClick= {this.handleClick}>
                                                  <div className="col-sm-1 col settingcol1"><img src="Edit-Profile.png" alt=''></img></div>
                                                  <div className="col-sm-9 col settingcol2"><p className="typeofsetting cursor-pointer">Edit Profile</p></div>
                                                  <div className="col-sm-2 col settingcol3"><img className="settingcontrolarrow" src="arrow.svg" alt=''></img></div>
                                             </div>
                                        </div>
                                        <div className="row settingfont settingtype">
                                             <div className="col-sm-1 col settingtypecol1"><img src="Profile-Settings.png" alt=""></img></div>
                                             <div className="col-sm-11 col">Privacy Setting</div>
                                        </div>
                                        <div className="accset settingfont">
                                             <div className="row accsetrow">
                                                  <div className="col-sm-1 col settingcol1"><img src="Change-Password.png" alt=""></img></div>
                                                  <div className="col-sm-9 col settingcol2"><p className="typeofsetting">Change Password</p></div>
                                                  <div className="col-sm-2 col settingcol3"><img className="settingcontrolarrow" src="arrow.svg" alt=""></img></div>
                                             </div><hr></hr>
                                             <div className="row accsetrow">
                                                  <div className="col-sm-1 col settingcol1"><img src="Logout.png" alt=""></img></div>
                                                  <div className="col-sm-9 col settingcol2"><p className="typeofsetting">Logout from all devices</p></div>
                                                  <div className="col-sm-2 col settingcol3"><img className="settingcontrolarrow" src="arrow.svg" alt=""></img></div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='col-md-3'></div>
                    </div>
                    <br />
               </div>
          )
     }
}

