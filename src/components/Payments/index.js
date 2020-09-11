import React from "react"

const Payments = (props) => {
    const [state, set_state] = React.useState({tabIndex:0})
    return <React.Fragment>
              <div className='transparent_main_content_rish'>
                    <div>
                         <div className={`appointment_header_wrapper new_card_class ${state.tabIndex===0?'border_radius_fix_right':state.tabIndex===1?'border_radius_fix_left':''}`}>
                             <span onClick = {() => set_state({...state, tabIndex:0 })}  className={`appointment_header_child-1 ${state.tabIndex===0?'active_appointment_header':''}`}>
                                <text className='appointment_header_text'>PAYMENTS</text>
                             </span>
                             <span onClick = {() =>  set_state({...state, tabIndex:1 })}  className={`appointment_header_child-1 ${state.tabIndex===1?'active_appointment_header':''}`}>
                                 <text className='appointment_header_text'>PENDING PAYMENTS</text>
                            </span>                     
                         </div>
                    </div>
                </div>
    </React.Fragment>
}
export default Payments