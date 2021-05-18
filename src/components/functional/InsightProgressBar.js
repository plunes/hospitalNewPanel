import React from "react"

const InsightProgressBar = (props) => {
    if(props.version === "payment"){
        return  (
            <React.Fragment>
                     <div id="progressbar">
                  <div className="payment" style={{width:`${props.progress}%`}}>
                      <div className="insight_progress_handle" >
                            <div className="insight_progress_tooltip">
                                <span className="payment_span">{`${props.progress}%`}</span>
                            </div>
                      </div>
                  </div>
            </div>
            <div className="payment-funnel-wrapper">
                <span className="payment-funned-span">
                    <text>
                        Amount Paid
                    </text>
                    <text>
                    &#8377;
                        {props.data.paidBookingAmount}
                    </text>
                </span>
                <span className="payment-funned-span">
                    <text>
                        Total Amount
                    </text>
                    <text>
                    &#8377;
                        {props.data.totalAmount}
                    </text>
                </span> 
            </div>
            </React.Fragment>
        )
    }
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