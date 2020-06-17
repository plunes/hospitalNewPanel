import React from "react"
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { getDay, timeToString } from "../../utils/common_utilities"
import NewNotif from "../functional/NewNotif"

class RescheduleComponent extends React.PureComponent {
        constructor(props){
            super(props)
            this.state = {
                valid:true,
                value:!!this.props.value?this.props.value.appointmentTime:new Date,
                reschedule_flag:false,
                ret:false,
                toggler:false
            }
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.success_reschedule_id === nextProps.value._id){
                this.setState({reschedule_flag:false})
                nextProps.remove_success_id()
            }
        }

        reschedule_click = () =>{
            this.setState(
                {
                reschedule_flag:true
                },()=>this.props.selected_callback(this.props.value))
        }

        get_slot = (day) =>{
            let ret = {}
            try{
                this.props.slots.forEach(element => {
                    if(element.day===day){
                        ret = element
                        throw new Error("dummy_error_to_break_for_each")
                    }
                });
            }
            catch(e) {
                console.log(e)
            }
            return ret
        }

        valid_time = (data,minutes,hours) =>{
            let slot = data.slots
            console.log(slot,minutes,hours,"inside valid_time function")
            if((hours>=slot.morning.from.hour) && (hours<=slot.morning.to.hour)){
                if(slot.morning.from.hour === slot.morning.to.hour ){
                        if(minutes<slot.morning.to.minutes){
                            return `${timeToString(slot.morning.from)}-${timeToString(slot.morning.to)}`
                        }
                            return false
                        }
                if(hours===slot.morning.from.hour){
                        if(minutes<slot.morning.from.minutes){
                            return false
                        }else{
                            return  `${timeToString(slot.morning.from)}-${timeToString(slot.morning.to)}`
                        }
                  }else if(hours===slot.morning.to.hour){
                         if(minutes>slot.morning.from.minutes){
                        return false
                    }else{
                        return  `${timeToString(slot.morning.from)}-${timeToString(slot.morning.to)}`
                    }
                 }else {
                    return  `${timeToString(slot.morning.from)}-${timeToString(slot.morning.to)}`
                }
                }
            // checking for evening case
           else if((hours>=slot.evening.from.hour) && (hours<=slot.evening.to.hour)){
                if(slot.evening.from.hour === slot.evening.to.hour ){
                        if(minutes<slot.evening.to.minutes){
                            return `${timeToString(slot.evening.from)}-${timeToString(slot.evening.to)}`
                        }else{
                            return false
                        }
                }
                if(hours===slot.evening.from.hour){
                    if(minutes<slot.evening.from.minutes){
                        return  false
                    }else{
                        return `${timeToString(slot.evening.from)}-${timeToString(slot.evening.to)}`
                    }
              }else if(hours===slot.evening.to.hour){
                     if(minutes>slot.evening.from.minutes){
                    return  false
                }else {
                    return `${timeToString(slot.evening.from)}-${timeToString(slot.evening.to)}`
                }
             }else {
                return `${timeToString(slot.evening.from)}-${timeToString(slot.evening.to)}`
            }
            }
            return false
        }
        
        save_changes = () =>{
         let  date = new Date(this.state.value)
         let day  = getDay(date.getDay())
         let slot = this.get_slot(day)
         let closed = slot.closed
         delete slot.closed
         try {
            if(!!closed){
                throw new Error("dummy_error_thrown")
            }
            let flag = this.valid_time(slot, date.getMinutes(), date.getHours())
            if(!!flag){
                console.log("Volla Entered a valid time")
                this.props.reschedule_appointment({
                    bookingType:this.props.type,
                    params:{
                        bookingId:this.props.value._id,
                        bookingStatus:"reschedule"
                    },
                    body:{
                        timeSlot:flag,
                        appointmentTime:date.getTime()
                    }
                })
            }else{
               console.log("Sorry Invalid time")   
               this.setState({
                   ret:{
                       success:false,
                       message:"Doctor not available on selected time"
                   }
               })
            }
         }
         catch(e){
             console.log(e)
             this.setState({
                 ret:{
                     success:false,
                     message:"Doctor not available on selected day"
                 }
             })
         }
        }
        render(){
           console.log(this.state,"state in reschedule_component")
           if(this.props.type==="cancelled_bookings")
           return <div></div>
            if(!this.state.reschedule_flag){
                return(
                    <p onClick={()=>this.reschedule_click()} className="res_udle underline">Reschedule</p>
                )
            }else{
                return (
                    <React.Fragment>
                         <NewNotif
                            ret = {this.state.ret}
                            retClr = {()=>this.setState({ret:false})}
                />
                    <div className="row"> 
                        <div className="col-md-6 ">
                         <p onClick={this.save_changes} style={{marginRight:'auto'}} className="res_udle underline">Save Changes</p>
                        </div>
                        <div className="col-md-6">
                         <p onClick={()=>this.setState({reschedule_flag:false})} style={{marginLeft:'auto'}} className="res_udle underline">Cancel</p>
                        </div>
                    </div>
                    <div>               
                    <DateTimePicker
                    defaultValue={this.props.value.appointmentTime? new Date(parseInt(this.props.value.appointmentTime,10)): new Date()}
                    autoFocus={true}
                    min={new Date()}
                    parse={str => new Date(str)}
                    step={90}
                    onChange = {(value)=>this.setState({value})}
                />
                 </div>
                 </React.Fragment>
                )
            }           
        }
}

export default RescheduleComponent