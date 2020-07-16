import React from 'react'
import AnimatedMount from "../../HOC/AnimatedMount"
const should_render = (prevProps, nextProps) => {
    return true
}
const ActionableInsight = (props) => {
    const { data , index , handleUpdatePrice} = props
    return (
        <React.Fragment>
            <div className="action_insight_wrapper" key={index}>
                <span className="action_insight_image_wrapper">
                    <img src ="/icon/action_insight_image.svg" className="action_insight_image"/>
                </span>
                <span className="action_insight_text_wrapper">
                    <div>
                        <text className="light_text_rish">
                            <text className="dark_text_rish">{data.serviceName} </text>were <text className="dark_text_rish">{data.percent}% </text>higher than the booked price
                        </text>
                    </div>
                    <div  className="InsightUpdate" onClick={(e) => handleUpdatePrice(data)}>Update here</div>
               </span>
             </div>                                              
          <hr></hr>          
        </React.Fragment>
    )
}


export default AnimatedMount({
    unmountedStyle: {
      opacity: 0,
      transform: 'translate3d(0, -2rem, 0)',
      transition: 'opacity 100ms ease-out, transform 100ms ease-out',
    },
    mountedStyle: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: 'opacity .5s ease-out, transform .5s ease-out',
    },
  })(React.memo(ActionableInsight, should_render));
