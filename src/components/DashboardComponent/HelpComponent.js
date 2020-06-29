import React from 'react';
import SubmitQuery from "../functional/SubmitQuery";
import { connect } from 'react-redux';
import { submit_query, submit_query_clr } from "../../actions/userActions"
import  "./AboutUs.css";

 class HelpComponent extends React.PureComponent {
        constructor(props){
            super(props)
            this.state = {
              vaid:true,
              laoding:false
            }
            this.submit_query_clr = this.submit_query_clr.bind(this)
            this.submit_query = this.submit_query.bind(this)
        }

        submit_query_clr(){
            this.props.submit_query_clr()
            setTimeout(this.setState({
                laoding:false
            }),500)
        }
        submit_query(data){
            this.setState({
                laoding:true
            },()=>this.props.submit_query(data))
        }
     
    
    render() {
        console.log(this.props,"this.props in helpCompoent")
        return (
            <React.Fragment>
                <div className='main_content_rish'>
                  <div>
                  <div className="helppageBody">
                      <SubmitQuery 
                        submit_query_ret = {this.props.submit_query_ret}
                        submit_query_clr = {()=>this.submit_query_clr()}
                        submit_query = {this.submit_query}
                        laoding = {this.state.laoding}
                      />
                    {/* <div className="form-group">
                        <label></label>
                        <input type="Text" className="form-control helpinput helprow2" placeholder="I have an issue with"></input>
                    </div>
                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                            <img src="/bookingappointments.jpg" alt=""></img>
                        </div>
                        <div className="col-sm-11 col-11 bok_apt">
                            Booking Appointments
                        </div>
                    </div>

                    <div className="bookappoint">
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Booking Failure
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="/arrow.svg" alt=""></img>
                            </div>
                        </div></button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Wrong lab/contact details
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="/arrow.svg" alt=""></img>
                            </div>
                        </div></button> <hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Appointment delayed or canceled
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="/arrow.svg" alt=""></img>
                            </div>
                        </div></button> <hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                Cancelling/rescheduling an appointment
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="/arrow.svg" alt=""></img>
                            </div>
                        </div> </button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                SMS/OTP issues
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="/arrow.svg" alt=""></img>
                            </div>
                        </div></button>    
                    </div>

                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                            <img src="/onlinesolutions.jpg" alt=""></img>
                        </div>
                        <div className="col-sm-11 col-11 bok_apt">
                            Online Solutions
                        </div>
                    </div>

                    <div className="onlinesolution bookappoint">
                            <button className='helpBtn'><div className="row helptype">
                                <div className="col-sm-11 col-11 text-left">
                                    Questions not answered
                                </div>
                                <div className="col-sm-1 col-1">
                                    <img src="/arrow.svg" alt=""></img>
                                </div>
                            </div></button><hr></hr>
                            <button className='helpBtn'>
                                <div className="row helptype">
                                    <div className="col-sm-11 col-11 text-left">
                                            Not happy with response
                                    </div>
                                    <div className="col-sm-1 col-1">
                                        <img src="/arrow.svg" alt=""></img>
                                    </div>
                               </div>
                            </button> <hr></hr>
                            <button className='helpBtn'>
                                <div className="row helptype">
                                    <div className="col-sm-11 col-11 text-left">
                                            Payment issues
                                    </div>
                                    <div className="col-sm-1 col-1">
                                        <img src="/arrow.svg" alt=""></img>
                                    </div>
                               </div> 
                            </button>
                    </div>

                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                            <img src="/feedbacks.jpg" alt=""></img>
                        </div>
                        <div className="col-sm-11 col-11 bok_apt">
                            Feedbacks
                        </div>
                    </div>

                    <div className="feedback bookappoint">
                        <button className='helpBtn'><div className="row helptype">
                            <div className="col-sm-11 col-11 text-left">
                                My feedback in not getting published
                            </div>
                            <div className="col-sm-1 col-1">
                                <img src="/arrow.svg" alt=""></img>
                            </div>
                        </div></button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                                <div className="col-sm-11 col-11 text-left">
                                        Unable to write a feedback
                                </div>
                                <div className="col-sm-1 col-1">
                                    <img src="/arrow.svg" alt=""></img>
                                </div>
                        </div></button><hr></hr>
                        <button className='helpBtn'><div className="row helptype">
                        <div className="col-sm-11 col-11 text-left">
                            Booking failure
                        </div>
                        <div className="col-sm-1 col-1">
                            <img src="/arrow.svg" alt=""></img>
                        </div>
                    </div></button> <hr></hr>
                    <button className='helpBtn'><div className="row helptype">
                        <div className="col-sm-11 col-11 text-left">
                            I want to edit my feedback
                        </div>
                        <div className="col-sm-1 col-1">
                            <img src="/arrow.svg" alt=""></img>
                        </div>
                    </div></button>
                    </div>
                    <div className="row bookappointhead">
                        <div className="col-sm-1 col-1">
                           
                        </div>
                        <div className="col-sm-11 col-11 bok_apt">
                            Other issues
                        </div>
                    </div>
                        <div className="form-group">
                        <label></label>
                        <input type="Text" className="form-control helpinput helprow2" placeholder="Your issues"></input>
                    </div> */}
                  </div>

                </div>
                </div>
                <div className='col-md-3'></div>
            </React.Fragment>
        )
    }
}



const mapStateToProps = state => ({
    submit_query_ret : state.user.submit_query_ret
  })
  export default connect(mapStateToProps, {
  submit_query, submit_query_clr
  })(HelpComponent)