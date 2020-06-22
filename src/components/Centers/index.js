import  React from 'react'
import AddCenter from "./AddCenter"
import { Link, withRouter } from 'react-router-dom'
import { get_url_params } from "../../utils/common_utilities"
import { connect } from 'react-redux';
import {  set_centers_data, get_center_cred, get_center_cred_clr, set_centers_cred } from "../../actions/userActions"
import LoaderComponent from '../functional/LoaderComponent';
import CenterComponent from "./CenterComponent"
import NewNotif from '../functional/NewNotif';
import { compose } from 'redux';

class Centers extends React.PureComponent{
        constructor(props){
            super(props)
            this.state= {
                valid:true
            }
        }

        componentWillReceiveProps(nextProps){
            console.log(nextProps.location,"this.props.location")
            if(!!nextProps.location.state){
                if(!!nextProps.location.state.add_center_success){
                    this.setState({
                        ret:{
                            success:true,
                            message:'Center successfully added.'
                        }
                    })
                    nextProps.history.replace({
                        pathname: this.props.location.pathname,
                        state: {}
                    });
                }
            }
         
        }

        // get_center_cred = (item) =>{
        //     this.setState({

        //     })
        // }
    render(){
        console.log(this.props,"this.props in Centers")
        if(get_url_params('addCenter')==='true'){
            console.log("Inside it")
            return <AddCenter />
        }
        return (
            <div className= 'col-md-8 col-xl-8  AllComponents AvailableTime'>
                <div className="centers_wrapper">
                    <NewNotif 
                    ret = {this.state.ret}
                    retClr = {()=>this.setState({ret:false})}
                    />
                    <div className="text-center">
                <h1 className="margin-top-medium_ris center_align_rish " >Centers List</h1>
                </div>
                <div className="margin-top-medium_ris centers-list-wrapper">
                    {
                        this.props.get_centers_loading?<LoaderComponent />:
                        <div className="row">
                        {this.props.centers_data.centers_list.map(item=>{
                           return  <div className="col-md-3">
                               <CenterComponent
                                data = {item}
                                centers_cred = {this.props.centers_data.centers_cred}
                                selected_id = {this.state.selected_id}
                                get_center_cred = {this.props.get_center_cred}
                                set_centers_cred = {this.props.set_centers_cred}
                                get_center_cred_ret = {this.props.get_center_cred_ret}
                                get_center_cred_clr = {this.props.get_center_cred_clr}
                               />
                       </div>
                        })}
                    </div>
                    }
                    
                </div>
                <div className="text-center margin-top-medium_ris">
                    {  !this.props.get_centers_loading &&  <Link to="/dashboard/centers?addCenter=true">
                <button className="common_button_rish margin_top_medium_rish margin_bottom_medium_rish">Add Center</button>
                </Link> }
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    centers_data:state.user.data.centers_data,
    get_center_cred_ret:state.user.get_center_cred_ret
  })
  
export default compose(
    withRouter,
    connect(mapStateToProps, { set_centers_data, get_center_cred, get_center_cred_clr , set_centers_cred})
)(Centers)