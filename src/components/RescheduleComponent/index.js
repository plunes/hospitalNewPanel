import React from "react"
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { getDay, timeToString } from "../../utils/common_utilities"
import NewNotif from "../functional/NewNotif"

function MyError(message){
    this.message = message;
}

MyError.prototype = new Error()

class RescheduleComponent extends React.PureComponent {
        constructor(props){
            super(props)
            this.state = {
                valid:true,
                value:!!this.props.value?new Date(parseInt(this.props.value.appointmentTime,10)):new Date,
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
             try {
                 if(this.props.value.bookingStatus==="Cancellation Requested"){
                    throw new MyError(`Cannot reschedule appointment, User have requested a cancellation`)
                 }
                this.setState(
                    {
                    reschedule_flag:true
                    },()=>this.props.selected_callback(this.props.value))
             } catch (error) {
                this.setState({
                    ret:{
                        success:false,
                        message:error.message
                    }
                })
             }
           
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
           console.log(data, minutes, hours,"data, minutes, hours")
           let current_timestamp = new Date(2020, 1, 1, hours , minutes , 0 , 0).getTime()
           let  result = false
           try {
               data.slots.forEach(item=>{
                   if(current_timestamp>item.from.timestamp && current_timestamp < item.to.timestamp){
                       result = true
                       throw new Error("Some error")
                   }
               })
           } catch (e){
                console.log(e)
           }
           return result
          
        }
        
        save_changes = () =>{
            console.log(this.state,"this.state in save_changes")
            if(this.state.value.getTime()!==(new Date(parseInt(this.props.value.appointmentTime,10)).getTime())){
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
 
        }
        render(){
           console.log(this.state,"state in reschedule_component")
           if(this.props.type==="cancelled_bookings")
           return <div></div>
            if(!this.state.reschedule_flag){
                return(
                    <React.Fragment>
                        <NewNotif
                            ret = {this.state.ret}
                            retClr = {()=>this.setState({ret:false})}
                />
                <p onClick={()=>this.reschedule_click()} className="res_udle underline">Reschedule</p>
                    </React.Fragment>
                    
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
                    step={1}
                    onChange = {(value)=>this.setState({value})}
                />
                 </div>
                 </React.Fragment>
                )
            }           
        }
}

export default RescheduleComponent