import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader';
import SidebarComponent from './SidebarComponent';
// import ProfileComponent from './ProfileContainer';
import { connect } from 'react-redux';
// import { getUserDetails } from "../../actions/userActions";
// import { getBooking } from '../../actions/userActions'
import { getInsights } from '../../actions/userActions'
import { sendUpdateData } from '../../actions/userActions'
import { getSolutionInsights } from '../../actions/userActions'
import { getAllBookings } from '../../actions/userActions'
import { getMonthWiseUsers } from '../../actions/userActions'
import { updateRealPrice } from '../../actions/userActions'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './Dashboard.css';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner'
import Slider from 'react-rangeslider'
import Timer from 'react-compound-timer'
import 'react-rangeslider/lib/index.css'


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


class DashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowsToDisplay: 5,
            modalIsOpen: false,
            realModalIsOpen : false,
            updatePrice: 0,
            actionUpdatedPrice : 0,
            updateData: {},
            serviceName: '',
            days: 0,
            loader: true,
            percent: 0,
            realServiceName:'',
            realUpdatePrice:0,
            solUpdatedPrice : 0,
            realUpdateData: {},
            value: 10,
            solValue: 10,
            distance: 30,
            showBusiness :  true
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
        console.log(select, 'select');
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
        })
    }

    handleModal() {
        this.setState({
            modalIsOpen: false,
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let data = {
            updatePrice: this.state.actionUpdatedPrice,
            updateData: this.state.updateData
        }
        await this.props.sendUpdateData(data);
        //console.log('Anshul')
        this.setState({
            modalIsOpen: false,
        })
    }
    async handleRealSubmit(e) {
        e.preventDefault();
        let data = {
            realUpdatePrice: this.state.solUpdatedPrice,
            realUpdateData: this.state.realUpdateData
        }
        await this.props.updateRealPrice(data);
        //console.log('Anshul')
        this.setState({
            realModalIsOpen: false,
        })
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
        await this.props.getAllBookings(defaulteDays);
        await this.props.getInsights();
        await this.props.getSolutionInsights();
        await this.props.getMonthWiseUsers();
        this.setState({
            loader: false
        })
    }

    render() {
        // console.log(this.props.insight, 'insight')
        let { percent } = this.state
        //    let timer = Date.now() + 100000
        const options = {
            // title: {
            //     text: 'My chart'
            // },
            series: [{
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
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
        }
        //console.log(this.props.bookings, 'booking')
        if (this.state.loader) {
            return (
                <div className="Loader">
                    <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={200}
                        width={200}
                    // timeout={3000} //3 secs
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <div className='row'>
                        <DashboardHeader />
                    </div>
                    <div className='row DashboardBody'>
                        <div className='col-md-3'>
                            <SidebarComponent />
                        </div>
                        <div className='col-md-9 Dashboard AllComponents'>
                            <div className='row dashboardsection dashrow1'>
                                <p className='DashboardHospitalName'>{this.props.user.name}</p>
                            </div>
                            <div className='row'>
                                <div className='col-md-6 col-6 Leftpaddingremove'>
                                    <div className='dashboardsection'>
                                        <span className='businessrow1col1 realtimewidth'><img src="/realtime.svg" className="businessicon" alt=""></img><p className='business'>Real Time Insights</p></span><br></br>
                                        {
                                            this.props.solInsights ? this.props.solInsights.slice(0, 5).map((s, index) => (
                                                <div className='row' key={index}>
                                                    <div className='col-md-2 text-right realtime'>
                                                        <span className="realtimeicon1"><img src="/realtimerows.svg" className="realtimeicon" alt=""></img></span>
                                                    </div>
                                                    <div className='col-md-8'>
                                                        <div className="RealtimeUsername">
                                                            {s.userName}
                                                        </div>
                                                        <div>
                                                            is looking for {s.serviceName}
                                                        </div><br></br>
                                                        {
                                                            s.negotiating ?
                                                                <button type="button" className="InsightUpdate kindlyUpdate" onClick={(e) => this.handleRealPrice(s)}><u>Kindly update your price</u></button>
                                                                : null
                                                        }
                                                        <div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-2'>
                                                        {
                                                            s.negotiating ?
                                                                <div>
                                                                    <Timer
                                                                        initialTime={s.timeRemaining}
                                                                        direction="backward"
                                                                    >
                                                                        {() => (
                                                                            <React.Fragment>
                                                                                <div className="Timer"><Timer.Minutes /> :&nbsp;
                                                                                     <Timer.Seconds /> 
                                                                                </div>min sec
                                                                            </React.Fragment>
                                                                        )}
                                                                    </Timer>
                                                                    {this.setTimer.call(this, 5000)}
                                                                </div>
                                                                : <div>
                                                                    00:00
                                                                </div>
                                                        }
                                                    </div><hr className="RealtimeHr"></hr>
                                                </div>
                                            )) : false
                                        }
                                    </div>
                                    <div className='dashboardsection'>
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
                                            Please take action on real time insights to increase your business
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
                                <div className='col-md-6 col-6 dashboardsection dashrow2col2'>
                                    <div>
                                       <span className='businessrow1col1 realtimewidth'>
                                       <img src="/Outline.svg" className="businessicon" alt=""></img><p className='business'>Actionable Insights</p>
                                       </span>
                                        {
                                            this.props.insight ? this.props.insight.slice(0, this.state.rowsToDisplay).map((i, index) => (
                                                <div className="DashboardInsight" key={index}>{i.serviceName} <span className="Insightdiv">were</span> {i.percent}<span>%</span><span className="Insightdiv"> higher than the booked price</span>
                                                    <button type="button" className="InsightUpdate" onClick={(e) => this.handleUpdatePrice(i)}><u>Update here</u></button>
                                                    <hr></hr>
                                                </div>
                                            )) : false
                                        }
                                        <button onClick={this.handleClick} className="DashboardViewMore">View more</button>
                                    </div>
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal'>
                                        <div className='text-right'><button type='button' onClick={this.handleModal} className='redeemCross'><img src="/cross.png" alt="" style={{ width: "65%" }}></img></button></div>
                                        <h2 style={{ fontSize: '25px', textAlign: 'center' }} ref={subtitle => this.subtitle = subtitle}><b>Update Price in your catalogue <br></br>for Maximum Bookings</b></h2>
                                        <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '20px' }}>{this.state.serviceName}</div>
                                        <div>           
                                            <div style={ { width: '50%'} }>
                                                <b>{Math.floor( this.state.value )} % </b>
                                            </div>    
                                            <Slider
                                            min={0}
                                            max={50}
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            onValueChange={value => this.setState({ value })}
                                            valueLabelDisplay="on"
                                            />
                                            <div className="SliderUpdatedPrice">&#8377;<input style={{ textAlign:'left',border: 'none', width: '25%', fontWeight:'bold'}} type='text' onChange={this.handleChange} name='updatePrice' value={this.state.updatePrice - this.state.updatePrice * this.state.value / 100}></input></div><br></br>
                                            {/* <input className='value' value={this.state.value}></input> */}
                                        </div> 
                                        <div className="row maxmin">
                                            <div className="col-sm-6"><h4>&#8377;{this.state.updatePrice}</h4></div>
                                            <div className="col-sm-6 text-right"><h4>&#8377;{this.state.updatePrice / 2}</h4></div>
                                        </div>
                                        {/* <div style={{ fontSize: '25px', textAlign: 'center', marginTop: '25px' }}>&#8377;<input style={{ textAlign: 'center', border: 'none', width: '10%' }} type='text' onChange={this.handleChange} name='updatePrice' value={this.state.updatePrice}></input></div><br></br> */}
                                        <div className="bookingChance">Chances of Bookings increases by<br></br><p style={{ fontWeight:'bold'}}><b>{10 + + this.state.value}% to {15 + + this.state.value}%</b></p></div>
                                        <div className="text-center"><button style={{ fontSize: '25px', border: 'none' }} type='button' onClick={this.handleSubmit} className="InsightUpdate"><u>Apply Here</u></button></div>
                                    </Modal>
                                    <Modal
                                        isOpen={this.state.realModalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        ariaHideApp={false}
                                        contentLabel="Example Modal" className='redeemModal'>
                                        <div className='text-right'><button type='button' onClick={this.handleRealModal} className='redeemCross'><img src="/cross.png" style={{ width: "65%" }} alt=""></img></button></div>
                                        <h2 style={{ fontSize: '25px', textAlign: 'center' }} ref={subtitle => this.subtitle = subtitle}><b>Update Price in your catalogue <br></br>for Maximum Bookings</b></h2>
                                        <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '20px' }}>{this.state.realServiceName}</div>
                                        <div>           
                                            <div style={ { width: '50%', textAlign: 'center'} }>
                                               <b>{Math.floor( this.state.solValue )} % </b>
                                            </div>    
                                            <Slider
                                            min={0}
                                            max={50}
                                            value={this.state.solValue}
                                            onChange={this.handleSolutionSliderChange}
                                            onValueChange={solValue => this.setState({ solValue })} 
                                            />
                                            <div className="SliderUpdatedPrice">&#8377;<input style={{ textAlign:'left',border: 'none', width: '25%', fontWeight:'bold'}} type='text' onChange={this.handleChange} name='updatePrice' value={this.state.realUpdatePrice - this.state.realUpdatePrice * this.state.value / 100}></input></div><br></br>
                                            {/* <input className='value' value={this.state.value}></input> */}
                                        </div> 
                                        <div className="row maxmin">
                                            <div className="col-sm-6"><h4>&#8377;{this.state.realUpdatePrice}</h4></div>
                                            <div className="col-sm-6 text-right"><h4>&#8377;{this.state.realUpdatePrice / 2}</h4></div>
                                        </div>
                                        <div className="bookingChance">Chances of Bookings increases by<br></br><p style={{ fontWeight:'bold'}}><b>{10 + + this.state.solValue}% to {15 + + this.state.solValue}%</b></p></div>
                                        {/* <div style={{ fontSize: '25px', textAlign: 'center', marginTop: '25px' }}>&#8377;<input style={{ textAlign: 'center', border: 'none', width: '10%' }} type='text' onChange={this.handleChange} name='realUpdatePrice' value={this.state.realUpdatePrice}></input></div><br></br> */}
                                        <div className="text-center"><button style={{ fontSize: '25px', border: 'none' }} type='button' onClick={this.handleRealSubmit} className="InsightUpdate"><u>Apply Here</u></button></div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                    </div>
                </div>
            )
        }

    }
}
const mapStateToProps = state => ({
    //bookings: state.user.bookingData,
    user: state.user.userDetail,
    insight: state.user.insightData,
    solInsights: state.user.solInsights,
    businessEarn: state.user.businessEarn,
    businessLost: state.user.businessLost,
    solutionUsers: state.user.solutionUsers
})


export default connect(mapStateToProps, { getAllBookings, getInsights, sendUpdateData, getSolutionInsights, getMonthWiseUsers, updateRealPrice })(DashboardComponent);
// Call userdetails from