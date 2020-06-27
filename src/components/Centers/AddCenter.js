import React from "react"
import { connect } from 'react-redux';
import NewNotif from "../functional/NewNotif"
import { add_center_clr, add_center, set_centers_data } from "../../actions/userActions"
import validator from 'validator'
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Redirect } from "react-router-dom"
import Map from "../MapComponent"
import LoaderComponent from "../functional/LoaderComponent";

function MyError(message){
    this.message = message;
}


class AddCenter extends React.PureComponent{
    constructor(props){
        super(props)
        this.state= {
            valid:true,
            add_successfull:false,
            name:'',
            centerLocation:'',
            location:''
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
                   },
                   add_successfull:true,
                   loading:false
               })
               
            }else{
                this.setState({
                    ret:nextProps.add_center_ret,
                    loading:false
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
        console.log("Inside handle_submit")
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
            this.setState({
                loading:true
            })
            this.props.add_center({
                name: this.state.name,
                // location: "H.NO-13/280 KALYANPURI NEW DELHI",
                userType:"Hospital",
                // "biography": "S",
                email:this.state.email,
                centerLocation:this.state.centerLocation,
                alternateNumber:this.state.phone,
                location:this.state.location,
                address:this.state.address
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

    set_cordinates = () =>{

    }
render(){
    console.log(this.state,'this.state in add Center')
    if(this.state.add_successfull){
       return <Redirect to= {{
        pathname: "/dashboard/centers",
        state: { add_center_success: true }
    }}  />
    }
    return (
        <div className= 'main_content_rish'>
            <NewNotif 
                ret = {this.state.ret}
                retClr = {()=>this.setState({ret:false})}
            />
             <div style={{position:'relative',paddingTop:'1rem'}} className="centers_wrapper">
                 {this.state.loading && <LoaderComponent />}
                    <div className="text-center">
                <h4 style={{position:'relative'}} className="section_heading_rish">Centres</h4>
                </div>
                <div className="margin-top-medium_ris centers-list-wrapper">
                    <div className="row">
                        <div className="col-md-6">
                        <input type="text" placeholder="Name"  name="name" value={this.state.name}   onChange={(e)=>this.setState({[e.target.name]:e.target.value})} className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div>

                        <div className="col-md-6">
                        <input type="text" placeholder="Alternate/Reception Phone No."   onChange={(e)=>this.handle_phone_change(e)}  name="phone" value={this.state.phone} className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div>

                        <div className="col-md-12">
                        <input type="tel" placeholder="Email" value={this.state.email}  onChange={(e)=>this.setState({[e.target.name]:e.target.value})} name="email" className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div>  
                        {/* <div className="col-md-6">
                        <input type="tel" placeholder="Location"  value={this.state.location} onChange={(e)=>this.setState({[e.target.name]:e.target.value})}  name="location" className="input_typt_ris form-control editbankdetailfield input-field-common" />
                        </div> */}
                    </div>
                    <div style={{display:'block'}}>
                        <Map
                          google={this.props.google}
                          no_save_changes = {true}
                          center={{lat: 18.5204, lng: 73.8567}}
                          location = {{
                              coordinates:[77.026344,28.457523]
                          }}
                          update_location = {(data)=>this.setState({
                              centerLocation: `${data.city}, ${data.area}`,
                              location:data.location,
                              address:data.address
                          })}
                          set_cordinates = {this.set_cordinates}
                          set_user_info = {this.props.set_user_info}
                          height='300px'
                          zoom={15}
                          edit_location_loading = {this.props.edit_location_loading}
                          edit_location = {this.edit_location}
                          edit_location_clr = {this.edit_location_clr}
                          edit_location_ret = {this.props.edit_location_ret}
                          />
                        </div>
                </div>
                <div className="text-center margin-top-medium_ris">
                  <button style={{marginTop:'3rem', marginBottom:'1rem'}} onClick={()=>this.handle_submit()} className="common_button_rish cursor-pointer">Submit</button>
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