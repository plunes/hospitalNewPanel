import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import  "./AboutUs.css";

export default class HelpComponent extends Component {
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
                    
        
                  <div className="helppage">
                  <div className="helppageBody">

                    <div className="helprow1"><p>Help</p></div>
                    <div className="form-group">
                        <label></label>
                        <input type="Text" className="form-control helpinput helprow2" placeholder="I have an issue with"></input>
                    </div>
                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                            <img src="bookingappointments.png" alt=""></img>
                        </div>
                        <div className="col-sm-11 col-11">
                            Booking Appointments
                        </div>
                    </div>

                    <div className="bookappoint">
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Booking Failure
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="arrow.svg" alt=""></img>
                            </div>
                        </div></button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Wrong lab/contact details
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="arrow.svg" alt=""></img>
                            </div>
                        </div></button> <hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Appointment delayed or canceled
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="arrow.svg" alt=""></img>
                            </div>
                        </div></button> <hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Cancelling/rescheduling an appointment
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="arrow.svg" alt=""></img>
                            </div>
                        </div> </button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                SMS/OTP issues
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="arrow.svg" alt=""></img>
                            </div>
                        </div></button>    
                    </div>

                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                            <img src="onlinesolutions.png" alt=""></img>
                        </div>
                        <div className="col-sm-11 col-11">
                            Online Solutions
                        </div>
                    </div>

                    <div className="onlinesolution bookappoint">
                            <button className='helpBtn'><div className="row helptype">
                                <div className="col-sm-11 col-11 text-left">
                                    Questions not answered
                                </div>
                                <div className="col-sm-1 col-1">
                                    <img src="arrow.svg" alt=""></img>
                                </div>
                            </div></button><hr></hr>
                            <button className='helpBtn'>
                                <div className="row helptype">
                                    <div className="col-sm-11 col-11 text-left">
                                            Not happy with response
                                    </div>
                                    <div className="col-sm-1 col-1">
                                        <img src="arrow.svg" alt=""></img>
                                    </div>
                               </div>
                            </button> <hr></hr>
                            <button className='helpBtn'>
                                <div className="row helptype">
                                    <div className="col-sm-11 col-11 text-left">
                                            Payment issues
                                    </div>
                                    <div className="col-sm-1 col-1">
                                        <img src="arrow.svg" alt=""></img>
                                    </div>
                               </div> 
                            </button>
                    </div>

                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                            <img src="feedbacks.png" alt=""></img>
                        </div>
                        <div className="col-sm-11 col-11">
                            Feedbacks
                        </div>
                    </div>

                    <div className="feedback bookappoint">
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                My feedback in not getting published
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="arrow.svg" alt=""></img>
                            </div>
                        </div></button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                                <div className="col-sm-11 col-11 text-left">
                                        Unable to write a feedback
                                </div>
                                <div className="col-sm-1 col-1">
                                    <img src="arrow.svg" alt=""></img>
                                </div>
                        </div></button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                        <div className="col-sm-11 col-11 text-left">
                            Booking failure
                        </div>
                        <div className="col-sm-1 col-1">
                            <img src="arrow.svg" alt=""></img>
                        </div>
                    </div></button> <hr></hr>
                    <button className='helpBtn'><div className="row helptype">
                        <div className="col-sm-11 col-11 text-left">
                            I want to edit my feedback
                        </div>
                        <div className="col-sm-1 col-1">
                            <img src="arrow.svg" alt=""></img>
                        </div>
                    </div></button>
                    </div>
                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                            <img src="Profile-Settings.png" alt=""></img>
                        </div>
                        <div className="col-sm-11 col-11">
                            Other issues
                        </div>
                    </div>
                        <div className="form-group">
                        <label></label>
                        <input type="Text" className="form-control helpinput helprow2" placeholder="Your issues"></input>
                    </div>
                  </div>

                </div>
                </div>
                <div className='col-md-3'></div>
            </div> <br />
        </div>
        )
    }
}
