import React from "react"
import { connect } from 'react-redux';
import NewNotif from "../functional/NewNotif"
import { add_center_clr, add_center, set_centers_data } from "../../actions/userActions"
import validator from 'validator'
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Redirect } from "react-router-dom"

function MyError(message){
    this.message = message;
}


class AddCenter extends React.PureComponent{
    constructor(props){
        super(props)
        this.state= {
            valid:true
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.add_center_ret){
            if(nextProps.add_center_ret.success){
                nextProps.set_centers_data({
                        ...nextProps.centers_data,
                        centers_list:[nextProps.add_center_ret.data,...nextProps.centers_data.centers_list]
                })
               this.setState({
                   ret:{
                       success:true,
                       message:"Center Successfully added"
                   }
               })
            }else{
                this.setState({
                    ret:nextProps.add_center_ret
                })
            }
            nextProps.add_center_clr()
        }
    }

    handle_phone_change = (e)=>{
        let str = e.target.value
        console.log(str.substring(0,3)," str.substring(0,2) in handlePhoneChange ")
        if(str.substring(0,3)==='+91'){
            
        }else{
            str = '+91'+e.target.value
        }
        this.setState({
            phone:str
        })
    }
    handle_submit = () =>{
        try{
            if(!isValidPhoneNumber(this.state.phone)){
                throw new MyError('Please enter a valid phone number')
            }
            if(!validator.isEmail(this.state.email)){
                throw new MyError('Please enter a valid email address')
            }
            if(validator.isEmpty(this.state.name)){
                throw new MyError('Please enter your full name')
            }
            if(!!!this.state.location){
                throw new MyError('Please enter your locality')
            }
            this.props.add_center({
                name: this.state.name,
                // location: "H.NO-13/280 KALYANPURI NEW DELHI",
                userType:"Hospital",
                // "biography": "S",
                email:this.state.email,
                centerLocation:this.state.location,
                phone:this.state.phone
            })
        }catch(e){
            console.log(e,"error in Catch Block")
            this.setState({
                ret:{
                    success:false,
                    message:e.message
                }
            })
        }
    }
render(){
    return (
        <div className= 'col-md-8 col-xl-8  AllComponents AvailableTime'>
            <NewNotif 
                ret = {this.state.ret}
                retClr = {()=>this.setState({ret:false})}
            />
             <div className="centers_wrapper">
                    <div className="text-center">
                <h1 className="margin-top-medium_ris center_align_rish " >Add Center</h1>
                </div>
                <div className="margin-top-medium_ris centers-list-wrapper">
                    <div className="row">
                        <div className="col-md-6">
                        <input type="text" placeholder="Name"  name="name" value={this.state.name}   onChange={(e)=>this.setState({[e.target.name]:e.target.value})} className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div>

                        <div className="col-md-6">
                        <input type="text" placeholder="Alternate/Reception Phone No."   onChange={(e)=>this.handle_phone_change(e)}  name="phone" value={this.state.phone} className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div>

                        <div className="col-md-6">
                        <input type="tel" placeholder="Email" value={this.state.email}  onChange={(e)=>this.setState({[e.target.name]:e.target.value})} name="email" className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div>

                        <div className="col-md-6">
                        <input type="tel" placeholder="Location"  value={this.state.location} onChange={(e)=>this.setState({[e.target.name]:e.target.value})}  name="location" className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div>

                    </div>
                </div>
                <div className="text-center margin-top-medium_ris">
                <button onClick={()=>this.handle_submit()} className="common_button_rish">Submit</button>
                </div>
            </div>
        </div>
    )
}
}

const mapStateToProps = state => ({
    add_center_ret:state.user.add_center_ret,
    centers_data:state.user.data.centers_data
  })
  
export default connect(mapStateToProps, {add_center_clr, add_center, set_centers_data})(AddCenter);