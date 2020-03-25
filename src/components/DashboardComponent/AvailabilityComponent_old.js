import React, { Component } from 'react'
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import  "./AvailabilityComponent.css";
// import TimePicker from 'react-time-picker';

export default class AvailabilityComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     time: '10:00',
        // }{
//     "success": true,
//     "field": [
//         {
//             "slots": [
//                 "9:00 AM-1:00 PM",
//                 "3:00 PM-8:00 PM"
//             ],
//             "day": "monday",
//             "closed": false
//         },
//         {
//             "slots": [
//                 "9:00 AM-1:00 PM",
//                 "3:00 PM-8:00 PM"
//             ],
//             "day": "tuesday",
//             "closed": false
//         },
//         {
//             "slots": [
//                 "9:00 AM-1:00 PM",
//                 "3:00 PM-8:00 PM"
//             ],
//             "day": "wednesday",
//             "closed": false
//         },
//         {
//             "slots": [
//                 "9:00 AM-1:00 PM",
//                 "3:00 PM-8:00 PM"
//             ],
//             "day": "thursday",
//             "closed": false
//         },
//         {
//             "slots": [
//                 "9:00 AM-1:00 PM",
//                 "3:00 PM-8:00 PM"
//             ],
//             "day": "friday",
//             "closed": false
//         },
//         {
//             "slots": [
//                 "9:00 AM-1:00 PM",
//                 "3:00 PM-8:00 PM"
//             ],
//             "day": "saturday",
//             "closed": false
//         },
//         {
//             "slots": [
//                 "9:00 AM-1:00 PM",
//                 "3:00 PM-8:00 PM"
//             ],
//             "day": "sunday",
//             "closed": true
//         }
//     ]
// }
        // this.sayHello = this.sayHello.bind(this);
      }

    
    render() {
        return (
            <div>
            <div>
                <DashboardHeader />
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <SidebarComponent />
                </div>

                <div className='col-md-6 AvailableTime'>
	                <form>
                    <div className="Avail">
                        Availability
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1 col-1 text-center AvailHeadrow">All</div>
                        <div className="col-sm-5 col-5 text-center AvailHeadrow">From-To</div>
                        <div className="col-sm-5 col-5 text-center AvailHeadrow">From-To</div>
                        <div className="col-sm-1 col-1 text-center AvailHeadrow">Closed</div>
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1"><p className="day">M</p></div>
                        <div className="col-sm-5">
                           <input className="Availputtime" type="time" id="fromM" name="monFrom1"></input>
                           <input type="time" id="toM" name="monTo1"></input>
                        </div>
                        <div className="col-sm-5">
                           <input className="Availputtime" type="time" id="fromM" name="monFrom2"></input>
                           <input type="time" id="toM" name="monTo2"></input>
                        </div>
                        <div className="col-sm-1">
                          <label className="contain">
                           <input type="checkbox"></input>
                           <span className="checkmark"></span>
                           </label>
                        </div>
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1"><p className="day">T</p></div>
                        <div className="col-sm-5 timeset">
                           <input className="Availputtime" type="time" id="fromM" name="tueFrom1"></input>
                           <input type="time" id="toM" name=""></input>
                        </div>
                        <div className="col-sm-5">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-1">
                        <label className="contain">
                           <input type="checkbox"></input>
                           <span className="checkmark"></span>
                           </label>
                        </div>
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1"><p className="day">W</p></div>
                        <div className="col-sm-5 timeset">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-5">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-1">
                        <label className="contain">
                           <input type="checkbox"></input>
                           <span className="checkmark"></span>
                           </label>
                        </div>
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1"><p className="day">T</p></div>
                        <div className="col-sm-5 timeset">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-5">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-1">
                        <label className="contain">
                           <input type="checkbox"></input>
                           <span className="checkmark"></span>
                           </label>
                        </div>
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1"><p className="day">F</p></div>
                        <div className="col-sm-5 timeset">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-5">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-1">
                        <label className="contain">
                           <input type="checkbox"></input>
                           <span className="checkmark"></span>
                           </label>
                        </div>
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1"><p className="day">S</p></div>
                        <div className="col-sm-5 timeset">
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                            <div className="col-sm-5">
                            <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-1">
                        <label className="contain">
                           <input type="checkbox"></input>
                           <span className="checkmark"></span>
                           </label>
                        </div>
                    </div>
                    <div className="row Availrow">
                        <div className="col-sm-1"><p className="day">S</p></div>
                        <div className="col-sm-5 timeset">
                            
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-5">
                            
                           <input className="Availputtime" type="time" id="fromM" name="from"></input>
                           <input type="time" id="toM" name="to"></input>
                        </div>
                        <div className="col-sm-1">
                        <label className="contain">
                           <input type="checkbox"></input>
                           <span className="checkmark"></span>
                           </label>
                        </div>
                        
                    </div>
                    </form>
                </div>
                <div className='col-md-3'>
    
                </div>
            </div>
        </div>
        )
    }
}

