import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import SelectComponent from "../SelectComponent"
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
addServicesClr
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


 const isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

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
            procedures:[],
            selectedProcedure:{},
            editProcedureLoading:false,
            selected_speciality:'',
            specialities:[],
            addProcedureFlag:false,
            procedures_toAdd:[]
        }
        this.handleClick = this.handleClick.bind(this);
    }



    async componentDidMount() {
        this.setState({
            loading:true
        })
        await this.props.getSpecs({
            type:"getUserSpecialities"
        })
    }

    componentWillReceiveProps(nextProps){

        if(!!nextProps.toAddServicesRet){
            if(nextProps.toAddServicesRet.success){
                this.setState({
                    procedures_toAdd:nextProps.toAddServicesRet.data,
                    loading:false
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
                            procedures:nextProps.searchProceduresRet.data,
                            loading:false
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
                    let specialities = JSON.parse(JSON.stringify(nextProps.getSpecsRet.data))
                    specialities.forEach((item,i)=>{
                      let obj = {
                        name:item.speciality,
                        value:item.specialityId
                      }
                      arr.push(obj)
                    })
                    this.setState({
                        specialities:arr,
                        selected_speciality:arr[0].value,
                        loading:true
                    },()=>{
                          this.props.searchProcedures({
                                      limit:50,
                                      searchQuery:'',
                                      page:1,
                                      specialityId:this.state.selected_speciality                            })
                    })
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.getSpecsClr()
            }
    }
    
    handleClick() {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }
    handleSelectedProcedureChange = (e) =>{
        let arr = []
        arr.push(e.target.value)
        this.setState({
            selectedProcedure:{
                ...this.state.selectedProcedure,
                price:arr
            }
           
        })
    }

    handleVarianceChange = (e) =>{
        this.setState({
            selectedProcedure:{
                ...this.state.selectedProcedure,
                variance:e.target.value
            }
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

    viewMore = () =>{
        this.setState({
            limit:this.state.limit + 50,
            loading:true
        },()=>this.props.searchProcedures(
          {
            limit:this.state.limit,
            page:1,
            searchQuery:''
          } 
        ))
    }

    handleSubmit = () =>{
        if(this.state.addProcedureFlag){
            let procedure = this.state.selectedProcedure
            let obj = {
                specialityId:procedure.specialityId,
                services:[
                    {
                        serviceId:procedure.serviceId,
                        price:procedure.price[0],
                        homeColection:false,
                        variance:procedure.variance
                    }
                ]
            }
            this.setState({
                addProcedureLoading:true
            },()=>this.props.addServices(obj))
            
        }else{
            this.setState({
                editProcedureLoading:true
            },()=>this.props.editProcedure(this.state.selectedProcedure)) 
        }
        
    }

    onEdit = (data) =>{
        this.setState({
            selectedProcedure:{
                ...data.data,
                id:data.id
            }
        })
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
        editFlag:true
    },()=>{
        this.props.toAddServices({
            searchQuery:'',
            page:'1',
            limit:'50',
            specialityId:this.state.selected_speciality
 })  
    })
                
    }

    editProcedureLoadingOff(){
        this.setState({
            editProcedureLoading:false,
            editFlag:false,
            selectedProcedure:{}
        },()=>{
            this.props.searchProcedures({
                limit:50,
                searchQuery:'',
                page:1,
                specialityId:this.state.selected_speciality 
     })})
    }

    addProcedureLoadingOff(){
        this.setState({
            addProcedureLoading:false,
            selectedProcedure:{}
        },()=>{
            this.props.toAddServices({
                searchQuery:'',
                page:'1',
                limit:'50',
                specialityId:this.state.selected_speciality
             })})
    }

    render() {
        console.log(this.props.addServicesRet,"this.props.addServicesRet")
                return (
            <div>
                <div className='row'>
                    <DashboardHeader />
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <SidebarComponent />
                    </div>
                    <div className='col-md-8 catalogueComponent'>
                        <div className='row justify-content-center'>
                            <p className='catalogue'>Catalogue</p>
                        </div>
                        <div className='row listOfService'>
                              <div className='col-md-3 text-center'>
                                 <a onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({uploadCatalogFlag:true})
                                    }
                                     } href=""><img src="./upload.svg" alt=""></img>
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
                                        addProcedureFlag:false})
                                    }}><img src="./edit.svg" alt=""></img>
                                 <p className="uploadCata">Edit Catalogue</p></a>
                              </div>
                              <div className='col-md-3 text-center'>
                                 <a href="" onClick={(e)=>this.handleAddProcedureClick(e)}><img src="./edit.svg" alt=""></img>
                                 <p className="uploadCata">Add Catalogue</p></a>
                              </div>
                        </div>
                       {
                           !this.state.addProcedureFlag &&  <div className="text-center  ">
                           <SelectComponent
                           options = {this.state.specialities}
                           handleChange = {this.handleSpecialitySelect}
                           value = {this.state.selected_speciality}
                           labelStyles = {{
                               'padding': '6px 0px 0px 12px'
                           }}
                           wrapperDivStyles = {{
                                   'width': '65%',
                                   'marginLeft': 'auto',
                                  'marginRight': 'auto'
                               }}
                           selectStyles = {{  
                               'border':'1px solid #01D35A !important;',
                               'padding':'3px',
                               'borderRadius':'39px',
                               'padding':'2%',
                               '&:active':{
                                   'backgroundColor':'none !important'
                               }}
                       }
                           name = "speciality_chosen"
                           label = "Speciality"
                  />
                       </div>

                       }   
                      <div className="text-center">
                            <SearchComponent 
                                searchProcedures = {this.searchProceduresFun}
                                searchProceduresClr = {this.props.searchProceduresClr}
                                searchProceduresRet = {this.props.searchProceduresRet}

                            />     
                        </div>
                        <div className='listOfService'>
                            <div className='row listOfServiceHeading'>
                                <div className='col-md-6'>
                                    Test Name
                                    </div>
                                <div className='col-md-3'>
                                    Price
                                </div>
                                <div className='col-md-3'>
                                    Variance
                                </div>
                            </div>
                        </div>

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
                            onEdit = {this.onEdit}
                            selectedProcedure = {this.state.selectedProcedure}
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
                            {this.state.procedures.length !==0 && <button onClick={this.viewMore} className="catalogueViewMore">View more</button> }    
                        </div>}

                       {!this.state.addProcedureFlag && <div className='text-center'>
                            {(((this.state.editFlag) && (!isEmpty(this.state.selectedProcedure))))  && <button onClick={this.handleSubmit} className="common-button">Submit</button> }    
                        </div>}


                        {this.state.addProcedureLoading && <LoaderComponent />}
                        {!!this.state.addProcedureFlag  &&    (this.state.procedures_toAdd.length > 0 ? this.state.procedures_toAdd.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            onEdit = {this.onEdit}
                            selectedProcedure = {this.state.selectedProcedure}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            ret = {this.props.addServicesRet}
                            clr = {this.props.addServicesClr}
                            loadingOff = {()=>this.addProcedureLoadingOff()}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>)
                        }
                       {this.state.addProcedureFlag && <div className='text-center'>
                            {this.state.procedures_toAdd.length !==0 && <button onClick={this.viewMore} className="catalogueViewMore">View more</button> }    
                        </div>}

                        {this.state.addProcedureFlag  && <div className='text-center'>
                            {(((this.state.editFlag) && (!isEmpty(this.state.selectedProcedure))))  && <button onClick={this.handleSubmit} className="common-button">Submit</button> }    
                        </div>}

                    </div>
                    <div className='col-md-3'></div>
                </div>
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
            </div>
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
    addServicesRet:state.user.addServicesRet
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
addServicesClr
})(MyCatalogueComponent);
