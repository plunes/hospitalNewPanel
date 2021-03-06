import React, { Component } from 'react'
import  "../DashboardComponent/AvailabilityComponent.css";
import  "./index.scss";
// import TimePicker from 'react-time-picker';
import { connect } from "react-redux";
import { getTimeslot, setAvailability, setAvailabilityClr } from "../../actions/userActions";
import ModalComponent from "../ModalComponent"
import TimeSlot from '../functional/TimeSlot'
import LoaderComponent from "../functional/LoaderComponent"
import NewNotif from   '../functional/NewNotif'
import AnimatedMount from "../../HOC/AnimatedMount"
import Button from '../functional/Button';
import WeekWidget from "../functional/WeekWidget"
import Timerow from "../functional/Timerow"
import UpdateSlot from '../functional/UpdateSlot'
import { fas } from '@fortawesome/free-solid-svg-icons';

class AvailabilityPage extends Component {
   constructor(props) {
        super(props);
        this.state = {
          open:false,
          selectedSlot:{},
          loading:false,
          selectedType:{},
          selectedshift:{},
          selectedDay:{},
          selected_days:[],
          firstRender:true,
          slots:[],
          selected_slot:{
            slots:[]
          }
        }
      }
      async componentDidMount(){
         await this.props.getTimeslot();
      }
      stringToTime =(str)=>{
        let arr = str.split('-')
        let fromMinute = arr[0].split(" ")[0].split(':')[1]
        let fromHour = arr[0].split(" ")[0].split(':')[0]
        let fromAmpm = arr[0].split(" ")[1]
        let toMinutes = arr[1].split(" ")[0].split(':')[1]
        let toHour = arr[1].split(" ")[0].split(':')[0]
        let toAmPm = arr[1].split(" ")[1]
        console.log(fromHour==='12',"fromHour")
  let obj =   {
            from:{
              hour:fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10),
              minutes:parseInt(fromMinute,10),
              timestamp:new Date(2020, 1, 1, fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10) , parseInt(fromMinute,10) , 0 , 0).getTime()?new Date(2020, 1, 1, fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10) , parseInt(fromMinute,10) , 0 , 0).getTime():0
            },
            to:{
              hour:toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10),
              minutes:parseInt(toMinutes,10),
              timestamp:new Date(2020, 1, 1,toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10) , parseInt(toMinutes,10) , 0 , 0).getTime()?new Date(2020, 1, 1,toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10) , parseInt(toMinutes,10) , 0 , 0).getTime():0
            }
        }
           return obj
        }
      componentWillReceiveProps(nextProps){
        if(((!!nextProps.timeSlot) && (this.state.firstRender))){
          console.log(nextProps.timeSlot,"time Slot in Availability page")
          let arr = []
          nextProps.timeSlot.forEach((item,i)=>{
              console.log(item.slots,"=====================================>")
              let time_slots = [...item.slots]
              let slots_arr = []
              time_slots.forEach(data=>{
                slots_arr.push(this.stringToTime(data))
              })
                let obj = {}
                obj.day =this.getDay(i)
                obj.closed = item.closed==="false"?false:true
                obj.slots = slots_arr
                arr.push(obj)
          })
          this.setState({
            slots:arr,
            firstRender:false,
            selected_slot:arr[0],
            selected_days:[]
          })
        }

     
        if(nextProps.setAvailabilityRet){
          if(nextProps.setAvailabilityRet.success){
              this.setState({
                ret:{
                  success:true,
                  message:nextProps.setAvailabilityRet.message
                },
                loading:false
              })
          }else{
            this.setState({
              ret:{
                success:false,
                message:nextProps.setAvailabilityRet.message
              },
              loading:false
            })
          }
          nextProps.setAvailabilityClr()
        }
      }
      timeToString = (time) =>{
        if(!time){
          return 'N/A'
        }
        // console.log(hour,"hour in timetostring")
         let  hour =  time.hour>12?time.hour-12:time.hour===0?12:time.hour
         console.log(hour,time,"hour in timetostring")
         let minutes = time.minutes<10?`0${time.minutes}`:time.minutes
         let timeString = `${hour}:${minutes} ${time.hour>=12?time.hour===0?'AM':'PM':'AM'}`
         return timeString
      }
      add_slot = () => {
        if(this.state.selected_slot.slots.length!==0){
          if(!!this.state.selected_slot.slots[this.state.selected_slot.slots.length -1].from)
          {
           let updated_selected_slot = [...this.state.selected_slot.slots]
           updated_selected_slot.push({
             from: false,
             to: false
           })
           console.log(updated_selected_slot,"updated_selected_slot")
           this.setState({
             selected_slot:{
               ...this.state.selected_slot,
               slots:updated_selected_slot
             },
             slots:[...this.state.slots].map(item=>{
                  if(item.day===this.state.selected_slot.day){
                    let arr =  [...item.slots]
                    arr.push({
                     from: false,
                     to: false
                   })
                     return  {
                       ...item,
                       slots:arr
                     }
                  }else{
                    return item
                  }
             })
           })
          }
        }else {
          this.setState({
            selected_slot:{
              ...this.state.selected_slot,
              slots:[{
                from: false,
                to: false,
                timestamp:undefined
              }]
            }
          })
        }
        
      }

      handleTimeSubmit = (data) =>{
  console.log(data,"data in handleTimeSubmit")

  let slots = this.state.slots
   let updated_slots = slots.map(item=>{
     if(item.day === data.day){
       return {
         ...item,
         slots:data.slots,
       }
     }else{
       return item
     }
   })


   console.log(updated_slots,"updated_slots")

   this.setState({
     slots:[...updated_slots],
     selected_slot:data,
     open:false
   })

      }
     
      handleCloseDay = (data,i,e) => {
        e.stopPropagation()
        let slot = JSON.parse(JSON.stringify(this.state.slots))
        let index  = ''
        let newSlot  = slot.filter((item,j)=>{
                  if(item.day === data.day){
                    index = j
                  }
                return  item.day !== data.day
        })
        let newObject = {
          ...data,
          closed:!data.closed
        }
        newSlot.splice(i,0,newObject)
        this.setState({
          slots:newSlot
        })
      }

      setLoadingOff = () =>{
        this.setState({
          loading:false
        })
      }

      handleSubmitAvail = () =>{
        let slots = this.generateSlotsFormat()
        if(!!slots){
          console.log("Succcess")
            this.setState({
                    loading:true
                  },()=>{
                    if(this.props.prof_data.isAdmin){
                      this.toggle_update_slot_modal_flag()
                    }else{
                       this.props.setAvailability({
                      timeSlots:this.generateSlotsFormat()
                    })
                    }
                  })
        }else {
          this.setState({
            ret:{
              success:false,
              message:'Please select valid time slots'
            }
          })
        }
      }
      
  generateTimeSlot = () =>{
    return(
        <React.Fragment>
            <TimeSlot
             selected_time = {this.state.selected_time}
           
             submit = {this.handleTimeSubmit}
             setAvailabilityRet = {this.props.setAvailabilityRet}
             setAvailabilityClr = {this.props.setAvailabilityClr}
             loadingOff = {()=>this.setLoadingOff()}
             selected_slot = {this.state.selected_slot}
            />
        </React.Fragment> 
    )
}

