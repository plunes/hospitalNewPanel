import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Button from './Button'

const placement = 'top'
const Tooltip = (props) => {
    return    <OverlayTrigger
    trigger="click"
    key={placement}
    placement={placement}
    overlay={
      <Popover id={`popover-positioned-${placement}`}>
        <Popover.Title as="h3">{`${props.title}`}</Popover.Title>
        <Popover.Content>
            <text className='catalogue_note'><text className='bold'>Note :</text>{props.content}</text> 
        </Popover.Content>
      </Popover>
    }
  >
    <p style={{...props.style}}><img className='info_icon_rish' src='/icon/info_icon_rish.svg' /></p>
  </OverlayTrigger>
}

export default Tooltip