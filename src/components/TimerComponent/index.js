import React from 'react'

function get2D( num ) {
    if( num.toString().length < 2 )
        return "0" + num; 
    return num.toString(); 
}

class TimerComponent extends React.Component {
    constructor() {
      super();
      this.state = { 
          time: {},
          seconds: 0,
          firstRender:true };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }

    componentWillUnmount(){
      clearInterval(this.timer);
    }

    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));

      let days = Math.floor(secs / (60 * 60 * 24))
      
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "d":days,
        "h": get2D(hours),
        "m": get2D(minutes),
        "s": get2D(seconds)
      };
      return obj;
    }
    componentDidMount() {
     
      if(this.props.data.booked){
            this.setState({
              time:{
                "d":'00',
                "h": '00',
                "m": '00',
                "s": '00'
              },
              seconds: 0
            })
      }else {
        let timeLeftVar = this.secondsToTime(this.props.seconds);
        this.setState(
            { time: timeLeftVar,
              seconds: this.props.seconds}
            ,()=>this.startTimer())
      }
     
    }
  
    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      if (seconds <= 0) { 
        this.setState({
          time:{
            "d":'00',
            "h": '00',
            "m": '00',
            "s": '00'
          }
        })
        clearInterval(this.timer);
        this.props.toggler()
      }else{
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
      }
      // Check if we're at zero.
     
    }
  
    render() {
     console.log(this.state.time,"this.state.time.s")
     let {time } = this.state
        if(true){
            return(
               <React.Fragment>
                 {(this.state.time.d === 0 || this.state.time.d === "00")? <div  className="Timer vertical_align_rish"> {this.state.time.d }:&nbsp; {this.state.time.m }:&nbsp;
                    {this.state.time.s}
                </div>:
                 <div  className="Timer vertical_align_rish">
                     {`${time.d} ${time.d>1?'days':'day'} remaining`}
             </div>}                
                </React.Fragment>
              )
        }else{
            return(
                <div></div>
            )
           
        }
     
    }
  }

  export default TimerComponent
  