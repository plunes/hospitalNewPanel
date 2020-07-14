import React from "react"

const LoaderComponent = (props) => {

    return(
        <div style={{...props.style}} className={`${props.second_variant === true?"loader_ris_2 loader-1_ris":"loader_ris loader-1_ris"}`}>
        </div>
    )
}

export default LoaderComponent