import React, { Component } from 'react'

class ForgotPassword extends Component {
    constructor(props){
        super(props);

        this.state = {

            showForgetPassword: true,
            showConfirmPassword: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitNumber = this.handleSubmitNumber.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    }
    handleSubmitNumber(e) {
        e.preventDefault();
        this.setState({
            showConfirmPassword: true,
            showForgetPassword: false
        })
    }

    handleSubmitPassword(e){
        e.preventDefault();
        this.setState({
            showConfirmPassword:true

        })
    }

    handleChange(e) {

    }
    render() {
        return (
            <div className='container-fluid'>
                
                <div className='row'>
                    <div className='col-md-3'>

                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                            {
                                this.state.showForgetPassword ? <form onSubmit={this.handleSubmitNumber}>
                                    <div className='row'>
                                        Please enter your Email id or Mobile Number
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" name="mobileNumber" onChange={this.handleChange} />
                                    </div>
                                    <div className='row'>
                                        
                                        <div className='col'>
                                            <button type='submit'>Ok</button>
                                            
                                        </div>
                                        
                                    </div>
                                    
                                </form>
                                    : null
                            }
                            {
                                this.state.showConfirmPassword ? <form onSubmit={this.handleSubmitPassword}>
                                    <div className='row'>
                                        Please enter your New Password
                                </div>
                                    <div className="form-group">
                                        <input className="form-control" type='password' name="newPassword" placeholder="newPassword" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type='password' placeholder="reEnterPassword" onChange={this.handleChange} />
                                    </div>
                                    <div className='row'>
                                        
                                        <div className='col'>
                                            <button type='submit' >Reset</button>
                                        </div>
                                        

                                    </div>
                                </form> : null
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default ForgotPassword;
