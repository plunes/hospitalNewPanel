import React from "react"
import CircularSlider from '@fseehawer/react-circular-slider';

const CircularProgress = (props) => {
 console.log(props.data,"props.data")
 console.log(props.value,"props.value")
    return (
        <CircularSlider
        hideKnob = {true}
        progressColorFrom="#01D35A"
        progressColorTo='#01D35A'
        trackColor ='#EAEAEA'
        showTooltip={true}
        min="0"
        progressSize ='8'
        data = {!!props.data?props.data:0}
        dataIndex={props.value}
        width={100}
        tooltipColor="#000"
        labelColor='#000'
        knobDraggable ={false}
        valueFontSize='2rem'
        valueColor="#fff"
        onChange={ value => { console.log(value); } }
    />
    )
}
export default CircularProgress