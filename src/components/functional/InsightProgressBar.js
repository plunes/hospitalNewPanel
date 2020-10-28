import React from "react"

const InsightProgressBar = (props) => {
        return (
            <React.Fragment>
            <div id="progressbar">
                  <div style={{width:`${props.progress}%`}}>
                      <div className="insight_progress_handle" >
                            <div className="insight_progress_tooltip">
                                <span>{`${props.progress}%`}</span>
                            </div>
                      </div>
                  </div>
            </div>
            </React.Fragment>
        )
}

export default InsightProgressBar