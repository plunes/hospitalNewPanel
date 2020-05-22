import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader';
import SidebarComponent from './SidebarComponent';
import { connect } from 'react-redux';
import { getInsights, updateRealPriceClr, clearUpdatePriceData,
     clearSolInsights, getSolutionInsights, getAllBookings,
      getMonthWiseUsers, updateRealPrice, setMount,
      set_dash_data } from '../../actions/userActions'
import { sendUpdateData } from '../../actions/userActions'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './Dashboard.css';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner'
import Slider from 'react-rangeslider'
import Timer from 'react-compound-timer'
import 'react-rangeslider/lib/index.css'
import TimerComponent from '../TimerComponent'
import NotifFunc from "../functional/NotifFunc"
import LoaderComponent from "../functional/LoaderComponent"
import InsightComponent from "../InsightComponent"

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
            user_map_loading:false
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

    // componentWillReceiveProps(nextProps){
    //     if(!!nextProps.solInsights){
    //         this.setState({
    //             solInsights:nextProps.solInsights
    //         },()=>{
    //             nextProps.clearSolInsights(),
    //             nextProps.set_dash_data({...nextProps.data.dash_data, solInsights:nextProps.solInsights})
    //         })
    //     }
    // }   
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
        await this.props.getAllBookings(days)
        this.setState({
            showBusiness : true
        })
    }

    async handleRealPrice(select) {
        console.log(select,"select in handleRealProce")
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

    render() {
        console.log(this.props,"this.props in DashboardComponent")
        console.log(this.state,"this.state in DashboardComponent")
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
                        /><div className="row">
                            <div className=' dashboardsection dashrow1'>
                                
                                <p  className='DashboardHospitalName'>{this.props.user.name}</p>
                                <p className="heading-right_ris"> For any query - Call at 7701805081</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className=' col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6 Leftpaddingremove'>
                                    <div className="custome_scrol">
                                    <div style={{position:'relative'}} className='dashboardsection scrolling_sec'>
                                    {/* {this.props.real_insight_loader && <LoaderComponent/>} */}
                                        <span className='businessrow1col1 realtimewidth real_ti_bd'><img src="/realtime.svg" className="businessicon" alt=""></img><p className='business'>Real Time Insights<span className="maximum_time">Maximum time limit 10 Min</span></p></span><br></br>
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
                                    <div className='dashboardsection'>
                                        <div className="bdr_dash">
                                        <div className='row'>
                                            <div className='col businessrow1col1'>
                                                   <img src="/business.svg" className="businessicon" alt=""></img>
                                                   <p className='business'>Business</p>
                                            </div>
                                            <div className='col selectBusinessPeriod'>
                                                <select onChange={this.handleDaysChange} name="days" className="selectBusiness">
                                                    <option value=''>Select</option>
                                                    <option value='1'>Today</option>
                                                    <option value='7'>Weekly</option>
                                                    <option value='30'>Monthly</option>
                                                    <option value='365'>Yearly</option>
                                                </select>
                                            </div>
                                          
                                        </div>
                                        </div>
                                        { this.state.showBusiness ? <div className='row'>
                                            <div className='col text-center'>
                                                <p className="businessPrice businessEarn">&#8377;{this.props.businessEarn}</p>
                                                <p className="Earn">Business <br></br>Earned</p>
                                            </div>
                                            <div className='col text-center'>
                                                <p className="businessPrice businessLost">&#8377;{this.props.businessLost}</p>
                                                <p className="Earn">Business<br></br> Lost</p>
                                            </div>
                                        </div> : <div className= "d-flex justify-content-center"><h3>Loading ...</h3></div>}
                                        <div className="businessWarn">
                                            <p>Please take action on real time insights to increase your business</p>
                                        </div>

                                    </div>
                                    <div className='dashboardsection'>
                                        <span className='businessrow1col1 width'>
                                        <img src="/nouser.svg" className="businessicon" alt=""></img>
                                        <p className='business'>Number of Users</p>
                                        </span>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        />
                                    </div>
                                    <br></br>
                                </div>
                                <div id="second_scro_is" className='col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6 dashboardsection dashrow2col2 second_scro'>
                                    <div>
                                       <span className='businessrow1col1 realtimewidth'>
                                       <img src="/Outline.svg" className="businessicon" alt=""></img><p className='business'>Actionable Insights</p>
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
                                        {/* <div className="text-center">
                                            {this.props.insight.length !==0 &&  <button onClick={this.handleClick} className="DashboardViewMore">View more</button> }
                                        </div> */}
                                    </div>
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal modal_pdd'>
                                        <div className='text-right'><button type='button' onClick={this.handleModal} className='redeemCross'><img src="/cross.png" alt="" style={{ width: "65%" }}></img></button></div>
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
                                        <div className='text-right'><button type='button' onClick={this.handleRealModal} className='redeemCross'><img src="/cross.png" style={{ width: "65%" }} alt=""></img></button></div>
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
    updatePriceDataRet:state.user.updatePriceDataRet
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
     clearSolInsights, setMount })(DashboardComponent);
// Call userdetails from