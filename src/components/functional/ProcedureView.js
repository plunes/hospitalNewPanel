import React, { useEffect, useState } from "react"


const ProcedureView = (props) => {
    const [procedure, setProcedure] = useState(false)
    useEffect( () => {
       if(!!props.procedure_for_detail){
           setProcedure(props.procedure_for_detail)
       }else{
        setProcedure(false)
       }
    }, [props.procedure_for_detail])

    console.log(procedure,"procedure in ProcedureView")
    return(
        <div className='catalogue_section_2'>
        <div className="catalogue_section_2_wrapper new_card_class">
            <span className='display_block_rish margin_bottom_medium_rish'><text className='catalogue_heading_text'>Details</text></span>
            <span className='display_block_rish '><text className='catalogue_secondary_heading_text'>Test Name</text></span>
            <span className='display_block_rish margin_bottom_small_rish '>  <text className='catalogue_test_name'>{procedure?procedure.service:'------'}</text></span>
            <div className="location_edit_parent">
                <text className="catalogue_secondary_heading_text">Price</text>
                <div className="edit_location_div">
                     {/* <img src="/icon/edit_icon_rish.svg"  className="edit_location_icon" /> */}
                </div>
            </div>
            <span style={{marginTop:'1rem'}}  className='display_block_rish margin_bottom_small_rish'>  <text className='catalogue_test_name '>{!!procedure?!!procedure.price? <text>&#8377;{` ${procedure.price[0]}`}</text>:'------':`------`}</text></span>
            <div className="location_edit_parent">
                <text className="catalogue_secondary_heading_text">Updated At</text>
                <div className="edit_location_div">
                     {/* <img src="/icon/edit_icon_rish.svg"  className="edit_location_icon" /> */}
                </div>
            </div>
            <span style={{marginTop:'1rem'}}  className='display_block_rish margin_bottom_small_rish'>  <text className='catalogue_test_name '>05-7-20</text></span>

            <div className="location_edit_parent">
                <text className="catalogue_secondary_heading_text">Variance</text>
                <div className="edit_location_div">
                     {/* <img src="/icon/edit_icon_rish.svg"  className="edit_location_icon" /> */}
                </div>
            </div>
            <span style={{marginTop:'1rem'}}  className='display_block_rish margin_bottom_small_rish'>  <text className='catalogue_test_name '>{procedure? `${procedure.variance}%`:`------`}</text></span>
            <div className="location_edit_parent">
                <text className="catalogue_secondary_heading_text">Definition</text>
                <div className="edit_location_div">
                     {/* <img src="/icon/edit_icon_rish.svg"  className="edit_location_icon" /> */}
                </div>
            </div>
            <span style={{marginTop:'1rem'}}  className='display_block_rish'>  <text className='catalogue_test_name '>Space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text, space for text</text></span>
        </div>
    </div>
    )
}

export default  React.memo(ProcedureView)