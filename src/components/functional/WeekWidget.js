import  React from "react"

const WeekWidget = (props) => {
  const  { variant } = props
  const [slot, set_state] = React.useState({
      day:'Monday',
      closed:false
  })

  React.useEffect(()=>{
            set_state(props.data)
  },[props.data])

    return <React.Fragment>
            <div className={`week-widget-wrapper`}>
                <div className={`week-widget-flex-parent`}>
                     <span onClick={()=>props.onClick('Monday')} className={`week-widget-flex-child  ${slot.day==="Monday"?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               MON
                           </text>     
                     </span>
                     <span  onClick={()=>props.onClick('Tuesday')} className={`week-widget-flex-child ${slot.day==="Tuesday"?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                          <text className={`u-align-center`}>
                            TUE
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Wednesday')} className={`week-widget-flex-child ${slot.day==="Wednesday"?'selected':''} ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               WED
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Thursday')} className={`week-widget-flex-child ${slot.day==="Thursday"?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               THU
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Friday')} className={`week-widget-flex-child ${slot.day==="Friday"?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                            <text className={`u-align-center`}>
                                FRI
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Saturday')} className={`week-widget-flex-child ${slot.day==="Saturday"?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               SAT
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Sunday')} className={`week-widget-flex-child ${slot.day==="Sunday"?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                            <text className={`u-align-center`}>
                              SUN
                           </text> 
                    </span>
                </div>
            </div>
    </React.Fragment>
}


export default WeekWidget