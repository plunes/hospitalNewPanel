import React, { Component } from 'react'
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import  "./AvailabilityComponent.css";
// import TimePicker from 'react-time-picker';
import { connect } from "react-redux";
import { getTimeslot } from "../../actions/userActions";
class AvailabilityComponent extends Component {
   constructor(props) {
        super(props);
      }
      async componentDidMount(){
         await this.props.getTimeslot();
      }
    render() {
      console.log(this.props.timeSlot, 'time slot')
        return (
            <div>
            <div className='row'>
                <DashboardHeader />
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <SidebarComponent />
                </div>
                <div className= 'col-md-6 AvailableTime AllComponents my_av_sec'>
                <div className= 'text-center'><h4 className="abt_sec"><b>My Availability</b></h4></div>
               
                   {/* {
                      this.props.timeSlot.map((t, index) =>
                      (
                           <div className='row Timerow' key = {index}>
                              <div className= 'col-md-1 day'><p style={{marginTop:"-10px"}}>{t.day}</p></div>
                              <div className= 'col-md-5 text-center' style={{padding:"12px"}}>{t.slots[0]}</div>
                              <div className= 'col-md-5 text-center' style={{padding:"12px"}}>{t.slots[1]}</div>
                              <div className='col-md-1' style={{padding:"12px"}}><label class="contain">
                                <input type="checkbox" name={t.closed}></input><span class="checkmark"></span></label></div> 
                           </div>
                      ))
                   } */}
                  {/* time-Availability */}
                  <div className="time_she">
                   
                    <div className="row text-center">
                      <div className="col-lg-2"><h4>All</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-2"><h4>Closed</h4></div>
                    </div>
                    {/* heding-section-end */}
                   
                    <div className="row text-center">
                      <div className="col-lg-2"><p className="m">M</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox" /> <label for="checkbox"></label></div></div>
                    </div>
                   
                    {/* 1st-end */}
                    <div className="row text-center">
                      <div className="col-lg-2"><p className="m">T</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox1" /> <label for="checkbox1"></label></div></div>
                    </div>
                      {/* 2nd-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">W</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox2" /> <label for="checkbox2"></label></div></div>
                    </div>
                      {/* 3rd-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">T</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox3" /> <label for="checkbox3"></label></div></div>
                    </div>
                      {/* 4rth-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">F</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox4" /> <label for="checkbox4"></label></div></div>
                    </div>
                      {/* 5th-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">S</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox5" /> <label for="checkbox5"></label></div></div>
                    </div>
                      {/* 6is-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">S</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox6" /> <label for="checkbox6"></label></div></div>
                    </div>
                      {/* 7th-end */}
                      <div className="time_clo my_avl">
                      <a href="#" className="sub_tm">Submit</a>
                      </div>
                </div>
              {/* time-Availability -end*/}
                </div>
                <div className='col-md-3'>
                </div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = state => ({
   timeSlot : state.user.timeSlot
 })
export default connect(mapStateToProps, {getTimeslot} )(AvailabilityComponent);