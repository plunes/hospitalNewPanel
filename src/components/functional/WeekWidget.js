import  React from "react"

const WeekWidget = (props) => {
  const  { variant } = props
console.log(variant,"variant")

    return <React.Fragment>
            <div className={`week-widget-wrapper`}>
                <div className={`week-widget-flex-parent`}>
                     <span className={`week-widget-flex-child selected  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               THU
                           </text>     
                     </span>
                     <span className={`week-widget-flex-child  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                          <text className={`u-align-center`}>
                               FRI
                           </text> 
                    </span>
                    <span className={`week-widget-flex-child ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               SAT
                           </text> 
                    </span>
                    <span className={`week-widget-flex-child  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               SUN
                           </text> 
                    </span>
                    <span className={`week-widget-flex-child  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                            <text className={`u-align-center`}>
                                MON
                           </text> 
                    </span>
                    <span className={`week-widget-flex-child  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               TUE
                           </text> 
                    </span>
                    <span className={`week-widget-flex-child  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                            <text className={`u-align-center`}>
                               WED
                           </text> 
                    </span>
                </div>
            </div>
    </React.Fragment>
}


export default WeekWidget