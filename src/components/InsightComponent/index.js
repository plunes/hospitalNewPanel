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
      return (
        <div className='row' key={this.props.index}>
        <div className='col-md-2  realtime vertical_align_rish'>
            <span className="realtimeicon1 center_align_rish vertical_align_rish"><img src="/realtimerows.svg" className="realtimeicon center_align_rish vertical_align_rish" alt=""></img></span>
        </div>
        <div className='col-md-7 vertical_align_rish'>
            <div className="RealtimeUsername">
                {this.props.s.userName}
            </div>
            <div>
               <p style={{marginBottom:'.5rem'}} className="light_content"> is looking for {this.props.s.serviceName}</p>
            </div>
            {
              seconds_diff >0 ?
                    <button type="button" className="InsightUpdate kindlyUpdate" onClick={(e) => this.props.handleRealPrice(this.props.s)}><u>Kindly update your price</u></button>
                    : <span className="sorry_text">Sorry! You lost the booking.<i style={{color:'DE7B56',top:'1px', position:'relative'}} className="far fa-frown"></i></span>
            }
        </div>
        <div className='col-md-3 vertical_align_rish'>
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
        </div><hr className="RealtimeHr"></hr>
    </div>

      )
    }
}
export default InsightComponent