getDay = (i) =>{
   switch (i) {
    case 0:
      return 'Monday'
      break;
    case 1:
      return 'Tuesday'
      break;
    case 2:
      return 'Wednesday'
      break;
    case 3:
      return 'Thursday'
      break;
    case 4:
      return 'Friday'
      break;
    case 5:
     return 'Saturday'
     break;
    case 6:
     return 'Sunday'
     break;
   
     default:
       break;
   }
}

generateSlotsFormat = () =>{
    let slots = [...this.state.slots]
    let arr = []
    console.log(slots,"slots in generateSlotsFormat")

    try {
      slots.forEach((item,i)=>{
        let push_flag = true
        let obj = {}
        let slots = []
        item.slots.forEach(slot=>{
          console.log(slot,"slot")
          if(!((!slot.from) || (!slot.to))){
            slots.push(`${this.timeToString(slot.from)}-${this.timeToString(slot.to)}`)
        } 
        })
        obj = {
          closed:item.closed,
          day:item.day,
          slots:slots
        }
        if(obj.slots.length===0){
          throw new Error("Invalid Time Slots")
        }
        arr.push(obj)
      })
     
     
    } catch(e) {
      console.log(e)
      arr = false
    }
    return arr 
}

onCloseModal = () => {
  this.setState({ open: false });
};


time_selected = (data) => {
  console.log(data,"data in time_selected")
  this.setState({
    selected_time:data,
    open:true,
  })
}

set_slot = (day) => {
  this.setState({
    selected_slot:[...this.state.slots].filter(item=>{
      return (item.day === day)
    })[0]
  })
}

sloct_checkbox = () => {
  let updated_selected_slot = {...this.state.selected_slot, closed: !this.state.selected_slot.closed}
  this.setState({
    selected_slot:{
      ...updated_selected_slot
    },
    slots:[...this.state.slots].map(item=>{
         if(item.day===this.state.selected_slot.day){
             return {...updated_selected_slot}
         }else{
           return item
         }
    })
  })
}

remove_slot = (val) => {
  console.log(val,"val in remove_slot")
  let updated_selected_slot = [...this.state.selected_slot.slots].filter((item,key)=>{
    return val!==key
  })
  console.log(updated_selected_slot,"updated_selected_slot")
  this.setState({
    selected_slot:{
      ...this.state.selected_slot,
      slots:updated_selected_slot
    },
    slots:[...this.state.slots].map(item=>{
         if(item.day===this.state.selected_slot.day){
           let arr =  [...item.slots].filter((item,key)=>{
            return val!==key
          })
            return  {
              ...item,
              slots:arr
            }
         }else{
           return item
         }
    })
  })
}

setAvailabilityClr = () =>{
  this.setState({
    loading:false
  },()=>this.props.setAvailabilityClr())
}

