import React from "react"
import PhotoGallery from "../functional/PhotoGallery"
import VideoSection from "../functional/VideoSection"
import PdfSection from "../functional/PdfSection"
import Slider from 'react-rangeslider'
import CircularProgress from '../functional/CircularProgress'
import InsightProgressBar from '../functional/InsightProgressBar';
import InsightGraph from "../functional/InsightGraph"
import Button from "../functional/Button"
import NewNotif from "../functional/NewNotif"

import { get_circular_progress_data, get_slider_labels, is_positive_number } from "../../utils/common_utilities"

import { get_url_params } from "../../utils/common_utilities"
import "./index.scss"

const Solution = (props) => {

    const [data, set_data] = React.useState({
        imageUrl:[],
        videoUrl:[],
        reportUrl:[],
        dataPoints:[],
        specialOffers:[{
            addon: "",
            specialOffer: "",
            technique: ""
        }],
        price:'',
        solValue:10,
        right_data:[]
    })

    const [message, set_message] = React.useState(false)

    React.useEffect(()=>{
        let main_body_flex_content = document.getElementsByClassName('main_body_flex_content')
        console.log(main_body_flex_content,"main_body_flex_content")
        if(main_body_flex_content[0]){
            main_body_flex_content[0].classList.add("solution_background_class")
        }

        console.log(props, get_url_params('id'), "props in Solution")
        props.get_insight_info({
            solutionId:get_url_params('id'),
            serviceId:get_url_params('serviceId')
        })

        return ()=>{
            if(main_body_flex_content[0]){
                main_body_flex_content[0].classList.remove("solution_background_class")
            }
        }
    },[])

    React.useEffect(()=>{

        if(props.get_insight_info_ret){
            if(props.get_insight_info_ret.success){
                console.log(props.get_insight_info_ret,"True case ======= >.>>>>>")

                let data = props.get_insight_info_ret.data

                let slider_range =  Math.floor(parseInt(data.max) - parseInt(data.min))
                let price_diff = Math.floor(parseInt(data.max) - parseInt(data.userPrice))
                console.log(slider_range, price_diff,"slider_range")
                let slider_value = parseInt((price_diff/slider_range) * 100)
               
                let right_add_on = ''
                let right_technique = ''
                let right_specialOffer = ''

                data.specialOffers.forEach(((item,i)=>{

                    right_add_on = `${right_add_on} ${item.addon}`

                    right_technique = `${right_technique} ${item.technique}`

                    right_specialOffer = `${right_specialOffer} ${item.specialOffer}`
                }))

                
                
                set_data({
                    ...data,
                    ...props.get_insight_info_ret.data,
                    imageUrl:props.get_insight_info_ret.data.userReport.imageUrl,
                    videoUrl:props.get_insight_info_ret.data.userReport.videoUrl,
                    reportUrl:props.get_insight_info_ret.data.userReport.videoUrl,
                    additionalDetails:props.get_insight_info_ret.data.userReport.additionalDetails,
                    description:props.get_insight_info_ret.data.userReport.description,
                    updated_price:props.get_insight_info_ret.data.userPrice,
                    solUpdatedPrice:data.recommendation?parseInt(((data.userPrice) * (data.recommendation/100)),10):data.userPrice,
                    solValue:data.recommendation?100-data.recommendation:slider_value,
                     right_add_on,
                     right_specialOffer,
                     right_technique
                })

            }else {
                console.log("False case ======= >.>>>>>")
            }
            props.get_insight_info_loading()
        }

        if(props.update_insight_ret){
            if(props.update_insight_ret.success){
                console.log(props.update_insight_ret,"True case ======= >.>>>>>")
                set_message({
                    message:props.update_insight_ret.message,
                    success:true
                })
            }else {
                set_message({
                    message:props.update_insight_ret.message,
                    success:false
                })
            }
            props.update_insight_loading()
        }

    },[props.get_insight_info_ret, props.update_insight_ret])

    const submit_price = () => {
        console.log(data,"data in submit_price")
        if(is_positive_number(data.updated_price) && data.updated_price.length !== 0){
            props.update_insight({
                solutionId:get_url_params('id'),
                serviceId:get_url_params('serviceId'),
                price:data.updated_price,
                technique:data.technique,
                addon:data.addon,
                specialOffer:data.specialOffer
            })
        }else {
            set_message({
                success:false,
                message:'Please enter a vailid price'
            })
        }
       
    }

    console.log(props,"props Inside solution Component")
    console.log(data,"data in Solution")

    let update_solValue = 71 * (data.solValue/100)

    return (
        <React.Fragment>

                        <NewNotif 
                            ret ={message}
                            retClr = {()=>set_message(false)}
                        />

                    <div className="solution-outer-wrapper">
                            <div  className="heading">
                                <span className="user-name">{data.userName}</span>
                                <span> is looking for {data.serviceName} </span>
                                <span className="have-insurance">Have Insurance</span>
                            <div className="user-details">
                                    <span className="child-1" id="1">User Details</span> 
                                    <hr className="child-2 user-details-hr" id="2"  /> </div>
                            </div>
                            <div className="tiles-wrapper">
                                   {data.imageUrl.length !==0 &&  <div className="tile-small">
                                      <div className="insight_additional_info_heading heading">
                                              Photos
                                      </div>
                                      <div className="photo-gallery-wrapper ">
                                                <PhotoGallery  id={`solution-${data._id}`} data={data.imageUrl} />
                                      </div>
                                    </div>}
                                  {data.videoUrl.length !==0 &&   <div className="tile-small">
                                    <div className="insight_additional_info_heading heading">
                                              Videos
                                      </div>
                                      <div className="photo-gallery-wrapper">
                                                <VideoSection data={data.videoUrl} />
                                      </div>
                                    </div>}
                                   {data.reportUrl.length !==0 &&  <div className="tile-small">
                                      <div className="insight_additional_info_heading heading">
                                              Reports
                                      </div>
                                      <div className="photo-gallery-wrapper">
                                            <PdfSection data={data.reportUrl}  />
                                      </div>
                                    </div>}
                                   {data.additionalDetails &&  <div className="tile-big">
                                        <div className="insight_additional_info_heading heading">
                                                Additional details of the service
                                        </div>
                                        <div >
                                            <span className="text-font">
                                                 {data.additionalDetails}
                                            </span>
                                        </div>
                                    </div>}
                                  {data.description  &&   <div className="tile-big">
                                            <div className="insight_additional_info_heading heading">
                                                 Previous Treatment Details's
                                            </div>
                                            <div>
                                                <span className="text-font">
                                                  {data.description}
                                                </span>
                                            </div>
                                    </div>}
                            </div>
                   
                            <div  className="heading">
                                <div className="user-details">
                                    <span className="child-1" id="1">Price Insight</span> 
                                    <hr className="child-2 user-details-hr" id="2"  /> 
                                </div>
                           </div>
                           <div className="solution-charts-wrapper">
                               <div className="child-1">
                                     <h2 className="yout_ctl"><b style={{color:'#fff'}}>Update your best price for maximum bookings</b></h2>
                                        <div className='margin_top_medium-2_rish u-align-center-flex'>   
                                            <Slider
                                                min={0}
                                                max={100}
                                                tooltip={true}
                                                format={(val)=>{
                                                    return <p>{Math.floor(this.state.solUpdatedPrice)}</p>
                                                }}
                                                labels={get_slider_labels({lower:data.max, upper:data.min})}
                                                value={2}
                                                onChange={(val=>console.log(val))}
                                                onValueChange={solValue => console.log(solValue)} 
                                                />                                        
                                        </div>
                                            <text className="serv_ces ">Chances of Conversion increases by</text>
                                        <div className='text-center margin_top_mini_rish'><CircularProgress
                                            data = {get_circular_progress_data(!!data.recommendation?71:71)}
                                            value={update_solValue}
                                        /></div>
                                      <div className="insight_progress_wrapper margin_top_medium_rish">
                                            <InsightProgressBar
                                           progress = {parseInt(data.competitionRate, 10)}
                                            />
                                            <span className="competition-text">Competition Rate</span>
                                        </div> 
                                 </div>

                               <div className="child-2">
                                   {data.dataPoints.length !==0  &&  <div className="wrapp-graph">
                                       <InsightGraph
                                           data = {[...data.dataPoints]}
                                           fill={true}
                                          />
                                     </div> }
                                    
                               </div>

                               <div className="child-1">
                                        <div className="new-input-label-wrapper">
                                            <label>Best Price</label>
                                            <input type="number" className="new-input-type"  value={data.updated_price} onChange={(e)=> {
                                                console.log(e.target.value,"e.target.value")
                                                if(is_positive_number(e.target.value)){
                                                    set_data({
                                                        ...data,
                                                        updated_price:e.target.value
                                                    })
                                                }
                                            } } />
                                        </div>

                                        <div className="new-input-label-wrapper">
                                            <label>Technology/Technique</label>
                                            <input type="text" className="new-input-type" value={data.technique} onChange={(e)=>{
                                                set_data({
                                                    ...data,
                                                    technique:e.target.value
                                                })
                                            }} />
                                        </div>
                                        <div className="new-input-label-wrapper">
                                            <label>Add on's</label>
                                            <input type="text" className="new-input-type"  value={data.addon} onChange={(e)=>{
                                                set_data({
                                                    ...data,
                                                    addon:e.target.value
                                                })
                                            }} />
                                        </div>
                                        <div className="new-input-label-wrapper">
                                            <label>Special offers</label>
                                            <input type="text" className="new-input-type" value={data.specialOffer} onChange={(e)=>{
                                                set_data({
                                                    ...data,
                                                    specialOffer:e.target.value
                                                })
                                            }} />
                                        </div>
                               </div>
                               <div className={`child-2  ${data.specialOffers.length ==0?"align-items-center":''}`}>
                               {data.specialOffers.length !==0?  <React.Fragment>
                                             <div className="competitive-offers-wrap">
                                            <img src="https://service-family-images.s3.ap-south-1.amazonaws.com/website-images/offer-image.svg" />
                                             <span>{data.right_specialOffer}</span>
                                             </div>

                                             <div className="competitive-offers-wrap">
                                            <img src="https://service-family-images.s3.ap-south-1.amazonaws.com/website-images/offer-image.svg" />
                                             <span>{data.right_technique}</span>
                                             </div>

                                             <div className="competitive-offers-wrap">
                                            <img src="https://service-family-images.s3.ap-south-1.amazonaws.com/website-images/offer-image.svg" />
                                             <span>{data.right_add_on}</span>
                                             </div>
                                        </React.Fragment> :<React.Fragment>
                                                <div className="no-offers-wrap">
                                                     <img src="https://service-family-images.s3.ap-south-1.amazonaws.com/website-images/no-offers.svg" />
                                                     <span>Be first to provide offers and Add on's to increase your chances of getting a patient</span>
                                                </div>
                                        </React.Fragment> }
                                   </div>
                           </div>

                           <div className="u-margin-top-small text-center">
                                <Button onClick = {()=>submit_price()}>Submit</Button>
                           </div>
                    </div>
        </React.Fragment>
    )
}

export default Solution