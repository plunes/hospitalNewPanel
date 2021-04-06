import  React from "react"
import { throttle } from "throttle-debounce"

const WeekWidget = (props) => {
  const  { variant } = props
  const [slot, set_state] = React.useState({
      day:'Monday',
      closed:false
  })

  React.useEffect(()=>{
            set_state(props.data)
  },[props.data])
console.log(props.selected_days,"props in Week Widgets")
  const is_selected = (val) => {
            let result = false
            let arr = [...props.selected_days]
          console.log(arr,"arr in asdasdasd")
            try {
                arr.forEach(item=>{
                    if(item===val){
                        result = true
                        throw new Error("Dummy error")
                    }
                })
            } catch(e) {
                console.log(e)
            }

            return result
  }

  if(props.alternate){
      return  <React.Fragment>
                      <div className={`week-widget-wrapper`}>
                <div className={`week-widget-flex-parent`}>
                     <span onClick={()=>props.onClick('Monday')} className={`week-widget-flex-child  ${is_selected("Monday")?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               MON
                           </text>     
                     </span>
                     <span  onClick={()=>props.onClick('Tuesday')} className={`week-widget-flex-child ${is_selected("Tuesday")?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                          <text className={`u-align-center`}>
                            TUE
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Wednesday')} className={`week-widget-flex-child ${is_selected("Wednesday")?'selected':''} ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               WED
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Thursday')} className={`week-widget-flex-child ${is_selected("Thursday")?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               THU
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Friday')} className={`week-widget-flex-child ${is_selected("Friday")?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                            <text className={`u-align-center`}>
                                FRI
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Saturday')} className={`week-widget-flex-child ${is_selected("Saturday")?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                           <text className={`u-align-center`}>
                               SAT
                           </text> 
                    </span>
                    <span  onClick={()=>props.onClick('Sunday')} className={`week-widget-flex-child ${is_selected("Sunday")?'selected':''}  ${variant==="box"?'week-widget-box':'week-widget-circle'}`}>
                            <text className={`u-align-center`}>
                              SUN
                           </text> 
                    </span>
                </div>
            </div>
      </React.Fragment>
  }

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