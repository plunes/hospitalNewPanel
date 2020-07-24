import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInsights, updateRealPriceClr, clearUpdatePriceData,
     clearSolInsights, getSolutionInsights, getAllBookings,
      getMonthWiseUsers, updateRealPrice, setMount,
      set_dash_data, get_business,
       act_as_admin, act_as_admin_clr,
       admin_otp_clr, admin_otp,
       admin_details, admin_details_clr,
       get_user_info,
       set_user_info,
       get_centers,
       set_location_toggler,
       set_open_map
    } from '../../actions/userActions'
import { sendUpdateData } from '../../actions/userActions'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './Dashboard.css';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import AddLocationTab from "../AddLocationTab"
// import NotifFunc from "../functional/NotifFunc"
import LoaderComponent from "../functional/LoaderComponent"
import ActionableInsight from "../functional/ActionableInsight"
import InsightComponent from "../InsightComponent"
import {
    isValidPhoneNumber,
  } from 'react-phone-number-input';
import validator from "validator"
import { Link } from "react-router-dom"
import { isEmpty, is_positive_real_number, get_circular_progress_data, get_slider_labels } from "../../utils/common_utilities"
import NewNotif from '../functional/NewNotif';
import CircularProgress from '../functional/CircularProgress'
import Tag from '../functional/Tag'
import AnimatedMount from "../../HOC/AnimatedMount"
import PieChart from '../functional/PieChart'
import LineChart from '../functional/LineChart'
import ToolTip from "../Tooltip"
import Select from "../Select";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function MyError(message){
    this.message = message;
}

MyError.prototype = new Error()


const default_state = {
    act_as_admin_ask:false,
    act_as_admin_yes:false,
    act_as_admin_no:false,
    act_as_admin_enter_email:false,
    act_as_admin_enter_otp:false,
    act_as_admin_success:false
}

class DashboardComponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            password:false,
            initial_render:true,
            rowsToDisplay: 5,
            modalIsOpen: false,
            realModalIsOpen : false,
            updatePrice: 0,
            actionUpdatedPrice : 0,
            updateData: {},
            solInsights:[],
            serviceName: '',
            days: 0,
            loader: false,
            percent: 0,
            realServiceName:'',
            realUpdatePrice:0,
            solUpdatedPrice : 0,
            realUpdateData: {},
            value: 0,
            solValue: 0,
            distance: 30,
            showBusiness :  false,
            ro_insight_count:50,
            user_map_loading:false,
            business_day:7,
            act_as_admin_flag:false,
            get_actionable:{
                center:''
            },
            get_business:{
                days:7,
                center:''
            },
            act_as_admin_data:{
                phone:'',
                email:'',
                password:'',
                otp:''
            },
            act_as_admin_ask:true,
            act_as_admin_yes:false,
            act_as_admin_no:false,
            act_as_admin_enter_email:false,
            act_as_admin_enter_otp:false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdatePrice = this.handleUpdatePrice.bind(this);
        this.handleRealPrice = this.handleRealPrice.bind(this);
        this.handleDaysChange = this.handleDaysChange.bind(this);
        this.handleRealModal = this.handleRealModal.bind(this);
        this.handleRealSubmit = this.handleRealSubmit.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleSolutionSliderChange = this.handleSolutionSliderChange.bind(this);
        this.setTimer = this.setTimer.bind(this);
    }


    handle_real_time_edit_price = (e) =>{
            let val = e.target.value
           if(is_positive_real_number(val))
           this.setState({real_time_edit_price:val})
           else{
           }   
    }
 
    componentWillReceiveProps(nextProps){

        if(((nextProps.actioanable_update_loading === false) && (this.props.actioanable_update_loading===true))){
            this.handleModal()
        }
         
        if(nextProps.insight_flag !== this.props.insight_flag){
            this.setState({
                get_actionable_loading_other:false
            })
        }
        if(!!nextProps.act_as_admin_ret){
            if(nextProps.act_as_admin_ret.success){
                this.setState({
                    act_admin_loading:false,
                    act_as_admin_self:true,
                },()=>this.handle_act_as_admin('act_as_admin_yes'))
            }else{
            this.setState({
                ret:nextProps.act_as_admin_ret
            })
            }
            nextProps.act_as_admin_clr()
        }
        if(!!nextProps.admin_otp_ret){
            if(nextProps.admin_otp_ret.success){
                if(this.state.act_as_admin_other){
                    nextProps.set_user_info({...this.props.prof_data,isCenter:true})
                }else{
                     nextProps.set_user_info({...this.props.prof_data,isAdmin:true})
                     nextProps.get_centers()
                }
                this.setState({
                    submit_admin_otp_loading:false
                },()=>this.handle_act_as_admin('act_as_admin_success'))
            }else{
                this.setState({
                    ret:nextProps.admin_otp_ret
                })
            }
            nextProps.admin_otp_clr()
        }

        if(!!nextProps.admin_details_ret){
            if(nextProps.admin_details_ret.success){
                this.setState({
                    submit_admin_details_loading:false,
                    act_as_admin_other:true
                },()=>this.handle_act_as_admin('act_as_admin_yes'))
            }else{
                this.setState({
                    ret:nextProps.admin_details_ret
                })
            }
            nextProps.admin_details_clr()
        }

        if(!!this.state.initial_render){
            if(!!!isEmpty(nextProps.prof_data)){
                let coordinates = nextProps.prof_data.location.coordinates
                if(!!coordinates){
                    if(!!!coordinates[0]){
                        this.setState({
                            initial_render:false
                        })
                        nextProps.set_location_toggler(true)
                    }
                }
            }
        }
     }   

    send_details = () =>{
        if(!isValidPhoneNumber(this.state.act_as_admin_data.phone)){
            this.setState({
                ret:{
                    success:false,
                    message:'Invalid mobile number'
                }
            })
        }else if(!validator.isEmail(this.state.act_as_admin_data.email)){
            this.setState({
                ret:{
                    success:false,
                    message:'Invalid email address'
                }
            })
        }else{
           this.setState({
               submit_admin_details_loading:true
           },()=>this.props.admin_details({
               email:this.state.act_as_admin_data.email,
               mobileNumber:this.state.act_as_admin_data.phone
           }))
        }
    }

    handlePhoneChange = (e)=>{
        let str = e.target.value
        if(str.substring(0,3)==='+91'){
            
        }else{
            str = '+91'+e.target.value
        }
        this.setState({
                act_as_admin_data:{
                    ...this.state.act_as_admin_data,
                    phone:str
                }
        })
    }

    setTimer(time){
        setTimeout(async () => {
            await this.props.getSolutionInsights();
        }, time)
    }

    handleSolutionSliderChange(value){
        const { realUpdatePrice } = this.state
        let newPrice = realUpdatePrice - realUpdatePrice * value /100
        this.setState({
            solValue : value,
            solUpdatedPrice : newPrice,
            real_time_edit:false,
            real_time_edit_price:newPrice,
        })
    }

    handleSliderChange(value){
        const { updatePrice } = this.state
        let newPrice = updatePrice - updatePrice * value /100
        this.setState({
          value: value,
          actionUpdatedPrice : newPrice
        })
      };

     handleDaysChange(value) {
        this.setState({
            get_business_loading:true,
            get_business:{
                ...this.state.get_business,
               days:parseInt(value, 10)
            }
        },()=>this.props.get_business({...this.state.get_business}))
    }

     handle_business_center_change = (e)=>{
         this.setState({
             get_business_loading:true,
             get_business:{
                 ...this.state.get_business,
                center:e.target.value
             }
         },()=>this.props.get_business({...this.state.get_business}))  
     }

     handle_actionable_insights = (e) =>{
            this.setState({
                get_actionable_loading_other:true,
                get_actionable:{
                    center:e.target.value
                }
            },()=>this.props.get_actionable_insight(this.state.get_actionable))
    }   

     handleRealPrice(select) {
        this.setState({
            realModalIsOpen :  true,
            realServiceName: select.serviceName,
            realUpdatePrice : select.userPrice,
            realUpdateData : select,
            real_time_edit_price:select.userPrice
        })
    }

    handleRealModal() {
        this.setState({
            realModalIsOpen: false,
            solUpdatedPrice:0,
            realUpdatePrice:0,
            solValue:0,
            value:0,
            real_time_edit:false,
            realUpdatePriceLoading:false,
            real_time_edit_price:false
        })
    }

    handleModal() {
        this.setState({
            modalIsOpen: false,
            solValue:0,
            value:0,
            actionablePriceLoading:false
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        if(this.state.actionUpdatedPrice !== this.state.updateData.price){
            let data = {
                updatePrice: this.state.actionUpdatedPrice.toFixed(2),
                updateData: this.state.updateData
            }
            this.props.set_selected_actionable(this.state.updateData, this.state.actionUpdatedPrice.toFixed(2))
            this.setState({
                actionablePriceLoading:true,
                selected_actionable:this.state.updateData
            },()=>this.props.sendUpdateData({...data, center:this.state.get_actionable.center}))
        }
    }
     handleRealSubmit(e) {
        e.preventDefault();
        try {
            if(parseInt(this.state.real_time_edit_price,10) === 0){
                throw new MyError(`Price must be greater  than 0`)
            }
            if((this.state.real_time_edit_price !== false) && (this.state.real_time_edit_price ==='')){
                this.setState({
                    ret:{
                        message:'Please provide with some price',
                        success:false
                    }
                })
        }else{
            if(this.state.realUpdatePrice !== this.state.real_time_edit_price){
                let data = {
                    realUpdatePrice: this.state.real_time_edit?this.state.real_time_edit_price:this.state.solUpdatedPrice,
                    realUpdateData: this.state.realUpdateData
                }


                let obj = {
                    solutionId: this.state.realUpdateData.solutionId,
                    serviceId:  this.state.realUpdateData.serviceId
                  }

                  if(this.state.realUpdateData.suggested){
                    obj.price =  Math.round(Number(this.state.real_time_edit_price))
                  }else{
                      obj.discount = this.state.solValue
                  }
                this.setState({
                    realUpdatePriceLoading:true
                },()=>{
                    this.props.updateRealPrice(obj);
                }) 
             }
        }
        } catch (error) {
            console.log(error)
            this.setState({
                ret:{
                    success:false,
                    message:error.message
                }
            })
        }
      
  
    }
    handleUpdatePrice(updateData) {
        console.log(updateData,"update data in handleUpdatePrice")
        this.setState({
            modalIsOpen: true,
            updatePrice: updateData.userPrice,
            updateData: updateData,
            serviceName: updateData.serviceName,
            actionUpdatedPrice:updateData.price
        })
    }

    handleClick() {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }

    handleOnChange = (value) => {
        this.setState({
            percent: value
        })
    }

    async componentDidMount() {


        if(!!!this.props.mount.dash_mount){
            this.setState({
                loader:true
            })
            await this.props.getMonthWiseUsers();
            this.setState({
                loader: false
            },()=>this.props.setMount({...this.props.mount,dash_mount:true}))
        }
    }

    updateRealPriceClr = () =>{
        this.props.updateRealPriceClr()
        this.handleRealModal()
      
    }

    clearUpdatePriceData = () =>{
        this.props.clearUpdatePriceData()
            this.props.getInsights()
            this.handleModal()
    }
    getSecondsDifferent=(sec)=>{
           let newSec = (new Date).getTime()
           let seconds = (newSec-sec)/1000
           return seconds>600?0:600-seconds
    }

    close_act_as_admin = () =>{
        this.setState({
            ...default_state,
            act_as_admin_data:{
                email:'',
                otp:'',
                password:'',
                phone:''
            },
            act_as_admin_ask:true,
            act_as_admin_other:false,
            act_as_admin_self:false,
            act_as_admin_flag:false
        })
    }
    open_act_as_admin = () =>{
        this.setState({
            act_as_admin_flag:true
        })
    }

    handle_act_as_admin = (prop) =>{
        this.setState({
            ...default_state,
            [prop]:true
        })
    }

    submit_admin_otp = ()=>{
        if(this.state.act_as_admin_self){
            if(this.state.act_as_admin_data.otp.length!==4){
                this.setState({
                    ret:{
                        success:false,
                        message:"OTP must be 4 characters long"
                    }
                })
            }else if(this.state.act_as_admin_data.password.length<=6){
                this.setState({
                    ret:{
                        success:false,
                        message:"Password must be greater than 6 characters"
                    }
                })
            }else{
                this.props.admin_otp({
                    otp:this.state.act_as_admin_data.otp,
                    password:this.state.act_as_admin_data.password
                })
            }
        }else{
            if(this.state.act_as_admin_data.otp.length!==4){
                this.setState({
                    ret:{
                        success:false,
                        message:"OTP must be 4 characters long"
                    }
                })
            }else{
                this.props.admin_otp({
                    otp:this.state.act_as_admin_data.otp
                })
            }
        }
    }

    render() {
        // console.log(this.props.updatePriceDataRet,"this.props.updatePriceDataRet")
        // // console.log(this.state.get_business.days===1,"this.state.get_business.days===1")
        // console.log(this.state,"this.state in dashboard")
        console.log(this.props,"this.props in dashboard component")
        let { percent } = this.state
        const options = {
            title: {
                text: ''
              },
            series: [{
                showInLegend: false,             
                name: "Users",
                data: this.props.solutionUsers
            }],
            chart: {
                type: 'spline',
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Users'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false
                }
            },
        }
       
        if (false) {
            return (
                <div className="Loader">
                    <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={200}
                        width={200}
                    
                    />
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    
                        <NewNotif 
                            ret ={this.props.updateRealPriceRet}
                            retClr = {this.updateRealPriceClr}
                        />
                        {/* <NewNotif 
                            ret ={this.props.updatePriceDataRet}
                            retClr = {this.clearUpdatePriceData}
                        /> */}
                        <NewNotif 
                            ret ={this.state.ret}
                            retClr = {()=>{this.setState({
                                ret:false
                            })}}
                        />
                        <div className="profile_name_wrapper">
                           <div className="profile_name_name" >    
                              <text style={{textTransform:'capitalize'}}>{this.props.prof_data.name}</text>
                           </div>
                           <div className="profile_name_number">
                              <text > For any query - Call at +91 7011311900</text>
                           </div>
                        </div>

                        {this.props.location_toggler  &&   <AddLocationTab
                            set_open_map = {this.props.set_open_map}
                        /> }

                            <div className='insigts_section_wrapper'>
                                <div className="real_insights_wrapper">
                                <div style={{position:'relative', background:'transparent'}} className='dashboardsection '>
                                        <span  className='businessrow1col1 realtimewidth real_ti_bd'>
                                            {/* <img src="/realtime.svg" className="businessicon vertical_align_rish" alt="">
                                                </img> */}
                                       <div>
                                        <p  data-tip='' data-for='toot_id' className='business vertical_align_rish'>Real Time Insights</p>
                                        {/* <ToolTip id="toot_id" heading="some heading" infoText = "Some Info Text" /> */}
                                        {/* <text className='catalogue_note'><text className='bold'>Note :</text> These are real Time requests from Patients near you who are looking for Procedures and are viewing your Profiles. Make sure to take action on the insights to achieve successful conversion.</text> */}
                                       </div>
                                        
                                        {/* <span className="maximum_time vertical_align_rish">Maximum time limit 10 minutes</span> */}
                                        </span><br></br>
                                        <div className='scrolling_sec'>
                                            {this.props.get_real_insight_loading_flag?<LoaderComponent/>:
                                                this.props.solInsights.length!==0 ? this.props.solInsights.map((s, index) =>{
                                                    let seconds_diff = this.getSecondsDifferent(s.createdAt)
                                                    return (
                                                        (
                                                        <InsightComponent 
                                                        seconds_diff = {seconds_diff}
                                                        s = {s}
                                                        handleRealPrice = {this.handleRealPrice}
                                                        index = {index}
                                                        />
                                                        )
                                                    )
                                                }) : <div className="no_insights_wrapper_ris">
                                                    <div className="no_insight_image-wrapper">
                                                    <img className="no_isights_image" src="./Group 2053.svg" />
                                                    </div>
                                                    <div className="no_real_insights">No Real Time Insights yet </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="action_insights_wrapper">
                                    
                                <div className="dashboardsection dashrow2col2">
                                    <div style={{height:'100%'}}>
                                       <span className='businessrow1col1 realtimewidth '>
                                       {/* <img src="/Outline.svg" className="businessicon vertical_align_rish" alt=""></img> */}
                                     <div>
                                     <p className='business vertical_align_rish'>Actionable Insights</p>
                                     {/* <text className='catalogue_note'><text className='bold'>Note :</text> These insights are predicted by our AI so that you get maximum conversions. Make sure to act on Actionable Insights so that You increase your Revenue.</text> */}
                                     </div>
                                   
                                       <span className="text-center vertical_align_rish" style={{position:'absolute', right:'2rem',top:'0rem', width:'10rem'}}>
                                     {this.props.centers_name_list.length !==0 &&   <Select
                                            options = {this.props.centers_name_list}
                                            handleChange = {this.handle_actionable_insights}
                                            placeholder= "Centers"
                                            input_text_class = "catalogue_dropdown transparent_background"
                                            wrapper_class = "catalogue_dropdown_wrapper transparent_background"
                                            value = {this.state.get_actionable.center}
                                            name = "speciality_chosen"
                                            option_className="centers_dropdown_options"
                                            label = "Centers" /> 
                                        //      <select style = {{background:'none', border:'none none 1px solid grey none'}} onChange={this.handle_actionable_insights} name="days" value={this.state.get_actionable.center} className="select_class_rish vertical_align_rish">
                                        //                          <option value={''}>{this.props.prof_data.name}</option>
                                        //                           {this.props.centers_name_list.map(item=><option value={item.value}>{item.name}</option>)}
                                        //   </select>
                                          
                                          }
                                       </span>
                                      </span>
                                      <div  className="second_scro">
                                        {(this.props.get_real_insight_loading_flag || this.state.get_actionable_loading_other)? <LoaderComponent/>:
                                            this.props.insight.length !==0 ? this.props.insight.map((i, index) => {
                                                return (
                                                   <ActionableInsight  
                                                   data = {i} 
                                                   index = {index} 
                                                   handleUpdatePrice = {this.handleUpdatePrice}
                                                   />
                                                )
                                            }) :  <div className="no_insights_wrapper_ris">
                                            <div className="no_insight_image-wrapper">
                                              <img className="no_isights_image" src="./Group 2055.svg" />
                                            </div>
                                            <div className="no_real_insights">No Actionable Insights yet </div>
                                            </div>
                                        
                                        }
                                    </div>
                                    </div>
                                 </div>
                                </div>

                            </div>

                            <div className="insigts_section_wrapper">
                                <div className="real_insights_wrapper">

                                    <div style={{position:'relative', height:'100%'}} className='dashboardsection add-center-wrapper new_card_class'>
                                                    <div style={{width:'100%'}} className=' businessrow1col1'>
                                                      <span className="realtimewidth heading_flex_wrapper">
                                                         <span className='heading_flex_child_1 '>
                                                        <text style={{lineHeight:'2.5rem'}} className='business vertical_align_rish cursor-pointer'>Total Business</text>
                                                         </span>
                                                         <span className="heading_flex_child_2">  
                                                          {this.props.centers_name_list.length !==0  &&  <Select
                                                                options = {this.props.centers_name_list}
                                                                handleChange = {this.handle_business_center_change}
                                                                placeholder= "Centers"
                                                                input_text_class = "catalogue_dropdown  transparent_background"
                                                                wrapper_class = "catalogue_dropdown_wrapper business_center transparent_background"
                                                                value = {this.state.get_business.center}
                                                                name = "speciality_chosen"
                                                                option_className="centers_dropdown_options"
                                                                label = "Centers" /> 
                                                          
                                                          
                                                          
                                                          
                                                        //   <select  style = {{background:'none', border:'none none 1px solid grey none', display:'inlineBlock'}} onChange={this.handle_business_center_change} name="days" value={this.state.get_business.center} className="select_class_rish">
                                                        //      <option value={''}>{this.props.prof_data.name}</option>
                                                        //         {this.props.centers_name_list.map(item=><option value={item.value}>{item.name}</option>)}
                                                        //    </select>
                                                           } 
                                                           <div style={{marginLeft:'1rem'}}>
                                                             <Select
                                                                 options = {[{name:'Today', value:1},{name:'Last 7 days', value:7}, {name:'Last 30 days', value:30}, {name:'Last Year', value:365}]}
                                                                  handleChange = {(e)=>this.handleDaysChange(e.target.value)}
                                                                  placeholder= "Select days"
                                                                 input_text_class = "catalogue_dropdown transparent_background"
                                                                  wrapper_class = "catalogue_dropdown_wrapper business_center transparent_background"
                                                                   value = {this.state.get_business.days}
                                                                   name = "speciality_chosen"
                                                                   option_className="centers_dropdown_options"
                                                                    label = "Select days" /> 
                                                            </div>
                                                            {/* <select style={{display:'inlineBlock', marginLeft:'.5rem', background:'none', border:'none none 1px solid grey none'}} onChange={(e)=>this.handleDaysChange(e.target.value)} name="days" value={this.state.get_business.days} className="select_class_rish">
                                                                    <option value={1}>Today</option>
                                                                    <option value={7}>Weekly</option>
                                                                    <option value={30}>Monthly</option>
                                                                    <option value={365}>Yearly</option>
                                                           </select> */}
                                                           
                                                         </span>
                                                         
                                                         
                                                        
                                                      </span>
                                                    </div>

                                                    <div style={{width:'100%'}} className='vertical_middle'>
{/* 
                                                        {((!!this.props.business_data.businessGained?this.props.business_data.businessGained.toFixed(2):false ) || (!!this.props.business_data.businessLost?this.props.business_data.businessLost.toFixed(2):false))?
                                                        <div className='margin_top_small_rish'>
                                                            <PieChart
                                                            data = {[!!this.props.business_data.businessGained?this.props.business_data.businessGained.toFixed(2):0, !!this.props.business_data.businessLost?this.props.business_data.businessLost.toFixed(2):0]}
                                                            />
                                                        </div>
                                                        : */}
                                                         <div className="business_wrapper_rish" style={{marginTop:'4rem'}}>
                                                        <div className=' text-center'>
                                                            <p className="businessPrice businessEarn">&#8377; {!!this.props.business_data.businessGained?this.props.business_data.businessGained.toFixed(2):'0'}</p>
                                                            <p className="Earn">Business <br></br>Earned</p>
                                                        </div>
                                                        <div className=' text-center'>
                                                            <p className="businessPrice businessLost">&#8377; {!!this.props.business_data.businessLost?this.props.business_data.businessLost.toFixed(2):'0'}</p>
                                                            <p className="Earn">Business<br></br> Lost</p>
                                                        </div>
                                                    </div> 
                                                     {/* } */}
                                                    </div>
                                                    {/* <div className="tag_section_rish margin_top_small_rish">
                                                            <span className='tag_section_child text-center'>
                                                                    <Tag 
                                                                        name="Today"
                                                                        onClick = {()=>this.handleDaysChange(1)}
                                                                        active ={this.state.get_business.days===1}
                                                                    />
                                                            </span>
                                                            <span className='tag_section_child text-center'>
                                                                    <Tag 
                                                                     name="Weekly"
                                                                     onClick = {()=>this.handleDaysChange(7)}
                                                                     active ={this.state.get_business.days===7}
                                                                    />
                                                            </span>
                                                            <span className='tag_section_child text-center'>
                                                                    <Tag
                                                                      name="Monthly"
                                                                      onClick = {()=>this.handleDaysChange(30)}
                                                                      active ={this.state.get_business.days===30}
                                                                    />
                                                            </span>
                                                            <span className='tag_section_child text-center'>
                                                                    <Tag
                                                                     name="Yearly"
                                                                     onClick = {()=>this.handleDaysChange(365)}
                                                                     active ={this.state.get_business.days===365}
                                                                    />
                                                            </span>
                                                    </div> */}
                                        {/* { this.state.showBusiness ? <div style={{marginTop:'2rem'}} className='row'>
                                            <div className='col text-center'>
                                                <p className="businessPrice businessEarn">&#8377; {!!this.props.business_data.businessGained?this.props.business_data.businessGained.toFixed(2):'0'}</p>
                                                <p className="Earn">Business <br></br>Earned</p>
                                            </div>
                                            <div className='col text-center'>
                                                <p className="businessPrice businessLost">&#8377; {!!this.props.business_data.businessLost?this.props.business_data.businessLost.toFixed(2):'0'}</p>
                                                <p className="Earn">Business<br></br> Lost</p>
                                            </div>
                                        </div> : <div className= "d-flex justify-content-center"><h3>Loading ...</h3></div>} */}
                                        <div className="text-center">
                                        {/* <select onChange={this.handleDaysChange} name="days" value={this.state.get_business.days} className="select_class_rish">
                                                                    <option value='1'>Today</option>
                                                                    <option value='7'>Weekly</option>
                                                                    <option value='30'>Monthly</option>
                                                                    <option value='365'>Yearly</option>
                                                                </select> */}
                                        </div>
                                        <div style={{marginTop:'1rem'}} className="text-center">
                                            <p>Real Time Business </p>
                                        </div>

                                        <div style={{position:'absolute', bottom:'1%'}}>
                                            <p className="businessWarn">Please take action on real time insights to increase your business</p>
                                        </div>
                                    </div> 

                                  
                                 


                                </div>

                                <div className="action_insights_wrapper">      
                                   {((!this.props.prof_data.isCenter) && (!this.props.prof_data.isAdmin) || (!!this.props.prof_data.isAdmin)) && <div className='add-center-wrapper new_card_class'>
                                    <span className='businessrow1col1 realtimewidth heading_flex_wrapper'>
                                    <span className=' heading_flex_child '>
                                   
                                                    { ((!this.props.prof_data.isAdmin) && (!this.props.prof_data.isCenter)) ? <React.Fragment>
                                                        {/* <img src="/add_center_img.svg" alt="add_center_img" className="businessicon vertical_align_rish" alt=""/> */}
                                                        <p  style={{lineHeight:'2.5rem'}} onClick={()=>this.open_act_as_admin()} className='business vertical_align_rish cursor-pointer'>Manage Centres</p></React.Fragment>:
                                                    <React.Fragment>
                                                        {/* <img src="/add_center_img.svg" alt="add_center_img" className="businessicon vertical_align_rish" alt=""/> */}
                                                        <Link className='business vertical_align_rish cursor-pointer' to="/dashboard/centers?addCenter=true"> <p className='business vertical_align_rish cursor-pointer'>Manage Centres</p></Link></React.Fragment> 
                                    }
                                  </span>
                                   <span className="heading_flex_child">  
                                  <span className="add_text_wrapper_span">

                                  {((!this.props.prof_data.isAdmin) && (!this.props.prof_data.isCenter)) ? <React.Fragment>
                                    <img  onClick={()=>this.open_act_as_admin()} src="/add_icon.svg"  alt="add_center_img" className="add_icon_center cursor-pointer vertical_align_rish" alt="" />           
                                  </React.Fragment>:<React.Fragment>
                                  <Link to="/dashboard/centers?addCenter=true">
                                  <img src="/add_icon.svg"  alt="add_center_img" className="add_icon_center vertical_align_rish cursor-pointer" alt="" />           
                                   </Link>
                                  </React.Fragment>}
                                  </span>
                                   </span>
                                    </span>   
                                      {!this.props.get_centers_loading && <div className="add-center-content">
                                      {((!this.props.prof_data.isAdmin) && (!this.props.prof_data.isCenter)) ? <React.Fragment><img src="/no_center_img.svg" onClick={()=>this.open_act_as_admin()} alt="no_center_img" className="no_center_img  center_align_rish cursor-pointer" /></React.Fragment>:
                                         this.props.centers_data.centers_list.length !==0?
                                         <React.Fragment>
                                            <div style={{fontSize:'1.2rem'}} className="text-center">Real Time Reports</div>
                                         <div className="flex_parent">
                                        { this.props.centers_data.centers_list.slice(0,4).map((item)=>{
                                                return  <div className="flex_child_1">
                                                <div className="centers-wrap center_wrap_dash">
                                                    <Link to={`/dashboard/profile?center=${item._id}`} >
                                                        <div className="center_flex_wrap">
                                                            <div className="center_flex_child">
                                                                <img src="/icon/center_icon_new.png" className="center_flex_image" />
                                                                <div className="center_heading_content">
                                                                    <text className="center_name">{item.centerLocation}</text>
                                                                    <text className="center_number">{!!item.alternateNumber?item.alternateNumber:item.adminMobileNumber}</text>
                                                                </div>
                                                            </div>
                                                            <div className="center_flex_child-2">
                                                                <span className="business_earned_lost_span">
                                                                <text className="black_text">Business earned- </text>
                                                                <text style={{fontSize:'1rem'}} className="green_text_rish">{item.businessGained?item.businessGained:item.businessGained===0?0:'N/A'}</text>
                                                                </span>
                                                                <span className="business_earned_lost_span">
                                                                <text className="black_text">Business lost- </text>
                                                                <text className="orange_text">{item.businessLost?item.businessLost:item.businessLost===0?0:'N/A'}</text>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                                        <div className="text-center">
                                                        <span style={{fontSize:'1rem'}} className="sub_heading_rish">{item.name} <br></br>{item.centerLocation}</span>
                                                        </div> */}
                                                    </Link>
                                                </div>
                                            </div>
                                         })}
                                         </div>
                                         {
                                            (this.props.centers_data.centers_list.length>4)  &&  <div className="text-center margin-top-small_ris">
                                            <Link to='/dashboard/centers' >
                                            <p style={{textDecoration:'underline',fontSize:'1.3rem'}} className="green_text_rish">View More</p>
                                            </Link>
                                     </div>
                                        }
                                        </React.Fragment>
                                         :  
                                         <React.Fragment>
                                             <Link to="/dashboard/centers?addCenter=true"><img src="/no_center_img.svg" alt="no_center_img"  className="no_center_img  center_align_rish cursor-pointer" /></Link></React.Fragment>
                                         }
                                            <div>
                                           { this.props.centers_data.centers_list.length !==0?'': 
                                           !this.props.get_centers_loading &&  <span className="no-center-text center_align_rish">Add multiple locations and <br></br> Manage them from here </span>}
                                            </div>
                                      </div>}
                                    </div>}
                                </div>

                               

                            </div>

                           <div className="insigts_section_wrapper">
                            <div style={{width:'100%'}} className='dashboardsection new_card_class'>
                                    <span className='businessrow1col1 realtimewidth'>
                                        {/* <img src="/nouser.svg" alt="no of users" className="businessicon vertical_align_rish" alt=""/> */}
                                        <p className='business vertical_align_rish cursor-pointer'>No. of Users</p>
                                      </span>
                                        {/* <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        /> */}
                                        <div>
                                          <LineChart />
                                        </div>
                                       
                         </div>
                        </div>
                           
                                    <Modal 
                                        isOpen={this.state.modalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal modal_pdd tech_background'>
                                        <div className='text-right'>
                                            <text  onClick={this.handleModal}><img className="modal_cross_icon" src="/icon/cross_icon_rish.png"  alt=""></img></text>
                                        </div>
                                        <span style={{marginBottom:'1rem'}} className="modal_heading center_align_rish"><b style={{color:'#fff'}}>Update Price in your catalogue <br></br>for Maximum Bookings</b></span>
                                        {/* <h2 className="update_price" ref={subtitle => this.subtitle = subtitle}><b>Update Price in your catalogue <br></br>for Maximum Bookings</b></h2> */}
                                       
                                        <div><text className="serv_ces">{this.state.serviceName}</text></div>
                                        <div className="catlou_sli">     
                                        {this.props.actioanable_update_loading && <LoaderComponent />}      
                                        <div className="text-center margin_top_small_rish">
                                        <Slider
                                            min={0}
                                            max={50}
                                            labels={get_slider_labels({lower:this.state.updatePrice, upper:this.state.updatePrice/2})}
                                            value={this.state.value}
                                            onChange={this.handleSliderChange}
                                            onValueChange={value => this.setState({ value })}
                                      />
                                            </div> 
                                          
                                            <div className="SliderUpdatedPrice margin_top_small_rish">&#8377;
                                            <span>
                                            {(this.state.updatePrice - this.state.updatePrice * this.state.value / 100).toFixed(2)} 
                                            </span>
                                            </div>
                                            <br>
                                            </br>
                                           
                                        </div> 

                                    <div className="bookingChance text-center margin_top_small_rish">Chances of Conversion increases by
                                    </div>

                                    <div className='text-center margin_top_small_rish'><CircularProgress
                                            data = {get_circular_progress_data()}
                                            value={this.state.value}
                                        />
                                    </div>
                                        <div className="text-center"><text style={{ fontSize: '17px', border: 'none' }}  onClick={this.handleSubmit} className="InsightUpdate"><u>Apply Here</u></text></div>
                                    </Modal>
                                    <Modal
                                        isOpen={this.state.realModalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal secon_modal tech_background'>
                                        <div className='text-right'>
                                            <text  onClick={this.handleRealModal}><img className="modal_cross_icon" src="/icon/cross_icon_rish.png"  alt=""></img></text>
                                        </div>
                                        <span style={{marginBottom:'1rem'}} className="modal_heading center_align_rish">Real Time Prediction</span>
                                        <div><text className="serv_ces">{this.state.realServiceName}</text></div>
                                        <div className='margin_top_small_rish'>   

                                        <Slider
                                            min={0}
                                            max={50}
                                            labels={get_slider_labels({lower:this.state.realUpdatePrice, upper:this.state.realUpdatePrice/2})}
                                            value={this.state.solValue}
                                            onChange={this.handleSolutionSliderChange}
                                            onValueChange={solValue => this.setState({ solValue })} 
                                            />

                                        <div className="SliderUpdatedPrice margin_top_small_rish">&#8377;
                                            <span style={{fontSize:'1rem'}}>
                                                {((!!this.state.real_time_edit) && (!!this.state.realUpdateData.suggested))?
                                                <React.Fragment>
                                                <input onChange={(e)=>this.handle_real_time_edit_price(e)} value={this.state.real_time_edit_price} className="real_time_edit_input"  /> 
                                                <i style={{color:'#fff', fontSize:'1rem',  marginLeft:'.5rem'}} onClick={()=>this.setState({real_time_edit:false})}  className="fas fa-edit cursor-pointer"></i>
                                                </React.Fragment>
                                                 :
                                                 <React.Fragment>
                                                 {(this.state.solUpdatedPrice===0?this.state.realUpdatePrice:this.state.solUpdatedPrice).toFixed(2)}
                                                    { (!!this.state.realUpdateData.suggested) && <i style={{color:'green', fontSize:'1rem', marginLeft:'.5rem'}} onClick={()=>this.setState({real_time_edit:true})} className="fas fa-edit cursor-pointer vertical_align_rish"></i>} 
                                                 </React.Fragment>
                                                }
                                            </span>            
                                        </div>


                                    <div className="bookingChance text-center margin_top_small_rish">Chances of Conversion increases by
                                    </div>
                                        <div className='text-center margin_top_small_rish'><CircularProgress
                                            data = {get_circular_progress_data()}
                                            value={this.state.solValue}
                                        /></div>
                                        <h2 className="yout_ctl margin_top_small_rish" ref={subtitle => this.subtitle = subtitle}><b style={{color:'#fff'}}>Update Price in your catalogue <br></br>for Maximum Bookings</b></h2>
                                            {this.state.realUpdatePriceLoading && <LoaderComponent />}        
                                           <br></br>
                                        </div> 
                                       
                                         
                                        <div className="text-center"><text style={{ fontSize: '1.2rem', border: 'none' }}  onClick={this.handleRealSubmit} className="InsightUpdate"><u>Apply Here</u></text></div>
                                    </Modal>
                                    <Modal
                                        isOpen={this.state.act_as_admin_flag}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.close_act_as_admin}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal secon_modal'>
                                        <div className='text-right'><button type='button' onClick={this.close_act_as_admin} className='redeemCross'><img src="/cross.jpg" style={{ width: "65%" }} alt=""></img></button></div>
                                        <div className="modal-wrapper">
                                        <div>
                                                
                                            {this.state.act_as_admin_success &&  <span className="modal_heading center_align_rish">Congrats!</span> }
                                            {this.state.act_as_admin_ask &&  <span className="modal_heading center_align_rish">Add Center</span> }
                                            {this.state.act_as_admin_yes && <span className="modal_heading center_align_rish">
                                            Otp Has been sent to the registered number- Enter and Verify
                                            </span>
                                            }

                                           {this.state.act_as_admin_no && <span className="modal_heading center_align_rish">
                                            Provide email and mobile number for admin
                                            </span>
                                            }
                                            </div>
                                        <div className="modal_content_rish">
                                        {this.state.act_as_admin_success &&   <span className="modal_content_description center_align_rish">
                                            {this.state.act_as_admin_other?'We have sent credentials to your account, kindly check them and Give them to your respective branches':`You are now the Admin of  ${this.props.prof_data.name}`}
                                            </span> }
                                            {this.state.act_as_admin_ask &&   <span className="modal_content_description center_align_rish">
                                            Do you want to continue as Admin from the existing account?
                                            </span> }
                                            {this.state.act_as_admin_yes &&   <span className="modal_content_description center_align_rish">
                                            
                                            <input type="int" placeholder="Enter OTP" onChange={(e)=>this.setState({act_as_admin_data:{...this.state.act_as_admin_data,otp:e.target.value}})} value={this.state.act_as_admin_data.otp} className="input_typt_ris form-control editbankdetailfield input-field-common" />
                                            {this.state.act_as_admin_self && <React.Fragment>
                                                <div style={{position:'relative'}}>
                                                <input type={this.state.password?"password":'text'} placeholder="password" onChange={(e)=>this.setState({act_as_admin_data:{...this.state.act_as_admin_data,password:e.target.value}})} value={this.state.act_as_admin_data.password} className="input_typt_ris form-control editbankdetailfield input-field-common" /> 
                                                <i onClick={()=>this.setState({password:!this.state.password})} className={this.state.password?"fa fa-fw fa-eye-slash password_eye":'fa fa-fw fa-eye password_eye'} />
                                                </div> </React.Fragment>
                                            }
                                           
                                            </span> }
                                            {this.state.act_as_admin_no &&   <span className="modal_content_description center_align_rish">
                                            <input type="text" onChange={(e)=>this.setState({act_as_admin_data:{
                                                ...this.state.act_as_admin_data,
                                                email:e.target.value
                                            }})} placeholder="Admin email" value={this.state.act_as_admin_data.email} className="input_typt_ris form-control editbankdetailfield input-field-common" />
                                            <input type="tel" placeholder="Admin phone number" onChange={(e)=>this.handlePhoneChange(e)} value={this.state.act_as_admin_data.phone} className="input_typt_ris form-control editbankdetailfield input-field-common" />
                                            </span> }
                                        </div>
                                        <div className="modal_footer_rish row">
                                                {this.state.act_as_admin_ask && 
                                                <React.Fragment>
                                                <div className="col-md-6 text-center">                           
                                                    <button onClick={()=>{
                                                        this.setState({
                                                            act_admin_loading:true
                                                        },()=>this.props.act_as_admin())
                                                    }} className="common_button_rish white_button_rish">
                                                        Yes
                                                    </button>
                                                    </div>
                                                    <div className="col-md-6 text-center">
                                                    {/* onClick={()=>this.handle_act_as_admin('act_as_admin_no')} */}
                                                    <button onClick={()=>this.close_act_as_admin()}  className="common_button_rish">    
                                                        No
                                                    </button>
                                                    </div>
                                                    </React.Fragment>
                                                    }

                                                {this.state.act_as_admin_yes && 
                                                <React.Fragment> 
                                                    <div className="col-md-12 text-center">
                                                    <button onClick={()=>this.submit_admin_otp()} className="common_button_rish white_button_rish">
                                                        Submit
                                                    </button>
                                                    </div>
                                                    </React.Fragment>
                                                }
                                            {this.state.act_as_admin_no && 
                                                <React.Fragment> 
                                                    <div className="col-md-12 text-center">
                                                    <button onClick={()=>this.send_details()} className="common_button_rish ">
                                                        Send OTP
                                                    </button>
                                                    </div>
                                                    </React.Fragment>
                                                }   
                                        </div>
                                        </div>
                                    </Modal>
                  </React.Fragment>
            )
        }
    }
}
const mapStateToProps = state => ({
    //bookings: state.user.bookingData,
    user: state.user.userDetail,
    dash_data:state.user.data.dash_data,
    prof_data:state.user.data.prof_data,
    mount:state.user.mount,
    businessEarn: state.user.businessEarn,
    businessLost: state.user.businessLost,
    solutionUsers: state.user.solutionUsers,
    updateRealPriceRet:state.user.updateRealPriceRet,
    updatePriceDataRet:state.user.updatePriceDataRet,
    act_as_admin_ret:state.user.act_as_admin_ret,
    admin_otp_ret:state.user.admin_otp_ret,
    admin_details_ret:state.user.admin_details_ret,
    location_toggler:state.user.location_toggler,
    open_map:state.user.open_map,
    centers_data:state.user.data.centers_data,
    insight_flag:state.user.insight_flag
})
     export default AnimatedMount({
        unmountedStyle: {
          opacity: 0,
          transform: 'translate3d(0, -2rem, 0)',
          transition: 'opacity 100ms ease-out, transform 100ms ease-out',
        },
        mountedStyle: {
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          transition: 'opacity .5s ease-out, transform .5s ease-out',
        },
      })(connect(mapStateToProps, {updateRealPriceClr, 
        clearUpdatePriceData, 
        getAllBookings,
        getInsights,
        sendUpdateData, 
        getSolutionInsights,
        getMonthWiseUsers,
        updateRealPrice,
        set_dash_data,
        get_business,
        act_as_admin_clr,
        act_as_admin,
        admin_otp_clr,
        admin_otp,
        admin_details,
        admin_details_clr,
        get_user_info,
        set_user_info,
        get_centers,
        set_location_toggler,
        set_open_map,
        clearSolInsights, setMount })(DashboardComponent));