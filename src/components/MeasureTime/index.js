import React from "react"
// import ms from "pretty-ms"
class MeasureTime extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  componentWillReceiveProps(nextProps){
      console.log(nextProps,"nextProps in MeasureTime")
      if(!!nextProps.flag){
          this.startTimer()
      }else if((nextProps.flag===false)&& (!!this.timer)){
          this.stopTimer()
      }
  }
  startTimer() {
      console.log("Timer Started")
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
    window.alert(this.state.time)
  }
  resetTimer() {
    this.setState({time: 0, isOn: false})
  }
  render() {
      console.log(this.timer,"this.timer in MeasureTime")
      console.log(this.props,"this.props in MeasureTime")
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
    return(
      <div>
        {/* <h3>timer: {ms(this.state.time)}</h3>
        {start}
        {resume}
        {stop}
        {reset} */}
      </div>
    )
  }
}
export default MeasureTime