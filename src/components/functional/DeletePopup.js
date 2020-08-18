import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Button from "./Button"

const placement = 'top'
const DeletePopup = (props) => {

    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        props.yesClick(e)
    }

    const noClick = (e) => {
        console.log(e)
        const element = document.getElementById(`${props.id}`)
        console.log(element,"element")
        if(!!element){
            element.click()
        }
    }
    return    <OverlayTrigger
    trigger="click"
    key={placement}
    placement={placement}
    overlay={
      <Popover id={`popover-positioned-${placement}`}>
        <Popover.Title as="h3">{`${props.title}`}</Popover.Title>
        <Popover.Content>
           <div className="flex_parent">
               <div className="flex_parent_child text-center ">
                    <Button onClick={onClick} >
                       Yes
                    </Button>{' '}
               </div>
               <div className="flex_parent_child text-center">
                        <Button onClick={noClick} >
                           No
                        </Button>{' '}
               </div>
           </div>
           
        </Popover.Content>
      </Popover>
    }
  >
    {props.children}
  </OverlayTrigger>
}

export default DeletePopup