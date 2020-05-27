import React, { Component } from 'react'
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import  "./AvailabilityComponent.css";
// import TimePicker from 'react-time-picker';
import { connect } from "react-redux";
import { getTimeslot, setAvailability, setAvailabilityClr } from "../../actions/userActions";
import ModalComponent from "../ModalComponent"
import TimeSlot from '../functional/TimeSlot'
import LoaderComponent from "../functional/LoaderComponent"
import NotifFunc from   '../functional/NotifFunc'

class AvailabilityComponent extends Component {
   constructor(props) {
        super(props);
        this.state = {
          open:false,
          selectedSlot:{},
          loading:false,
          selectedType:{},
          selectedshift:{},
          selectedDay:{},
          firstRender:true,
          slots:[]
     
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
let obj =   {
          from:{
            hour:fromAmpm==="PM"?12+parseInt(fromHour,10):parseInt(fromHour,10),
            minutes:parseInt(fromMinute,10)
          },
          to:{
            hour:toAmPm==="PM"?12+parseInt(toHour,10):parseInt(toHour,10),
            minutes:parseInt(toMinutes,10)
          }
      }
         return obj
      }
      componentWillReceiveProps(nextProps){
      
        
        if(((!!nextProps.timeSlot) && (this.state.firstRender))){
          let arr = []
          nextProps.timeSlot.forEach((item,i)=>{
                let obj = {}
                obj.day =this.getDay(i)
                obj.closed = item.closed==="false"?false:true
                obj.slots = {
                morning: this.stringToTime(item.slots[0]),
                evening: this.stringToTime(item.slots[1])
                }
                arr.push(obj)
          })
          this.setState({
            slots:arr,
            firstRender:false
          })
        }
      }
      timeToString = (time) =>{
         let  hour =  time.hour>12?time.hour-12:time.hour
         let minutes = time.minutes<10?`0${time.minutes}`:time.minutes
         let timeString = `${hour}:${minutes} ${time.hour>12?'PM':'AM'}`
         return timeString
      }

      handleTimeSubmit = (data) =>{
       
          let slot = JSON.parse(JSON.stringify(this.state.slots))
          let index  = ''
          let newSlot  = slot.filter((item,i)=>{
                    if(item.day === this.state.selectedDay.day){
                      index = i
                    }
                  return item.day !== this.state.selectedDay.day
          })
          let newObject = {
            ...this.state.selectedDay,
            slots: {...this.state.selectedDay.slots,
                  [this.state.selectedshift]:{
                    ...this.state.selectedDay.slots[this.state.selectedshift],[this.state.selectedType]:{
                      ...data
                    }
                  }
            }
          }
          newSlot.splice(index,0,newObject)
        
          this.setState({
            slots:newSlot,
            selectedSlot:{},
            selectedType:{},
            selectedshift:{},
            selectedDay:{},
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
        this.setState({
          loading:true
        },()=>this.props.setAvailability({
          timeSlots:this.generateSlotsFormat()
        }))
      }

      // componentWillReceiveProps(nextProps){
      //   if(!!nextProps.setAvailabilityRet){
      //     if(!!nextProps.setAvailabilityRet.success){
      //       console.log();
      //     }else{
      //       console.log();
      //     }
      //     nextProps.setAvailabilityClr()
      //     this.setLoadingOff()
      //   }
      // }
      
  generateTimeSlot = () =>{
    return(
        <React.Fragment>
            <TimeSlot
             selectedSlot = {this.state.selectedSlot}
             selectedType = {this.state.selectedType}
             selectedshift = {this.state.selectedshift}
             submit = {this.handleTimeSubmit}
             setAvailabilityRet = {this.props.setAvailabilityRet}
             setAvailabilityClr = {this.props.setAvailabilityClr}
             loadingOff = {()=>this.setLoadingOff()}
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
    let slots = JSON.parse(JSON.stringify(this.state.slots))
    let arr = []
    slots.forEach((item,i)=>{
      let obj = {}
      obj = {
        closed:item.closed,
        day:item.day,
        slots:[`${this.timeToString(item.slots.morning.from)}-${this.timeToString(item.slots.morning.to)}`,`${this.timeToString(item.slots.evening.from)}-${this.timeToString(item.slots.evening.to)}`]
      }
      arr.push(obj)
    })
  
    
    return arr

   
}

onOpenModal = () => {
  this.setState({ open: true });
};

onCloseModal = () => {
  this.setState({ open: false });
};

slotClicked = (slot,a,b,item )  =>{
 
  this.setState({
    selectedSlot:slot,
    selectedType:b,
    selectedshift:a,
    open:true,
    selectedDay:item
  })
}

setAvailabilityClr = () =>{
  this.setState({
    loading:false
  },()=>this.props.setAvailabilityClr())
}
    render() {
     
        return (
           <React.Fragment> 
             <NotifFunc
                      ret = {this.props.setAvailabilityRet}
                      retClr = {this.setAvailabilityClr}
                  />       
                <div className= 'col-md-8 col-xl-8 AvailableTime AllComponents my_av_sec'>
                <div className= 'text-center'><h4 className="abt_sec"><b>My Availability</b></h4></div>
                  <div className="time_she">
                  {this.state.loading &&  <LoaderComponent />}
                    <div className="row text-center">
                      <div className="col-lg-2"><h4>All</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-2"><h4>Closed</h4></div>
                    </div>
                   {this.state.slots.map((item,i)=>(
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">{item.day.charAt(0).toUpperCase()}</p></div>
                      <div className="col-lg-4"><p><span onClick={()=>this.slotClicked(item.slots.morning,'morning','from', item)} className="time_bor cursor-pointer">{this.timeToString(item.slots.morning.from)}</span><span onClick={()=>this.slotClicked(item.slots.morning,'morning','to', item)} className="time_bor cursor-pointer">{this.timeToString(item.slots.morning.to)}</span></p></div>
                      <div className="col-lg-4"><p><span onClick={()=>this.slotClicked(item.slots.evening,'evening','from', item)} className="time_bor cursor-pointer">{this.timeToString(item.slots.evening.from)}</span><span onClick={()=>this.slotClicked(item.slots.evening,'evening','to', item)} className="time_bor cursor-pointer">{this.timeToString(item.slots.evening.to)}</span></p></div>
                      <div className="col-lg-2">
                         <div 
                      onClick = {(e)=>this.handleCloseDay(item,i,e)} 
                      className='circul_rund'> 
                    <label className={item.closed?'green-background ':''} for="checkbox"></label></div></div>
                    </div>
                   ))}
                      <div className="time_clo my_avl text-center">
                      <button onClick= {()=>this.handleSubmitAvail()} className="common-button">Submit</button>
                      </div>
                </div>
                </div>
                <div className='col-md-2'>
                </div>
            <ModalComponent 
                open = {this.state.open}
                handleClose = {this.onCloseModal}
                modalBody = {this.generateTimeSlot}
                />  
     </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
   timeSlot : state.user.timeSlot,
   setAvailabilityRet:state.user.setAvailabilityRet
 })
export default connect(mapStateToProps, {getTimeslot, setAvailability, setAvailabilityClr} )(AvailabilityComponent);