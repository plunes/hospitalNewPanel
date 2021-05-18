import React from "react"
import TimerComponent from '../TimerComponent'
import AnimatedMount from "../../HOC/AnimatedMount"
import ProfileAvatar from "../functional/ProfileAvatar"
import PhotoGallery from "../functional/PhotoGallery"
import VideoSection from "../functional/VideoSection"
import PdfSection from "../functional/PdfSection"
import { Link } from "react-router-dom"

class InsightComponent extends React.PureComponent {
    constructor(props){
        super(props)
        this.state={
            valid:true,
            toggler:false,
            view_more:false
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
            timer:seconds>604800?0:604800-seconds,
            active:seconds>604800?0:604800-seconds
        }
 }

 componentDidMount(){
    console.log(this.props.s,"this.props.s in Insight Component")
 }


 

    render(){
        const { userReport } = this.props.s
        console.log(this.props.s,"this.props.s in Insight")
        let obj = this.getSecondsDifferent(this.props.s.createdAt)
       
        const index = this.props.index
      return (
          <React.Fragment>  
                <div id={`${index}-insight-wrapper`} className={`${this.props.s.suggested?`action_insight_wrapper with_suggested ${this.state.view_more?"action_insight_wrapper_elongated":''}`:`action_insight_wrapper ${this.state.view_more?"action_insight_wrapper_elongated":''}`}`} key={index}>
                    <span className="action_insight_image_wrapper">
                        {/* <img src ="/icon/insight_image.svg" className="action_insight_image"/> */}
                        <ProfileAvatar name = {this.props.s.userName} />
                    </span>
                    <span className="insight_component_info_wrap">
                    <div  className="RealtimeUsername">
                {this.props.s.userName}
                <span className="is_looking">is looking for {this.props.s.serviceName}</span>
                <span className="some_random_address" >{!!this.props.s.centerLocation?this.props.s.centerLocation:''}</span>
            </div>
            <div>
      {/* <p style={{marginBottom:'.5rem'}} className="light_content"> is looking for {this.props.s.serviceName}{!!this.props.s.centerLocation?<text className="green_text_rish"> {this.props.s.centerLocation}</text>:''}</p> */}
            </div>
            {/* {
             ((!this.props.s.booked) && (obj.active))?
                    <text type="button" className="InsightUpdate kindlyUpdate" onClick={(e) => this.props.handleRealPrice(this.props.s)}><u>Kindly update your price</u> <img className='arrow_class' src='/icon/green_arrow.svg' /> </text>
                    :this.props.s.professionalBooked?
                    <text className="InsightUpdate kindlyUpdate"><u>Booking Confirmed.</u></text>:<span className="sorry_text">Sorry! You lost the booking.<i style={{color:'DE7B56',top:'1px', position:'relative'}} className="far fa-frown"></i></span>}
            */}
            </span>
                 <span className='insight_component_time_wrap vertical_align_rish'>
            {
               true ?
                    <div style={{height:'100%'}} className="text-center">
                        <React.Fragment>
                            <div className="insight_location_wrapper">
                        <img src="https://service-family-images.s3.ap-south-1.amazonaws.com/analytics-panel-images/insight_location_icon.png"
                         className="insight_location_icon" />
                         <span>{this.props.s.distance} Km</span>
                         </div>
                        {/* <TimerComponent 
                          seconds = {obj.timer}
                          key={Math.random()}
                          toggler = {this.toggler}
                          data = {this.props.s}
                        /> */}
                        </React.Fragment>
                    </div>
                    : <div>
                    </div>
            }
            {/* <span className='insight_time_span'>{getDateFormat(this.props.s.createdAt)}</span> */}
        </span>
        {/* onClick={()=>this.props.not_notify_toggle(this.props.s)}  */}
      <div className="service_not_available_wrapper">
          <div className="action_insight_image_wrapper">
          </div>
        <div className="service_not_available_parent">
           <div className="service_not_available_wrap">  
           {!this.props.s.priceUpdated ?  <Link className="service_not_available_text_wrap" to={`/dashboard/solution?id=${this.props.s.solutionId}&serviceId=${this.props.s.serviceId}`}> 
                 <text className="service_not_available_text">
                         {this.props.s.priceUpdated?this.props.s.category==="Procedure"?"Price submitted":"Price updated":this.props.s.category==="Procedure"?"Submit price":"Update price"}
                    </text>
            </Link>: <div className="service_not_available_text_wrap"><text className="service_not_available_text">
                         {this.props.s.priceUpdated?this.props.s.category==="Procedure"?"Price submitted":"Price updated":this.props.s.category==="Procedure"?"Submit price":"Update price"}
                    </text>
                    </div>
           }

            </div>
        </div>
        <div className="insight_time_wrapper">
        <TimerComponent 
                seconds = {obj.timer}
                key={Math.random()}
                toggler = {this.toggler}
                data = {this.props.s}
            />
        </div>
    </div> 

    {this.state.view_more  &&  <div className="additional_info_23">
        <div className="insight_additional_wrapper">
             
                 {userReport.additionalDetails &&  <div className="insight_additional_wrapper_child">   <div className="insight_additional_info_heading">
                   Additional Details of the service
                 </div>
                 <div className="insight_additional_info_content">
                    {userReport.additionalDetails}
                 </div> </div>}


             {userReport.description &&  <div className="insight_additional_wrapper_child">   <div className="insight_additional_info_heading">
             Previous Treatment Detail's
                 </div>
                 <div className="insight_additional_info_content">
                     {userReport.description}
                 </div> </div>}
        </div>

        {userReport.imageUrl.length !==0  && userReport.videoUrl.length !==0  && userReport.reportUrl.length !==0  &&
        <div className="flex-parent-3 u-margin-top-medium">
            {userReport.imageUrl.length !==0  &&  <div className="flex-child-3">
                <div className="insight_additional_info_heading">
                   Photos
                </div>
                <div className="photo-gallery-wrapper">
                    <PhotoGallery data={userReport.imageUrl} id="photo-gallery-id" />
                </div>
             </div>}
             {userReport.videoUrl.length !==0  &&  <div className="flex-child-3">
                <div className="insight_additional_info_heading">
                   Videos
                </div>
                <div className="photo-gallery-wrapper">
                    <VideoSection data={userReport.videoUrl}  />
                </div>
             </div>}
             {userReport.reportUrl.length !==0  &&  <div className="flex-child-3">
                <div className="insight_additional_info_heading">
                   Reports
                </div>
                <div className="photo-gallery-wrapper">
                    <PdfSection data={userReport.reportUrl}  />
                </div>
             </div>}
        </div>}
        <div className="view-less-wrapper">
            <span onClick={()=>this.setState({view_more: !this.state.view_more})} className="view_more_text">
                {this.state.view_more?"View Less":"View More"}
            </span>
        </div>
            </div>}
  </div>
  {(this.props.s.userReport && !this.state.view_more) &&  <div id={`${index}-view-more-insight`}  className={this.state.view_more?"insight_view_more_details-elongate insight_view_more_details":"insight_view_more_details"}>
        <span onClick={()=>this.setState({view_more: !this.state.view_more})} className="view_more_text">
            {this.state.view_more?"View Less":"View More"}
        </span>
    </div> } 
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