set_selected_days =(day) => {
  console.log(day, this.state.selected_days,"set_selected_days")
  let arr = [...this.state.selected_days]
  if(!arr.includes(day)){
    arr.push(day)
    this.setState({
      selected_days:arr
    })
  }else {
    const index = arr.indexOf(day);
      if (index > -1) {
        arr.splice(index, 1);
      }
      console.log(arr,"arr after splice")
      this.setState({
        selected_days:arr
      })
  }
 
}

apply_to_all = () => {
  console.log(this.state.selected_slot,this.state.selected_days, this.state.slots,"===============>>>")
  if(this.state.selected_days.length !==0){
    this.setState({
      ret:{
        success:true,
        message:"Time slots applied to selected days."
      },
      slots:[...this.state.slots].map(item=>{
          let slot = item
          try {
              this.state.selected_days.forEach(data=>{
                 if(data === item.day){
                      slot = {
                        ...this.state.selected_slot,
                        day:item.day
                       }
                       throw new Error('Dummy error')
                 }
              })
          }catch (e) {
            console.log(e)
  
          }
          return slot
      }),
      selected_days:[]
      
    })
  }else {
    this.setState({
      ret:{
        success:false,
        message:"Please select a day."
      }
    })
  }

}

toggle_update_slot_modal_flag = () =>{
  this.setState({
    update_slot_modal_flag:!this.state.update_slot_modal_flag
  })
}

generate_update_slot_modal = () => {
    return (<React.Fragment>
         <UpdateSlot   
            toggle_update_slot_modal_flag = {this.toggle_update_slot_modal_flag}
            update_time_slots = {this.update_time_slots}
         />
    </React.Fragment>)
}


update_time_slots = (data)=>{
       this.props.setAvailability({
                      ...data,
                      timeSlots:this.generateSlotsFormat(),
           })
           setTimeout(()=>this.toggle_update_slot_modal_flag(),1000)
}


    render() {
       console.log(this.props,"this.props in availability")
        return (
           <React.Fragment> 
             <NewNotif
                ret = {this.state.ret}
                retClr = {()=>this.setState({
                    setAvailabilityRet:false
                })}
                  />   
                <div className="availability_heading_div">
                     <span className="availability_heading_span">
                       Enter your time slots correctly so that you obtain reservations according to your availability
                     </span>
                </div>    
                <div className='availability_content_rish new_card_class u-margin-top-small'>
                            <div className="u-margin-5-auto u-margin-top-small">
                                 <WeekWidget
                                   variant = {"box"}
                                   data={this.state.selected_slot}
                                   onClick={this.set_slot}
                                 />
                                
                            </div>
                            <div className=" u-margin-top-small">
                              <div className="checkbox-input checkbox-big u-display-flex">
                                  <input checked={!this.state.selected_slot.closed} onClick={()=>this.sloct_checkbox()} type="checkbox" id="html"/>
                                   <label  className="u-margin-auto" for="html">{!this.state.selected_slot.closed?'OPEN':'CLOSED'}</label>
                              </div>
                            </div>
                            {this.state.selected_slot.slots.map((item, i)=>{
                              console.log(i,"i in map")
                              return   <div className="u-margin-top-small">
                                    <Timerow 
                                        data = {item}
                                        remove_slot = {this.remove_slot}
                                        key_prop={i}
                                        timeToString = {this.timeToString}
                                        time_selected = {this.time_selected}
                                      />  
                            </div>
                            })}
                             <div className="u-margin-top-small">
                                 <img onClick={this.add_slot}   src="/add_icon.svg" className="add-icon-time-row cursor-pointer" />
                             </div>
                             <div className="u-margin-top-mini">
                                 <span className="add-more-slots">Add more slots</span>
                             </div>
                             <div className='u-margin-top-mini text-center'>
                                  <Button style={{fontSize:"2rem"}}  onClick={()=>this.handleSubmitAvail()}>Submit</Button>
                             </div> 
                           
                 </div>

                 <div className='new_card_class u-margin-top-small text-center'>
                  <span className="availability_heading_span">
                      Apply this time slot to
                  </span>
                  <div className="u-margin-5-auto u-margin-top-small">
                                 <WeekWidget
                                   variant = {"circle"}
                                   data={this.state.selected_slot}
                                   selected_days={this.state.selected_days}
                                   onClick={this.set_selected_days}
                                   alternate = {true}
                                 />
                                
                    </div>
                    <div className='u-margin-top-small text-center'>
                                  <Button style={{fontSize:"2rem"}}  onClick={()=>this.apply_to_all()}>Apply</Button>
                      </div> 
                 </div>
                   
                  
            <ModalComponent 
                open = {this.state.open}
                handleClose = {this.onCloseModal}
                modalBody = {this.generateTimeSlot}
                />  
             <ModalComponent 
                open = {this.state.update_slot_modal_flag}
                handleClose = {this.toggle_update_slot_modal_flag}
                modalBody = {this.generate_update_slot_modal}
                no_cross= {true}
                />  
     </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
   timeSlot : state.user.timeSlot,
   setAvailabilityRet:state.user.setAvailabilityRet,
   prof_data:state.user.data.prof_data
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
})(connect(mapStateToProps, {getTimeslot, setAvailability, setAvailabilityClr} )(AvailabilityPage))