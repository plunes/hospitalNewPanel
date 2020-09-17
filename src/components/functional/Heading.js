import React from "react"

const Heading = (props) => {
    return <React.Fragment>
          <div style={{...props.style}} className={`${props.className} heading-component-heading`}>
              {props.children}
          </div>
    </React.Fragment>
}
export default Heading