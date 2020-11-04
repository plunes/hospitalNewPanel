import { database } from "firebase"
import  React from "react"

const Timerow = (props) => {
  const  { variant, data, timeToString } = props

    return <React.Fragment>
           <div className="timerow-wrapper">
                    <div className="timerow-wrapper--time-row-parent">
                            <span className="time-row-child">
                                <text className="time-text">{timeToString(data.from)}</text>
                            </span>
                            <span className="time-row-child">
                                <span className="arrow arrow-bar is-right"></span>
                            </span>
                            <span className="time-row-child">
                                <text className="time-text">{timeToString(data.to)}</text>
                            </span>
                    </div>
                <div className="delete-icon-wrapper">
                     <i className="fa fa-trash delete-icon" aria-hidden="true"></i>
                </div>
                <div className="slot-check-box">
                    <div className="checkbox-input checkbox-small ">
                        <input type="checkbox" id={Math.random()}/>
                        <label  className="u-margin-auto"></label>
                    </div>
                </div>
           </div>
    </React.Fragment>
}


export default Timerow