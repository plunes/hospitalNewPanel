import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import { bankDetails } from "../../actions/userActions";
import  "./AvailabilityComponent.css";

class ManagePaymentComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDetails : {},
            bankname: '',
            accnumber:  '',
            ifsccode: '',
            pannumber: '',
            accountname: ''
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
    
    async componentWillReceiveProps(nextProps){
        this.setState({
            userDetails : nextProps.user
        }, () => {
            if(this.state.userDetails.bankDetails){
                this.setState({
                    bankname : this.state.userDetails.bankDetails.bankName,
                    accnumber : this.state.userDetails.bankDetails.accountNumber,
                    ifsccode : this.state.userDetails.bankDetails.ifscCode,
                    pannumber : this.state.userDetails.bankDetails.panNumber,
                    accountname : this.state.userDetails.bankDetails.name
                }, () => {
                    console.log(this.state.userDetails.bankDetails.bankName)
                })
            }
        
        })
    }

    async componentDidMount(){
        console.log(this.props.user, 'user')
   
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
                    
                    <form onSubmit={this.handleSubmit} className="ManagePayForm AllComponents">
                        <div className="ManagePay"><h4><b>Manage Payment</b></h4></div>
                        <div className="managePay">
                        <input type="text" className="form-control editbankdetailfield" placeholder="Bank Name" name="bankname" onChange={this.handleChange} value = {this.state.bankname}/>
                        <input type="text" className="form-control editbankdetailfield" placeholder="Account Number" name="accnumber" onChange={this.handleChange} value= {this.state.accnumber }/>
                        <input type="text" className="form-control editbankdetailfield" placeholder="IFSC Code" name="ifsccode" onChange={this.handleChange} value= {this.state.ifsccode}/>
                        <input type="text" className="form-control editbankdetailfield" placeholder="Pan Number" name="pannumber" onChange={this.handleChange} value= {this.state.pannumber}/>
                        <input type="text" className="form-control editbankdetailfield" placeholder="Account Holder's Name" name='accountname' onChange={this.handleChange} value= {this.state.accountname}/>
                        <button type="submit" className="btn btn-success proceedbtn">Proceed</button>
                        </div>
                    </form>
                </div>
                <div className='col-md-5'></div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = state => ({
    user : state.user.userDetail
  })
  export default connect(mapStateToProps, {bankDetails})(ManagePaymentComponent)

