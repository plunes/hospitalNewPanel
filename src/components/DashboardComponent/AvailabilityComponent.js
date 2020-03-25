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
                <div className= 'col-md-6 AvailableTime AllComponents'>
                <div className= 'text-center'><h4><b>Availability</b></h4></div>
                <div className="AvailTime">
                   {
                      this.props.timeSlot.map((t, index) =>
                      (
                           <div className='row Timerow' key = {index}>
                              <div className= 'col-md-1 day'><p style={{marginTop:"-10px"}}>{t.day}</p></div>
                              <div className= 'col-md-5 text-center' style={{padding:"12px"}}>{t.slots[0]}</div>
                              <div className= 'col-md-5 text-center' style={{padding:"12px"}}>{t.slots[1]}</div>
                              <div className='col-md-1' style={{padding:"12px"}}><input type="checkbox" name={t.closed}></input></div> 
                           </div>
                      ))
                   }
                </div>
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