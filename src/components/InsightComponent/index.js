import React from "react"
import TimerComponent from '../TimerComponent'

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
        return seconds>600?0:600-seconds
 }



    render(){
        // console.log(this.props,"this.props in Insight")
        let seconds_diff = this.getSecondsDifferent(this.props.s.createdAt)
        const index = this.props.index
      return (
          <React.Fragment>  
                <div className="action_insight_wrapper" key={index}>
                    <span className="action_insight_image_wrapper">
                        <img src ="/icon/insight_image.svg" className="action_insight_image"/>
                    </span>
                    <span className="insight_component_info_wrap">
                    <div className="RealtimeUsername">
                {this.props.s.userName}
            </div>
            <div>
      <p style={{marginBottom:'.5rem'}} className="light_content"> is looking for {this.props.s.serviceName}{!!this.props.s.centerLocation?<text className="green_text_rish"> {this.props.s.centerLocation}</text>:''}</p>
            </div>
            {
              true>0?
                    <text type="button" className="InsightUpdate kindlyUpdate" onClick={(e) => this.props.handleRealPrice(this.props.s)}><u>Kindly update your price</u></text>
                    : <span className="sorry_text">Sorry! You lost the booking.<i style={{color:'DE7B56',top:'1px', position:'relative'}} className="far fa-frown"></i></span>
            }
            </span>
                 <span className='insight_component_time_wrap vertical_align_rish'>
            {
               true ?
                    <div style={{height:'100%'}} className="text-center">
                        <React.Fragment>
                        <TimerComponent 
                          seconds = {seconds_diff}
                          key={Math.random()}
                          toggler = {this.toggler}
                        />
                        </React.Fragment>
                    </div>
                    : <div>
                    </div>
            }
        </span>
                </div>
                <hr></hr>
          </React.Fragment>
      )
    }
}
export default InsightComponent