import React from "react"
import TimerComponent from '../TimerComponent'
import AnimatedMount from "../../HOC/AnimatedMount"
import ProfileAvatar from "../functional/ProfileAvatar"

import  { getDateFormat } from "../../utils/common_utilities"

class InsightComponent extends React.PureComponent {
    constructor(props){
        super(props)
        this.state={
            valid:true,
            toggler:false
        }
    }

    toggler = () =>{
        this.setState({
            toggler:!this.state.toggler
        })
    }

    getSecondsDifferent=(sec)=>{
        let newSec = (new Date).getTime()
     //    console.log(newSec,"newSec in getSeconds Differnce")
        let seconds = (newSec-sec)/1000
        return {
            timer:seconds>3600?0:3600-seconds,
            active:seconds>3600?0:3600-seconds
        }
 }



    render(){
        // console.log(this.props,"this.props in Insight")
        let obj = this.getSecondsDifferent(this.props.s.createdAt)
        const index = this.props.index
      return (
          <React.Fragment>  
                <div className={`${this.props.s.suggested?"action_insight_wrapper with_suggested":'action_insight_wrapper'}`} key={index}>
                    <span className="action_insight_image_wrapper">
                        {/* <img src ="/icon/insight_image.svg" className="action_insight_image"/> */}
                        <ProfileAvatar name = {this.props.s.userName} />
                    </span>
                    <span className="insight_component_info_wrap">
                    <div  className="RealtimeUsername">
                {this.props.s.userName}
            </div>
            <div>
      <p style={{marginBottom:'.5rem'}} className="light_content"> is looking for {this.props.s.serviceName}{!!this.props.s.centerLocation?<text className="green_text_rish"> {this.props.s.centerLocation}</text>:''}</p>
            </div>
            {
             !this.props.s.booked?
                    <text type="button" className="InsightUpdate kindlyUpdate" onClick={(e) => this.props.handleRealPrice(this.props.s)}><u>Kindly update your price</u> <img className='arrow_class' src='/icon/green_arrow.svg' /> </text>
                    :this.props.s.professionalBooked?
                    <text className="InsightUpdate kindlyUpdate"><u>Booking Confirmed.</u></text>:<span className="sorry_text">Sorry! You lost the booking.<i style={{color:'DE7B56',top:'1px', position:'relative'}} className="far fa-frown"></i></span>}
            </span>
                 <span className='insight_component_time_wrap vertical_align_rish'>
            {
               true ?
                    <div style={{height:'100%'}} className="text-center">
                        <React.Fragment>
                        <TimerComponent 
                          seconds = {obj.timer}
                          key={Math.random()}
                          toggler = {this.toggler}
                          data = {this.props.s}
                        />
                        </React.Fragment>
                    </div>
                    : <div>
                    </div>
            }
            <span className='insight_time_span'>{getDateFormat(this.props.s.createdAt)}</span>
        </span>
     {this.props.s.suggested &&  <div onClick={()=>this.props.not_notify_toggle(this.props.s)} className="service_not_available_wrapper">
        <div className="service_not_available_parent">
            <span className="service_not_available_icon_wrap">
                <img src="/email.svg"  className="service_not_available_img" />
            </span> 
            <span className="service_not_available_text_wrap">
                  <text className="service_not_available_text">
                        Service Not Available
                  </text>
            </span>
        </div>
    </div> }
        
       
                </div>
                
                {/* <hr></hr> */}
          </React.Fragment>
      )
    }
}

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
  })(InsightComponent);