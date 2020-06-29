import React from "react"
import CircularSlider from '@fseehawer/react-circular-slider';

const CircularProgress = (props) => {

    return (
        <CircularSlider
        hideKnob = {true}
        progressColorFrom="#E24F85"
        progressColorTo='#EBCB7F'
        trackColor ='#356595'
        min="0"
        progressSize ='8'
        data = {!!props.data?props.data:0}
        dataIndex={props.value}
        width={100}
        knobDraggable ={false}
        valueFontSize='2rem'
        onChange={ value => { console.log(value); } }
    />
    )
}
export default CircularProgress