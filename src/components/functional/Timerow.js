import { database } from "firebase"
import  React from "react"

const Timerow = (props) => {
  const  { variant, data, timeToString, key_prop } = props
console.log(key_prop,"key_prop")
    return <React.Fragment>
           <div className="timerow-wrapper">
                    <div className="timerow-wrapper--time-row-parent">
                            <span className="time-row-child">
                                <text onClick={()=>props.time_selected({ time:data.from, timestamp:data.from.timestamp, index:key_prop, type:'from'})} className="time-text">{timeToString(data.from)}</text>
                            </span>
                            <span className="time-row-child">
                                <span className="arrow arrow-bar is-right"></span>
                            </span>
                            <span className="time-row-child">
                                <text onClick={()=>{
                                    if(!!data.from){
                                        props.time_selected({ time:data.to, timestamp:data.to.timestamp, index:key_prop, type:'to'})
                                    }
                                }} className="time-text">{timeToString(data.to)}</text>
                            </span>
                    </div>
                <div className="delete-icon-wrapper">
                     <i onClick={()=>props.remove_slot(key_prop)} className="fa fa-trash delete-icon cursor-pointer" aria-hidden="true"></i>
                </div>
                {/* <div className="slot-check-box">
                    <div className="checkbox-input checkbox-small ">
                        <input type="checkbox" id={Math.random()}/>
                        <label  className="u-margin-auto"></label>
                    </div>
                </div> */}
           </div>
    </React.Fragment>
}


export default Timerow