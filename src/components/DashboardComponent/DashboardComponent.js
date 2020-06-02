import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader';
import SidebarComponent from './SidebarComponent';
import { connect } from 'react-redux';
import { getInsights, updateRealPriceClr, clearUpdatePriceData,
     clearSolInsights, getSolutionInsights, getAllBookings,
      getMonthWiseUsers, updateRealPrice, setMount,
      set_dash_data, get_business,
       act_as_admin, act_as_admin_clr,
       admin_otp_clr, admin_otp,
       admin_details, admin_details_clr
    } from '../../actions/userActions'
import { sendUpdateData } from '../../actions/userActions'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './Dashboard.css';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import NotifFunc from "../functional/NotifFunc"
import LoaderComponent from "../functional/LoaderComponent"
import InsightComponent from "../InsightComponent"
import {
    isValidPhoneNumber,
  } from 'react-phone-number-input';
import validator from "validator"

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

const default_state = {
    act_as_admin_ask:false,
    act_as_admin_yes:false,
    act_as_admin_no:false,
    act_as_admin_enter_email:false,
    act_as_admin_enter_otp:false
}

class DashboardComponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
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
            showBusiness :  true,
            ro_insight_count:50,
            user_map_loading:false,
            business_day:7,
            act_as_admin_flag:false,
            act_as_admin_data:{
                phone:'',
                email:''
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

    
    componentWillReceiveProps(nextProps){
        if(!!nextProps.act_as_admin_ret){
            if(nextProps.act_as_admin_ret.success){
                this.setState({
                    act_admin_loading:false
                },()=>this.handle_act_as_admin('act_as_admin_yes'))
            }else{
            this.setState({
                ret:nextProps.act_as_admin_ret
            })
            }
            nextProps.act_as_admin_clr()
        }

        if(!!nextProps.admin_details_ret){
            if(nextProps.admin_details_ret.success){
                this.setState({
                    submit_admin_details_loading:false
                })
            }else{
                this.setState({
                    ret:nextProps.admin_details_ret
                })
            }
            nextProps.admin_details_clr()
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
        console.log(str.substring(0,3)," str.substring(0,2) in handlePhoneChange ")
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
       // console.log(value, 'value')
        const { realUpdatePrice } = this.state
        let newPrice = realUpdatePrice - realUpdatePrice * value /100
        this.setState({
            solValue : value,
            solUpdatedPrice : newPrice
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

    async handleDaysChange(e) {
     
        this.setState({
            showBusiness : false
        })
        let days = e.target.value
        await this.props.get_business({days})
        this.setState({
            showBusiness : true,
            business_day:days
        })
    }

    async handleRealPrice(select) {
        // console.log(select,"select in handleRealProce")
        this.setState({
            realModalIsOpen :  true,
            realServiceName: select.serviceName,
            realUpdatePrice : select.userPrice,
            realUpdateData : select
        })
        //await this.props.updateRealPrice(select);
        //await this.props.getSolutionInsights();

    }

    handleRealModal() {
        this.setState({
            realModalIsOpen: false,
            solUpdatedPrice:0,
            realUpdatePrice:0,
            solValue:0,
            value:0
        })
    }

    handleModal() {
        this.setState({
            modalIsOpen: false,
            solValue:0,
            value:0
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let data = {
            updatePrice: this.state.actionUpdatedPrice,
            updateData: this.state.updateData
        }
        this.setState({
            actionablePriceLoading:true
        },()=>this.props.sendUpdateData(data))
        
        //console.log('Anshul')
        // this.setState({
        //     modalIsOpen: false,
        // })
    }
     handleRealSubmit(e) {
        e.preventDefault();
        let data = {
            realUpdatePrice: this.state.solUpdatedPrice,
            realUpdateData: this.state.realUpdateData
        }
        this.setState({
            realUpdatePriceLoading:true
        },()=>{
            this.props.updateRealPrice(data);
        }) 
        //console.log('Anshul')
    }

    // handleChange(e) {
    //     console.log(typeof (e.target.value), 'value')
        
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }


    handleUpdatePrice(updateData) {
        //console.log(updateData, 'update data')
        this.setState({
            modalIsOpen: true,
            updatePrice: updateData.userPrice,
            updateData: updateData,
            serviceName: updateData.serviceName
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
        //await this.props.getBooking();
        let defaulteDays = 15
        // await this.props.getAllBookings(defaulteDays);
        await this.props.getInsights();
        if(!!!this.props.mount.dash_mount){
            this.setState({
                loader:true
            })
            // await this.props.getSolutionInsights();
            await this.props.getMonthWiseUsers();
            this.setState({
                loader: false
            },()=>this.props.setMount({...this.props.mount,dash_mount:true}))
        }
    }

    updateRealPriceClr = () =>{
        this.setState({
            realUpdatePriceLoading:false
        },() => {
            this.props.updateRealPriceClr()
            this.handleRealModal()
        })
    }

    clearUpdatePriceData = () =>{
        this.setState({
            actionablePriceLoading:false
        },()=>{
            this.props.clearUpdatePriceData()
            this.props.getInsights()
            this.handleModal()
        })
    }
    getSecondsDifferent=(sec)=>{
           let newSec = (new Date).getTime()
        //    console.log(newSec,"newSec in getSeconds Differnce")
           let seconds = (newSec-sec)/1000
           return seconds>600?0:600-seconds
    }

    close_act_as_admin = () =>{
        this.setState({
            ...default_state,
            act_as_admin_ask:true,
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

    render() {
        // console.log(this.props,"this.props in DashboardComponent")
        // console.log(this.state,"this.state in DashboardComponent")
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
                        <div className='col-md-8 col-lg-10 col-xl-8 Dashboard AllComponents'>
                        <NotifFunc 
                            ret ={this.props.updateRealPriceRet}
                            retClr = {this.updateRealPriceClr}
                        />
                        <NotifFunc 
                            ret ={this.props.updatePriceDataRet}
                            retClr = {this.clearUpdatePriceData}
                        />
                        <NotifFunc 
                            ret ={this.state.ret}
                            retClr = {()=>{this.setState({
                                ret:false
                            })}}
                        />
                        <div className="row">
                                    <div className=' dashboardsection dashrow1'>    
                                        <p  className='DashboardHospitalName'>{this.props.user.name}</p>
                                        <p className="heading-right_ris"> For any query - Call at 7701805081</p>
                                    </div>
                        </div>
                            <div className='row'>
                                <div className=' col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6 Leftpaddingremove'>
                                    <div className="custome_scrol">
                                    <div style={{position:'relative'}} className='dashboardsection scrolling_sec'>
                                        <span className='businessrow1col1 realtimewidth real_ti_bd'><img src="/realtime.svg" className="businessicon vertical_align_rish" alt=""></img><p className='business vertical_align_rish'>Real Time Insights</p>
                                        <span className="maximum_time vertical_align_rish">Maximum time limit 10 minutes</span>
                                        </span><br></br>
                                            {this.props.real_insight_loader?<LoaderComponent/>:
                                                this.props.solInsights.length!==0 ? this.props.solInsights.map((s, index) =>{
                                                    let seconds_diff = this.getSecondsDifferent(s.createdAt)
                                                    return (
                                                        (
                                                        <InsightComponent 
                                                        seconds_diff = {seconds_diff}
                                                        s = {s}
                                                        handleRealPrice = {this.handleRealPrice}
                                                        index = {index}
                                                        />)
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
                                    <div style={{padding:'0.5rem'}} className='dashboardsection card_rish add-center-wrapper'>
                                                    <div style={{width:'100%'}} className=' businessrow1col1'>
                                                        <span className='businessrow1col1 realtimewidth'>
                                                            <img src="/business.svg" alt="business" className="businessicon vertical_align_rish" alt=""></img><p className='business vertical_align_rish cursor-pointer'>Business</p>
                                                        </span>
                                                        <span className="maximum_time vertical_align_rish"> <select onChange={this.handleDaysChange} name="days" value={this.state.business_day} className="selectBusiness">
                                                                    <option value='1'>Today</option>
                                                                    <option value='7'>Weekly</option>
                                                                    <option value='30'>Monthly</option>
                                                                    <option value='365'>Yearly</option>
                                                                </select></span>
                                                    </div>
                                        { this.state.showBusiness ? <div style={{marginTop:'2rem'}} className='row'>
                                            <div className='col text-center'>
                                                <p className="businessPrice businessEarn">&#8377;{!!this.props.business_data.businessGained?this.props.business_data.businessGained.toFixed(2):''}</p>
                                                <p className="Earn">Business <br></br>Earned</p>
                                            </div>
                                            <div className='col text-center'>
                                                <p className="businessPrice businessLost">&#8377;{!!this.props.business_data.businessLost?this.props.business_data.businessLost.toFixed(2):''}</p>
                                                <p className="Earn">Business<br></br> Lost</p>
                                            </div>
                                        </div> : <div className= "d-flex justify-content-center"><h3>Loading ...</h3></div>}
                                        <div className="businessWarn">
                                            <p>Please take action on real time insights to increase your business</p>
                                        </div>

                                    </div>
                                    <div className='dashboardsection'>
                                    <span className='businessrow1col1 realtimewidth'>
                                        <img src="/nouser.svg" alt="no of users" className="businessicon vertical_align_rish" alt=""></img><p className='business vertical_align_rish cursor-pointer'>Number of Users</p>
                                      </span>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        />
                                    </div>
                                    <br></br>
                                </div>

                                <div  className='col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6 '>
                                    <div id="second_scro_is" className="dashboardsection dashrow2col2 second_scro">
                                       <span className='businessrow1col1 realtimewidth'>
                                        <img src="/Outline.svg" className="businessicon vertical_align_rish" alt=""></img><p className='business'>Actionable Insights</p>
                                      </span>
                                        {this.props.act_insight_loader? <LoaderComponent/>:
                                            this.props.insight.length !==0 ? this.props.insight.map((i, index) => (
                                                <div className="DashboardInsight" key={index}><b>{i.serviceName} </b><span className="Insightdiv">were</span> <b>{i.percent}</b><span><b>%</b></span><span className="Insightdiv"> higher than the booked price </span>
                                                    <span  className="InsightUpdate" onClick={(e) => this.handleUpdatePrice(i)}><u>Update here</u></span>
                                                    <hr></hr>
                                                </div>
                                            )) :  <div className="no_insights_wrapper_ris">
                                            <div className="no_insight_image-wrapper">
                                              <img className="no_isights_image" src="./Group 2055.svg" />
                                            </div>
                                            <div className="no_real_insights">No Actionable Insights yet </div>
                                            </div>
                                        }
                                    </div>
                                    {/* <div className='add-center-wrapper card_rish'>
                                    <span className='businessrow1col1 realtimewidth'>
                                        <img src="/add_center_img.svg" alt="add_center_img" className="businessicon vertical_align_rish" alt=""></img><p onClick={()=>this.open_act_as_admin()} className='business vertical_align_rish cursor-pointer'>Add Centre</p>
                                      </span>
                                      <div className="add-center-content">
                                            <img src="/no_center_img.svg" alt="no_center_img" onClick={()=>this.open_act_as_admin()} className="no_center_img  center_align_rish cursor-pointer" />
                                            <div >
                                            <span onClick={()=>this.setState({
                                                ret:{
                                                    success:true,
                                                    message:"Dummy Message"
                                                }
                                            })} className="no-center-text center_align_rish">Add multiple locations and <br></br> Manage them from here </span>
                                            </div>
                                      </div>
                                    </div> */}
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal modal_pdd'>
                                        <div className='text-right'><button type='button' onClick={this.handleModal} className='redeemCross'><img src="/cross.jpg" alt="" style={{ width: "65%" }}></img></button></div>
                                        <h2 className="update_price" ref={subtitle => this.subtitle = subtitle}><b>Update Price in your catalogue <br></br>for Maximum Bookings</b></h2>
                                        <div clasname="dynmic_pra" style={ { color:'#333333',fontSize:'13px',textAlign: 'center', marginTop:'20px'} }>{this.state.serviceName}</div>
                                        <div className="catlou_sli">     
                                        {this.state.actionablePriceLoading && <LoaderComponent />}      
                                        <div className="text-center valu_second">
                                               <b>{Math.floor( this.state.value )} % </b>
                                            </div> 
                                            <Slider
                                            min={0}
                                            max={50}
                                            value={this.state.value}
                                            onChange={this.handleSliderChange}
                                            onValueChange={value => this.setState({ value })}
                                            valueLabelDisplay="on"
                                            />
                                            <div className="SliderUpdatedPrice">&#8377;
                                            <span>
                                            {Math.ceil(this.state.updatePrice - this.state.updatePrice * this.state.value / 100)} 
                                            </span>
                                            </div>
                                            <br>
                                            </br>
                                           
                                        </div> 
                                        <div className="row maxmin">
                                            <div className="col-sm-6"><h4>&#8377;{this.state.updatePrice}</h4></div>
                                            <div className="col-sm-6 text-right"><h4>&#8377;{this.state.updatePrice / 2}</h4></div>
                                        </div>
                                       
                                        <div className="bookingChance">Chances of Bookings increases by<br></br>{this.state.value===0?
                                        <p style={{ fontWeight:'bold'}}><b>0%</b></p>:
                                        <p style={{ fontWeight:'bold'}}><b>{10 + + this.state.value}% to {15 + + this.state.value}%</b></p>}</div>
                                        <div className="text-center"><button style={{ fontSize: '17px', border: 'none' }} type='button' onClick={this.handleSubmit} className="InsightUpdate"><u>Apply Here</u></button></div>
                                    </Modal>
                                    <Modal
                                        isOpen={this.state.realModalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal secon_modal'>
                                        <div className='text-right'><button type='button' onClick={this.handleRealModal} className='redeemCross'><img src="/cross.jpg" style={{ width: "65%" }} alt=""></img></button></div>
                                        <h2 className="yout_ctl" ref={subtitle => this.subtitle = subtitle}><b>Update Price in your catalogue <br></br>for Maximum Bookings</b></h2>
                                        <div><p className="serv_ces">{this.state.realServiceName}</p></div>
                                        <div>   
                                            {this.state.realUpdatePriceLoading && <LoaderComponent />}        
                                            <div className="text-center valu_second">
                                               <b>{Math.floor( this.state.solValue )} % </b>
                                            </div>
                                            <Slider
                                            min={0}
                                            max={50}
                                            value={this.state.solValue}
                                            onChange={this.handleSolutionSliderChange}
                                            onValueChange={solValue => this.setState({ solValue })} 
                                            />
                                            <div className="SliderUpdatedPrice">&#8377;
                                            <span>
                                            {Math.ceil(this.state.solUpdatedPrice===0?this.state.realUpdatePrice:this.state.solUpdatedPrice)} 
                                            </span>            
                                                </div><br></br>
                                        </div> 
                                        <div className="row maxmin">
                                            <div className="col-sm-6"><h4>&#8377;{this.state.realUpdatePrice}</h4></div>
                                            <div className="col-sm-6 text-right"><h4>&#8377;{this.state.realUpdatePrice / 2}</h4></div>
                                        </div>
                                            <div className="bookingChance">Chances of Bookings increases by<br></br>{this.state.solValue===0?
                                             <p style={{ fontWeight:'bold'}}><b>0%</b></p>
                                            :<p style={{ fontWeight:'bold'}}><b>{10 + + this.state.solValue}% to {15 + + this.state.solValue}%</b></p>}</div>
                                        <div className="text-center"><button style={{ fontSize: '18px', border: 'none' }} type='button' onClick={this.handleRealSubmit} className="InsightUpdate"><u>Apply Here</u></button></div>
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
                                           
                                            {this.state.act_as_admin_ask &&  <span className="modal_heading center_align_rish">Add Center</span> }
                                            {this.state.act_as_admin_yes && <span className="modal_heading center_align_rish">
                                            Otp Has been sent to the registered number"- Enter and Verify
                                            </span>
                                            }

                                           {this.state.act_as_admin_no && <span className="modal_heading center_align_rish">
                                            Provide email and mobile number for admin
                                            </span>
                                            }
                                            </div>
                                        <div className="modal_content_rish">
                                            {this.state.act_as_admin_ask &&   <span className="modal_content_description center_align_rish">
                                            Do you want to continue as Admin from the existing account?
                                            </span> }
                                            {this.state.act_as_admin_yes &&   <span className="modal_content_description center_align_rish">
                                            <input type="int" placeholder="Enter OTP" className="input_typt_ris form-control editbankdetailfield input-field-common" />
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
                                                <div className="col-md-6">                           
                                                    <button onClick={()=>{
                                                        this.setState({
                                                            act_admin_loading:true
                                                        },()=>this.props.act_as_admin())
                                                    }} className="common_button_rish white_button_rish">
                                                        Yes
                                                    </button>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <button onClick={()=>this.handle_act_as_admin('act_as_admin_no')} className="common_button_rish">
                                                        No
                                                    </button>
                                                    </div>
                                                    </React.Fragment>
                                                    }

                                                {this.state.act_as_admin_yes && 
                                                <React.Fragment> 
                                                    <div className="col-md-12">
                                                    <button className="common_button_rish white_button_rish">
                                                        Submit
                                                    </button>
                                                    </div>
                                                    </React.Fragment>
                                                }
                                            {this.state.act_as_admin_no && 
                                                <React.Fragment> 
                                                    <div className="col-md-12">
                                                    <button onClick={()=>this.send_details()} className="common_button_rish ">
                                                        Send OTP
                                                    </button>
                                                    </div>
                                                    </React.Fragment>
                                                }   
                                        </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                      
                  </React.Fragment>
            )
        }
    }
}
const mapStateToProps = state => ({
    //bookings: state.user.bookingData,
    user: state.user.userDetail,
    dash_data:state.user.data.dash_data,
    mount:state.user.mount,
    businessEarn: state.user.businessEarn,
    businessLost: state.user.businessLost,
    solutionUsers: state.user.solutionUsers,
    updateRealPriceRet:state.user.updateRealPriceRet,
    updatePriceDataRet:state.user.updatePriceDataRet,
    act_as_admin_ret:state.user.act_as_admin_ret,
    admin_otp_ret:state.user.admin_otp_ret,
    admin_details_ret:state.user.admin_details_ret
})

export default connect(mapStateToProps, {updateRealPriceClr, 
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
     clearSolInsights, setMount })(DashboardComponent);
// Call userdetails from