import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
// import SelectComponent from "../SelectComponent"
//import "./AvailabilityComponent.css";
import "./MyCatalogueComponent.css";
import { getUserCatalogue, uploadProcedures, uploadProceduresClr ,
upload,
uploadRetClr,
downloadCatalogueClr,
downloadCatalogue,
searchProcedures,
searchProceduresClr,
editProcedure,
editProcedureClr,
getSpecs,
getSpecsClr,
toAddServices,
toAddServicesClr,
addServices,
addServicesClr,
get_remaining_specs,
set_catalogue_data,
get_remaining_specs_clr,
add_specs,
add_specs_clr
} from '../../actions/userActions'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import SearchComponent from "../functional/SearchComponent"
import UploadCatalogue from "../functional/UploadCatalogue"
import ModalComponent from "../ModalComponent"
import DownloadCatalogue from "../functional/DownloadCatalogue"
import Procedure from "../functional/Procedure"
import EditProcedure from "../functional/editProcedure"
import LoaderComponent from "../functional/LoaderComponent"
import NotifFunc from "../functional/NotifFunc"
import NewNotif from "../functional/NewNotif"
import Select from "../Select";
import { is_positive_real_number } from "../../utils/common_utilities"


 const isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function MyError(message){
    this.message = message;
}

MyError.prototype = new Error()
// import history from '../../history';

class MyCatalogueComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            rowsToDisplay: 20,
            uploadCatalogFlag:false,
            editFlag:false,
            editCatalogFlag:false,
            limit:50,
            searchQuery:'',
            page:1,
            to_add_service_page:1,
            procedures:[],
            selectedProcedure:{},
            editProcedureLoading:false,
            selected_speciality:'',
            specialities:[],
            addProcedureFlag:false,
            procedures_toAdd:[],
            selected_procedures:[],
            add_remaining_specs:false,
            selected_remain_specs:[]
        }
        this.handleClick = this.handleClick.bind(this);
    }



    async componentDidMount() {
        this.setState({
            loading:true
        })
        this.props.get_remaining_specs()
        await this.props.getSpecs({
            type:"getUserSpecialities"
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.add_specs_ret){
            if(nextProps.add_specs_ret.success){
                let arr = []
                let added_specs = [...this.state.selected_remain_specs]
                let specialities = [...nextProps.catalogue_data.remaining_specs].filter((item,i)=>{
                 return  !added_specs.includes(item.name)
                })
                let new_specs = added_specs.map((item)=>{
                    return {
                        name:item,
                        value:[...nextProps.catalogue_data.remaining_specs].filter(val=>val.name===item)[0].id
                    }
                })
                nextProps.set_catalogue_data({
                    ...nextProps.catalogue_data,
                    remaining_specs:specialities
                })
                this.setState({
                    add_specs_loading:false,
                    ret:{
                        success:true,
                        message:nextProps.add_specs_ret.message
                    },
                    selected_remain_specs:[],
                    add_remaining_specs:false,
                    specialities:[...this.state.specialities, ...new_specs]
                })
            }else{
                this.setState({
                    add_specs_loading:false,
                    ret:{
                        success:false,
                        data:nextProps.add_specs_ret.message
                    }
                })
            }
          nextProps.add_specs_clr()
        }


        if(nextProps.get_remain_specs_ret){
            if(nextProps.get_remain_specs_ret.success){
                let arr = []
                let specialities = [...nextProps.get_remain_specs_ret.data]
                specialities.forEach((item,i)=>{
                  let obj = {
                    name:item.speciality,
                    value:item.speciality,
                    id:item._id
                  }
                  arr.push(obj)
                })
                nextProps.set_catalogue_data({
                    ...nextProps.catalogue_data,
                    remaining_specs:arr
                })
            }else{

            }
          nextProps.get_remaining_specs_clr()
        }


        if(!!nextProps.toAddServicesRet){
            if(nextProps.toAddServicesRet.success){
                this.setState({
                    procedures_toAdd:nextProps.toAddServicesRet.data,
                    loading:false,
                    selected_procedures:[]
                })
            }else{
                this.setState({
                    loading:false
                })
            }
            nextProps.toAddServicesClr()
        }
            if(!!nextProps.searchProceduresRet){
                if(nextProps.searchProceduresRet.success){
                    if(nextProps.searchProceduresRet.type==="servicestoAdd"){

                    }else{
                        this.setState({
                            selected_procedures:[],
                            procedures:nextProps.searchProceduresRet.data,
                            loading:false,
                            hide_view_more:nextProps.searchProceduresRet.data.length === this.state.procedures.length?true:false
                        })
                    }
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.searchProceduresClr()
            }
            if(!!nextProps.getSpecsRet){
                if(nextProps.getSpecsRet.success){
                    let arr = []
                    let specialities = [...nextProps.getSpecsRet.data]
                    specialities.forEach((item,i)=>{
                      let obj = {
                        name:item.speciality,
                        value:item.specialityId
                      }
                      arr.push(obj)
                    })
                    if(arr.length!==0){
                        this.setState({
                            specialities:arr,
                            selected_speciality:arr[0].value,
                            loading:true
                        },()=>{this.props.searchProcedures({limit:50, searchQuery:'', page:1, specialityId:this.state.selected_speciality})  })
                    }  
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.getSpecsClr()
            }
    }
    
    handleClick =()=> {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }
    handleSelectedProcedureChange = (e, serviceId) =>{
        if(!!is_positive_real_number(e.target.value)){
            let arr =[...this.state.selected_procedures]
            let obj = {
            }
            let id= ''
         arr.every(function(element, index) {
                if(element.serviceId===serviceId){
                  obj = {
                      ...element,
                      price:[parseInt(e.target.value,10)]
                  }
                  id = index
                  return false
                }
                 return true
              })
        let newArr = arr.filter((item,i)=>{
            return  item.serviceId!==serviceId
        })
            newArr.push(obj)
            this.setState({
               selected_procedures:newArr
            })
        }
    }

    handleVarianceChange = (e,serviceId) =>{
        let arr = JSON.parse(JSON.stringify(this.state.selected_procedures))
        let obj = {
        }
        let id= ''
     arr.every(function(element, index) {
            if(element.serviceId===serviceId){
              obj = {
                  ...element,
                  variance:parseInt(e.target.value, 10)
              }
              id = index
              return false
            }
             return true
          })
    let newArr = arr.filter((item,i)=>{
        return  item.serviceId!==serviceId
    })
    newArr.push(obj)
    this.setState({
       selected_procedures:newArr
    })
    }

    generateUploadBody = () =>{
        return(
            <React.Fragment>
               <UploadCatalogue
               uploadProceduresClr ={this.props.uploadProceduresClr}
               uploadProceduresRet ={this.props.uploadProceduresRet}
               uploadProcedures = {this.props.uploadProcedures}

               upload = {this.props.upload}
               uploadRet = {this.props.uploadRet}
               uploadRetClr = {this.props.uploadRetClr}
               closeModal = {()=>this.setState({uploadCatalogFlag:false})}
               />        
            </React.Fragment>
          
        )
    }

    generateEditCatalogue = () =>{
        return(
            <EditProcedure
            closeModal = {()=>this.handleCloseEditModal()}
            />
        )
    }

    handleCloseCataModal = () =>{
        this.setState({
            uploadCatalogFlag:false
        })
    }

    handleCloseEditModal = () =>{
        this.setState({
            editCatalogFlag:false
        })
    }

    handleEditInclusion = () =>{
        this.setState({
            editCatalogFlag:true
        })
    }

    searchProceduresFun = (data) =>{
        this.setState({
            loading:true
        })
        if(this.state.addProcedureFlag){
                this.props.toAddServices({
                   searchQuery:data.searchQuery,
                   page:'1',
                   limit:'50',
                   specialityId:this.state.selected_speciality
                })
        }else{
              this.props.searchProcedures(data)
        }
      
    }

    viewMore = (obj) =>{
        this.setState({
            ...obj,
            limit:this.state.limit + 50,
            loading:true
        },()=>this.props.searchProcedures(
          {
            limit:this.state.limit,
            page:1,
            searchQuery:'',
            specialityId:this.state.selected_speciality
          } 
        ))
    }

    handleSubmit = () =>{
        if(this.state.addProcedureFlag){
            let procedure = this.state.selectedProcedure

            try {
                let arr = [...this.state.selected_procedures]
                let newArr = arr.map((item,i)=>{
                    console.log(item,"item in handleSubmit")
                    if(!!!item.price){
                        throw new MyError(`${item.service} price cannot be zero`)
                     }else if(!!!parseInt(item.price[0],10)){
                        throw new MyError(`${item.service} price cannot be empty`)
                     }
                    return {
                        ...item,
                        price: parseInt(item.price[0],10)
                    }
                })
                let obj = {
                    specialityId:this.state.selected_procedures[0].specialityId,
                    services:newArr
                }
                this.setState({
                    addProcedureLoading:true
                },()=>this.props.addServices(obj))
            }catch(e){
                this.setState({
                    ret:{
                        success:false,
                        message:e.message
                    }
                })
            }    
        }else{
            try {
                let arr = [...this.state.selected_procedures]
                let newArr = arr.map((item,i)=>{
                    let procedure_price = parseInt(item.price[0],10)
                    if(!!!procedure_price){
                       throw new MyError(`${item.service} price cannot be empty`)
                    }
                    return {
                        ...item,
                        price:procedure_price
                    }
                })
                this.setState({
                    editProcedureLoading:true
                },()=>{
                    let obj = {
                        specialityId:this.state.selected_procedures[0].specialityId,
                        services:newArr
                    }
                    this.props.editProcedure(obj)
                })
            } catch(e){
                this.setState({
                    ret:{
                        success:false,
                        message:e.message
                    }
                })
            }  
            
        }
    }

    onEdit = (data) =>{
        console.log(data,"data from on Edit")
        this.setState({
            edit_Proc_flag:true
        })
        let selected_data_removed = [...this.state.selected_procedures].filter((item=>item.serviceId !== data.data.serviceId))
        let selected_procedures = [...this.state.selected_procedures]
        if(selected_data_removed.length === selected_procedures.length){
            selected_procedures.push(data.data)
        }else{
            selected_procedures = [...selected_data_removed]
        }
        this.setState({
            selected_procedures:selected_procedures
        },()=>this.setState({
            edit_Proc_flag:false
        }))
    }

    handleSpecialitySelect = (e) =>{
        this.setState({
            selected_speciality:e.target.value,
            loading:true
        },()=>{
            this.props.searchProcedures({
                searchQuery:'',
                page:'1',
                limit:'50',
                specialityId:this.state.selected_speciality
            })
        })
    }
 handleAddProcedureClick = (e) =>{
    e.preventDefault()
    this.setState({
        loading:true,
        addProcedureFlag:true,
        editFlag:true,
        selected_procedures:[]
    },()=>{
        this.props.toAddServices({
            searchQuery:'',
            page:'1',
            limit:'50',
            specialityId:this.state.selected_speciality
 })  
    })          
    }

    handleNext_add_procedures = (obj) =>{
        this.setState({
            ...this.state,
            ...obj,
            loading:true,
            addProcedureFlag:true,
            to_add_service_page:this.state.to_add_service_page + 1
        },()=>{
            this.props.toAddServices({
                searchQuery:'',
                page:this.state.to_add_service_page,
                limit:'50',
                specialityId:this.state.selected_speciality
     })  
        })
    }

    editProcedureLoadingOff =()=>{
        this.setState({
            editProcedureLoading:false,
            // editFlag:false,
            // selected_procedures:this.state.selected_procedures
        },()=>{
            this.props.editProcedureClr()
            this.props.searchProcedures({
                limit:50,
                searchQuery:'',
                page:1,
                specialityId:this.state.selected_speciality 
     })})
    }

    addProcedureLoadingOff =() =>{
        this.setState({
            addProcedureLoading:false,
            // selected_procedures:[]
        },()=>{
            this.props.addServicesClr()
            this.props.toAddServices({
                searchQuery:'',
                page:'1',
                limit:'300',
                specialityId:this.state.selected_speciality
             })})
    }

    handle_change_selected_remain_specs = (e) =>{
        try{
            let arr = [...this.state.selected_remain_specs]
            if(arr.includes(e.target.value))
            throw new MyError(`${e.target.value} is already selected`)
            arr.unshift(e.target.value)
            this.setState({
                selected_remain_specs:arr
            })
        } catch (e){
            this.setState({
                ret:{
                    success:true,
                    message:e.message
                }
            })
        }
    }
    add_selected_remain_specs = () =>{
        try{
            if(this.state.selected_remain_specs.length===0)
            throw new MyError("Select Speciality to add")
            let arr = []
            this.state.selected_remain_specs.map((spec)=>{
               let boom = this.props.catalogue_data.remaining_specs.filter((item=>item.name===spec))
               if(boom.length!==0){
                   arr.push(boom[0].id)
               }
            })
            this.setState({
                add_specs_loading:true
            },()=>this.props.add_specs({specialities:arr}))
        }catch(e){
            this.setState({
                ret:{
                    success:false,
                    message:e.message
                }
            })
        }
    }

    render() {
        console.log(this.state,"this.state in  Mycatalogue")
        // console.log(this.props,"this.props. in Mycatalogue ")
                return (
                    <React.Fragment>
                        <NotifFunc />
                        <NewNotif 
                            ret = {this.state.ret}
                            retClr= {()=>this.setState({ret:false})}
                        />
                    <div className='col-md-8 col-xl-8 catalogueComponent'>
                        <div className='row justify-content-center'>
                            {/* <p className='catalogue'>Catalogue</p> */}
                            <div className='catalogue' >
                            <h4>Catalogue</h4>
                            </div>
                        </div>
                        <div className='row listOfService'>
                              <div className='col-md-3 text-center'>
                                 <a onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({uploadCatalogFlag:true})
                                    }
                                     } href=""><img className="catalogue-img" src="/upload.svg" alt=""></img>
                                 <p className="uploadCata">Upload File</p></a>
                              </div>
                             <DownloadCatalogue
                                downloadCatalogueClr = {this.props.downloadCatalogueClr}
                                downloadCatalogueRet = {this.props.downloadCatalogueRet}
                                downloadCatalogue ={this.props.downloadCatalogue}
                             />
                              <div className='col-md-3 text-center'>
                                 <a href="" onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({
                                        editFlag:true,
                                        selected_procedures:[],
                                        addProcedureFlag:false})
                                    }}><img className="catalogue-img" src="/edit.svg" alt=""></img>
                                 <p className="uploadCata">Edit Catalogue</p></a>
                              </div>
                              <div className='col-md-3 text-center'>
                                 <a href="" onClick={(e)=>this.handleAddProcedureClick(e)}><img className="catalogue-img" src="/edit.svg" alt=""></img>
                                 <p className="uploadCata">Add Catalogue</p></a>
                              </div>
                        </div>
                        {!this.state.addProcedureFlag &&  <div style={{position:'relative'}} className="text-center">
                          {this.state.add_specs_loading && <LoaderComponent />}
                            <div className="add_specs_wrapper">
                            {   
                                this.state.add_remaining_specs? 
                                <React.Fragment>
                                <Select
                                options = {this.props.catalogue_data.remaining_specs}
                                handleChange = {this.handle_change_selected_remain_specs}
                                placeholder= "Speciality"
                                input_text_class = "login_select"
                                value = {this.state.selected_remain_specs[0]}
                                name = "remain_specs"
                                label = "Speciality"
                              />
                              <div className="margin_top_small_rish">
                              {this.state.selected_remain_specs.map((item,i)=>(
                               <React.Fragment>
                                    
                            <div className="signup_specialities_wrapper_ris">
                               <div className="signup_speciality">
                                     <p className="signup_speciality_name">{item}</p>
                                     <p onClick={()=>this.setState({selected_remain_specs:[...this.state.selected_remain_specs].filter((val=>val!==item))})} className="signup_speciality_X">X</p>
                               </div>
                            </div>
                               <hr />
                                </React.Fragment>
                                  ))}
                                <div className="text-center">
                                 <button onClick = {()=>this.add_selected_remain_specs()} className='button_rish color_white_rish margin_top_small_rish margin_bottom_small_rish add_speciality_button'>Add</button>
                                </div>  
                              </div>
                              </React.Fragment>
                              : 
                              <button onClick = {()=>this.setState({add_remaining_specs: true})} className='button_rish color_white_rish margin_top_small_rish margin_bottom_small_rish add_speciality_button'>Add Speciality</button>
                            }
                         </div>
                        </div>
}
                     <div className="row gastroent_mar">
                       {
                           !this.state.addProcedureFlag &&  <div className="text-center col-xl-6">
                               <Select
                                 options = {this.state.specialities}
                                 handleChange = {this.handleSpecialitySelect}
                                 placeholder= "Speciality"
                                 input_text_class = "login_select"
                                 value = {this.state.selected_speciality}
                                 name = "speciality_chosen"
                                 label = "Speciality"
                               />
                              
                       </div>
                       }   
                      <div className="text-center col-xl-6 serc_mar_pad">
                          <img src="/search.jpg" className="serc_icn"/>
                            <SearchComponent 
                                searchProcedures = {this.searchProceduresFun}
                                searchProceduresClr = {this.props.searchProceduresClr}
                                searchProceduresRet = {this.props.searchProceduresRet}
                                selected_speciality = {this.state.selected_speciality}
                                
                            />     
                        </div>
                        </div>
                        <div className='listOfService'>
                            <div className='row listOfServiceHeading'>
                                <div className='col-md-6 text-center test_tme'>
                                    Test Name
                                    </div>
                                <div className='col-md-3 text-center'>
                                    Price
                                </div>
                                <div className='col-md-3 text-center'>
                                    Variance
                                </div>
                            </div>
                        </div>
                        <div className="procedures_container_rish">
                        {
                            this.state.loading &&    <div className="loading-wrapper_ris">
                              <React.Fragment>
                                 <LoaderComponent />
                               </React.Fragment>
                               </div>
                        }
                        {this.state.editProcedureLoading && <LoaderComponent />}
                        { !this.state.addProcedureFlag &&
                            (this.state.procedures.length > 0 ? this.state.procedures.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            disabled={!this.state.editFlag}
                            onEdit = {this.onEdit}
                            selectedProcedure = {this.state.selectedProcedure}
                            selected_procedures = {this.state.selected_procedures}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            ret = {this.props.editProcedureRet}
                            clr = {this.props.editProcedureClr}
                            loadingOff = {()=>this.editProcedureLoadingOff()}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>)
                        }
                        {!this.state.addProcedureFlag && <div className='text-center'>
                            {((this.state.procedures.length !==0) && (!!!this.state.hide_view_more)) && <button onClick={()=>this.viewMore({})} className="catalogueViewMore">View more</button> }    
                        </div>}
                       {!this.state.addProcedureFlag && <div className='text-center'>
                            {(((this.state.editFlag) && (this.state.selected_procedures.length !== 0)))  && <button style={{marginBottom:'1rem',marginTop:'1rem'}} onClick={this.handleSubmit} className="common-button">Submit</button> }    
                        </div>}
                        {this.state.addProcedureLoading && <LoaderComponent />}
                        {!!this.state.addProcedureFlag  &&    (this.state.procedures_toAdd.length > 0 ? this.state.procedures_toAdd.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            onEdit = {this.onEdit}
                            disabled={(!!((this.state.editFlag) && (this.state.selected_procedures.length !== 0)))}
                            selectedProcedure = {this.state.selectedProcedure}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            ret = {this.props.addServicesRet}
                            clr = {this.props.addServicesClr}
                            loadingOff = {()=>this.addProcedureLoadingOff()}
                            selected_procedures = {this.state.selected_procedures}
                            disabled={false}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>)
                        }
                       {/* {this.state.addProcedureFlag && <div className='text-center'>
                            {this.state.procedures_toAdd.length !==0 && <button onClick={()=>this.handleNext_add_procedures({
                                editFlag:true
                            })} className="catalogueViewMore">View more</button> }    
                        </div>} */}

                        {this.state.addProcedureFlag  && <div className='text-center'>
                            {(((this.state.editFlag) && (this.state.selected_procedures.length !== 0)) )  && <button style={{marginBottom:'1rem',marginTop:'1rem'}} onClick={this.handleSubmit} className="common-button">Submit</button> }    
                        </div>}

                        </div>

                    </div>
                    <div className='col-md-3'></div>
              
                <br />
            <ModalComponent 
                open = {this.state.uploadCatalogFlag}
                handleClose = {this.handleCloseCataModal}
                modalBody = {this.generateUploadBody}
            />

            <ModalComponent 
                open = {this.state.editCatalogFlag}
                handleClose = {this.handleCloseEditModal}
                modalBody = {this.generateEditCatalogue}
                />  
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    catalogues: state.user.catalogues,
    uploadProceduresRet:state.user.uploadProceduresRet,
    uploadProceduresLoading:state.user.uploadProceduresLoading,
    uploadRet:state.user.uploadRet,
    uploadLoading:state.user.uploadLoading,
    downloadCatalogueRet:state.user.downloadCatalogueRet,
    searchProceduresRet:state.user.searchProceduresRet,
    editProcedureRet:state.user.editProcedureRet,
    getSpecsRet:state.user.getSpecsRet,
    toAddServicesRet:state.user.toAddServicesRet,
    addServicesRet:state.user.addServicesRet,
    catalogue_data:state.user.data.catalogue_data,
    get_remain_specs_ret:state.user.get_remain_specs_ret,
    add_specs_ret:state.user.add_specs_ret
})

export default connect(mapStateToProps, { getUserCatalogue, 
    uploadProcedures, uploadProceduresClr, upload,
    searchProcedures, searchProceduresClr,
uploadRetClr,
downloadCatalogue,
downloadCatalogueClr,
editProcedure,
editProcedureClr,
getSpecs,
getSpecsClr,
toAddServices,
toAddServicesClr,
addServices,
addServicesClr,
get_remaining_specs,
get_remaining_specs_clr,
set_catalogue_data,
set_catalogue_data,
add_specs_clr,
add_specs
})(MyCatalogueComponent);
