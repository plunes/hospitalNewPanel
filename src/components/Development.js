import React, { Component } from 'react';
import SidebarComponent from './DashboardComponent/SidebarComponent';
import DashboardHeader from './DashboardComponent/DashboardHeader';
import { connect } from 'react-redux';
import { bankDetails, submitBankDetailsClr } from "../actions/userActions";
import ManagePayment from "./functional/ManagePayment"

class Development extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDetails : {},
            bankname: '',
            accnumber:  '',
            ifsccode: '',
            pannumber: '',
            accountname: '',
            loading:true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
          });
    }
    handleSubmit(e){
        e.preventDefault();
        let data = {
            "name": this.state.accountname,
            "bankName": this.state.bankname,
            "ifscCode": this.state.ifsccode,
            "accountNumber": this.state.accnumber,
            "panNumber": this.state.pannumber
        }
        this.props.bankDetails(data);
        
    }

    bankDetails = (data) =>{
        this.setState({
            loading:true
        })
        this.props.bankDetails(data)
    }
    loadingOff = () =>{
        this.setState({
            loading:false
        })
    }
    
    async componentWillReceiveProps(nextProps){
        // this.setState({
        //     userDetails : nextProps.user
        // }, () => {
        //     if(this.state.userDetails.bankDetails){
        //         this.setState({
        //             bankname : this.state.userDetails.bankDetails.bankName,
        //             accnumber : this.state.userDetails.bankDetails.accountNumber,
        //             ifsccode : this.state.userDetails.bankDetails.ifscCode,
        //             pannumber : this.state.userDetails.bankDetails.panNumber,
        //             accountname : this.state.userDetails.bankDetails.name,
        //             loading:false
        //         }, () => {
        //             console.log(this.state.userDetails.bankDetails.bankName)
        //         })
        //     }
        
        // })
        <div className="add_dr">
          <h4>Add Doctors</h4>
          <p>Search for a doctor by name or email</p>
          <div className="search_b">
            
           </div>

        </div>
    }

    async componentDidMount(){
        // console.log(this.props.user, 'user')
   
    }

    render() {
        return (
            <div>
            <div className='row'>
                <DashboardHeader />
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <SidebarComponent />
                </div>
                <div className='col-md-5'>
                   {/* // Code here */}
                </div>
                <div className='col-md-5'></div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = state => ({
    user : state.user.userDetail,
    submitBankDetailsRet:state.user.submitBankDetailsRet
  })
  export default connect(mapStateToProps, {bankDetails, submitBankDetailsClr})(Development)

