import React, { Component } from 'react'
import  "./AvailabilityComponent.css";
// import TimePicker from 'react-time-picker';
import { connect } from "react-redux";
import { getTimeslot, setAvailability, setAvailabilityClr } from "../../actions/userActions";
import ModalComponent from "../ModalComponent"
import TimeSlot from '../functional/TimeSlot'
import LoaderComponent from "../functional/LoaderComponent"
import NewNotif from   '../functional/NewNotif'
import AnimatedMount from "../../HOC/AnimatedMount"
import Button from '../functional/Button';

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
        console.log(fromHour==='12',"fromHour")
  let obj =   {
            from:{
              hour:fromAmpm==="PM"?fromHour==='12'?12:12+parseInt(fromHour,10):fromHour==='12'?0:parseInt(fromHour,10),
              minutes:parseInt(fromMinute,10)
            },
            to:{
              hour:toAmPm==="PM"?toHour==='12'?12:12+parseInt(toHour,10):toHour==='12'?0:parseInt(toHour,10),
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
        // console.log(hour,"hour in timetostring")
         let  hour =  time.hour>12?time.hour-12:time.hour===0?12:time.hour
         console.log(hour,time,"hour in timetostring")
         let minutes = time.minutes<10?`0${time.minutes}`:time.minutes
         let timeString = `${hour}:${minutes} ${time.hour>=12?time.hour===0?'AM':'PM':'AM'}`
         return timeString
      }
      handleTimeSubmit = (data) =>{
          let slot = [...this.state.slots]
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
             selecteDaySlots = {this.state.selecteDaySlots}
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
 console.log(item,"item in slotClicked")
  this.setState({
    selectedSlot:slot,
    selectedType:b,
    selectedshift:a,
    open:true,
    selectedDay:item,
    selecteDaySlots:item.slots
  })
}

setAvailabilityClr = () =>{
  this.setState({
    loading:false
  },()=>this.props.setAvailabilityClr())
}
    render() {
       console.log(this.state,"this.state in availability")
        return (
           <React.Fragment> 
             <NewNotif
                      ret = {this.state.ret}
                      retClr = {()=>this.setState({
                        setAvailabilityRet:false
                      })}
                  />       
                <div className='availability_content_rish new_card_class'>
                <div className= 'text-center'>  <h4 style={{position:'relative',paddingTop:'1rem'}} className="section_heading_rish">My Availability</h4></div>
                  <div className="time_she">
                  {this.state.loading &&  <LoaderComponent />}
                    <div className="row text-center mb_1rem">
                      <div className="col-lg-2"><h4>All</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-2"><h4>Closed</h4></div>
                    </div>
                   {this.state.slots.map((item,i)=>(
                      <div className="row text-center mb_1rem">
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
                      <Button style={{marginBottom:'1rem'}} onClick= {()=>this.handleSubmitAvail()}>Submit</Button>
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
})(connect(mapStateToProps, {getTimeslot, setAvailability, setAvailabilityClr} )(AvailabilityComponent))