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
add_specs_clr,
get_user_specialities,
get_user_specialities_loading,
update_procedure_loading,
update_procedure,
add_procedure,
add_procedure_loading,
search_procedures,
search_procedures_loading
} from '../../actions/userActions'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import SearchComponent from "../functional/SearchComponent"
import UploadCatalogue from "../functional/UploadCatalogue"
import ModalComponent from "../ModalComponent"
import DownloadCatalogue from "../functional/DownloadCatalogue"
import Procedure from "../functional/Procedure"
import EditProcedure from "../functional/editProcedure"
import ProcedureView from "../functional/ProcedureView"
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
            editFlag:true,
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
            selected_remain_specs:[],
            procedure_for_detail:false
        }
        this.handleClick = this.handleClick.bind(this);
    }



    async componentDidMount() {
        this.setState({
            loading:true
        })
        this.props.get_remaining_specs()
        this.props.get_user_specialities({
            type:"getUserSpecialities"
        })
        // await this.props.getSpecs({
        //     type:"getUserSpecialities"
        // })
    }




    add_procedure_loading = (data) =>{
        if(!!this.props.add_procedure_loading_flag){
            let arr = [...this.state.selected_procedures]
            let return_flag = false
            arr.every((element, index) => {
                  if(element.serviceId === data.serviceId){
                    return_flag = true
                      return false
                  }
                 return true
              })
              return return_flag
        }else{
            return false
        }
    }

    add_procedure = (data)=> {
        try {
            let arr = !!data?this.state.selected_procedures.filter((item)=>item.serviceId === data.serviceId):this.state.selected_procedures
            let newArr = arr.map((item,i)=>{
               console.log(item,"item in add_procedure")
               console.log(this.state,"this.state in add_procedure")
                if(!!!item.price){
                    throw new MyError(`${item.service} price cannot be empty`)
                }
                let procedure_price = parseInt(item.price[0],10)
                if(!!!procedure_price){
                   throw new MyError(`${item.service} price cannot be empty`)
                }
                if((!!!item.variance) && item.variance!==0){
                    throw new MyError(`${item.service} variance cannot be empty`)
                }
                return {
                    ...item,
                    price:procedure_price
                }
            })
            let obj = {
                specialityId:this.state.selected_procedures[0].specialityId,
                services:newArr
            }
            this.setState({
                procedure_for_update:!!data?data:false,
                refresh:!this.state.refresh
            },()=> this.props.add_procedure(obj))
        } catch(e){
            this.setState({
                ret:{
                    success:false,
                    message:e.message
                }
            })
        }  
    }


    get_update_procedure_loading = (data) =>{
        console.log(this.state.procedure_for_update, data ,"data in get_update_procedure loading")
        if(!!this.props.update_procedure_loading_flag){
            let arr = [...this.state.selected_procedures]
            let return_flag = false
            arr.every((element, index) => {
                  if(element.serviceId === data.serviceId){
                    return_flag = true
                      return false
                  }
                 return true
              })
              return return_flag
        }else{
            return false
        }
    }

    update_procedure = (data)=> {
        try {
            let arr = !!data?this.state.selected_procedures.filter((item)=>item.serviceId === data.serviceId):this.state.selected_procedures
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
            let obj = {
                specialityId:this.state.selected_procedures[0].specialityId,
                services:newArr
            }
            this.setState({
                procedure_for_update:!!data?data:false,
                refresh:!this.state.refresh
            },()=> this.props.update_procedure(obj))
        } catch(e){
            this.setState({
                ret:{
                    success:false,
                    message:e.message
                }
            })
        }  
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.add_procedure_ret){
            if(nextProps.add_procedure_ret.success){
                      let arr = [...this.state.procedures_toAdd]
                      let selected_procedures = [...this.state.selected_procedures]
                      let updated_procedure = false
                      let updated_procedures = false
                    console.log(this.state,"sdfsfsdfdfdfdfdsfdsfdsfdsfdsfdsf")
                      if(!!this.state.procedure_for_update){
                          selected_procedures.every((element, index) => {
                              console.log(this.state,"state in selecetedProcedures")
                                if(element.serviceId === this.state.procedure_for_update.serviceId){
                                  updated_procedure = element
                                    return false
                                }
                               return true
                            })
                          console.log(updated_procedure,"sddsdsadasdsadasd")
                          console.log(arr,'arr in addProcedure ret')
                           updated_procedures = arr.filter((item)=>(  !!(item.serviceId !== updated_procedure.serviceId) ))

                          console.log(updated_procedures,'updated_procedures in addProcedure ret')
                      }else{
                          let procedures = [...this.state.procedures_toAdd]
                          let seleceted_procedures = [...this.state.selected_procedures]
                           updated_procedures = procedures.filter((item)=>{
                               let return_item = true
                                seleceted_procedures.every((element)=>{
                                   if(element.serviceId === item.serviceId){
                                          return_item = false
                                          return false
                                      }
                                      return return_item
                               })
                               return return_item
                           }) 
                      }
  
                      console.log(updated_procedures,"updated_procedures")
                 
                      this.setState({
                          procedures_toAdd:updated_procedures,
                          refresh:!this.state.refresh,
                          ret:{
                              success:true,
                              message:nextProps.add_procedure_ret.message
                          },
                          procedure_for_update:false,
                          procedure_for_detail:this.state.procedure_for_detail.serviceId===updated_procedure.serviceId?updated_procedure:this.state.procedure_for_detail,
                          selected_procedures:updated_procedure?[...this.state.selected_procedures].filter((item)=>item.serviceId!==updated_procedure.serviceId):[]
                      })
            }else {
                this.setState({
                    ret:{
                        success:false,
                        message:nextProps.add_procedure_ret.message
                    }
                })
            }
            nextProps.add_procedure_loading()
        }

      if(nextProps.update_procedure_ret){
          if(nextProps.update_procedure_ret.success){
                    let arr = [...this.state.procedures]
                    let selected_procedures = [...this.state.selected_procedures]
                    let updated_procedure = false
                    let updated_procedures = false

                    if(!!this.state.procedure_for_update){
                        selected_procedures.every((element, index) => {
                            console.log(this.state,"state in selecetedProcedures")
                              if(element.serviceId === this.state.procedure_for_update.serviceId){
                                updated_procedure = element
                                  return false
                              }
                             return true
                          })
                        console.log(updated_procedure,"sddsdsadasdsadasd")
                         updated_procedures = arr.map((item)=>{
                            if(item.serviceId === updated_procedure.serviceId){
                                 return updated_procedure
                            }else{
                                return item
                            }
                        })
                    }else{
                        let procedures = [...this.state.procedures]
                        let seleceted_procedures = [...this.state.selected_procedures]
                         updated_procedures = procedures.map((item)=>{
                             let return_item = {}
                              seleceted_procedures.every((element)=>{
                                 if(element.serviceId === item.serviceId){
                                        return_item = element
                                        return false
                                    }
                                    return_item = item
                                    return true
                             })
                             return return_item
                         }) 
                    }

                    console.log(updated_procedures,"updated_procedures")
               
                    this.setState({
                        procedures:updated_procedures,
                        refresh:!this.state.refresh,
                        ret:{
                            success:true,
                            message:nextProps.update_procedure_ret.message
                        },
                        procedure_for_update:false,
                        procedure_for_detail:this.state.procedure_for_detail.serviceId===updated_procedure.serviceId?updated_procedure:this.state.procedure_for_detail,
                        selected_procedures:updated_procedure?[...this.state.selected_procedures].filter((item)=>item.serviceId!==updated_procedure.serviceId):[]
                    })
          }else {
              this.setState({
                  ret:{
                      success:false,
                      message:nextProps.update_procedure_ret.message
                  }
              })
          }
          nextProps.update_procedure_loading()
      }



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
            if(!!nextProps.search_procedures_ret){
                if(nextProps.search_procedures_ret.success){
                    if(nextProps.search_procedures_ret.type==="servicestoAdd"){

                    }else{
                        this.setState({
                            selected_procedures:[],
                            procedures:nextProps.search_procedures_ret.data,
                            loading:false,
                            hide_view_more:nextProps.search_procedures_ret.data.length === this.state.procedures.length?true:false
                        })
                    }
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.search_procedures_loading()
            }
            if(!!nextProps.get_user_specialities_ret){
                if(nextProps.get_user_specialities_ret.success){
                    let arr = []
                    let specialities = [...nextProps.get_user_specialities_ret.data]
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
                        },()=>{this.props.search_procedures({limit:50, searchQuery:'', page:1, specialityId:this.state.selected_speciality})  })
                    }  
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.get_user_specialities_loading()
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
        let arr = [...this.state.selected_procedures]
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
    if(!isEmpty(obj)){
        newArr.push(obj)
        this.setState({
            selected_procedures:[...newArr]
         })
    }
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
              this.props.search_procedures(data)
        }
    }

    viewMore = (obj) =>{
        this.setState({
            ...obj,
            limit:this.state.limit + 50,
            loading:true
        },()=>this.props.search_procedures(
          {
            limit:this.state.limit,
            page:1,
            searchQuery:'',
            specialityId:this.state.selected_speciality
          } 
        ))
    }



     isSelected = (data) =>{
        // console.log(data,"data in isSelected")
        let flag = false
        let arr = [...this.state.selected_procedures]
        arr.every(function(element, index) {
            // console.log(element,"element in isSelected")
          if(element.serviceId===data.serviceId){
            flag = true
            return false
          }
           return true
        })
        return flag;
      }
      
       getValue = (data) =>{
        let value= ""
        let arr = [...this.state.selected_procedures]
        arr.every(function(element, index) {
          if(element.serviceId===data.serviceId){
            value = !!element.price?element.price[0]:0
            return false
          }
           return true
        })
        return value;
      }
      
       getVariance = (data) =>{
        let value= ""
        let arr = [...this.state.selected_procedures]
        arr.every(function(element, index) {
          if(element.serviceId===data.serviceId){
            value = element.variance
            return false
          }
           return true
        })
        return value;
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
            selected_procedures:selected_procedures,
            procedure_for_detail:selected_procedures.length ===0?false:selected_procedures[selected_procedures.length-1]
        },()=>this.setState({
            edit_Proc_flag:false
        }))
    }

    handleSpecialitySelect = (e) =>{
        if(!!this.state.addProcedureFlag){
            this.setState({
                selected_speciality:e.target.value,
                loading:true
            },()=>{
                this.props.toAddServices({
                    searchQuery:'',
                    page:'1',
                    limit:'50',
                    specialityId:this.state.selected_speciality
                 })
            })
        }else{
            this.setState({
                selected_speciality:e.target.value,
                loading:true
            },()=>{
                this.props.search_procedures({
                    searchQuery:'',
                    page:'1',
                    limit:'50',
                    specialityId:this.state.selected_speciality
                })
            })
        }
    }
 handleAddProcedureClick = (e) =>{
    e.preventDefault()
    this.setState({
        loading:true,
        addProcedureFlag:true,
        editFlag:true,
        selected_procedures:[],
        procedure_for_update:[],
    },()=>{
        this.props.toAddServices({
            searchQuery:'',
            page:'1',
            limit:'50',
            specialityId:this.state.selected_speciality
 })  
    })          
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

    handle_your_catalogue_click = () => {
        console.log(this.state,"in handle_Your_catalogue_click")
        this.setState({
           editFlag:true,
           selected_procedures:[],
           procedure_for_update:[],
           addProcedureFlag:false
       },()=>this.props.search_procedures({limit:50, searchQuery:'', page:1, specialityId:this.state.selected_speciality}))
    }

    render() {
        console.log(this.state,"this.state in  Mycatalogue")
        console.log(this.props.search_procedures_loading_flag,"this.props. in Mycatalogue ")
                return (
                    <React.Fragment>
                        <NotifFunc />
                        <NewNotif 
                            ret = {this.state.ret}
                            retClr= {()=>this.setState({ret:false})}
                        />
                <div className='catalogue_main_content_rish'>
                   <div className='catalogue_wrapper_rish'>
                        <div className='catalogue_section_1'>
                           <div className="catalogue_section_1_upper new_card_class">

                           <span  className="catalogue_section_1_icon_wrapper " onClick={(e)=>this.handle_your_catalogue_click()} ><img className="catalogue-img cursor-pointer" src={this.state.addProcedureFlag?'/icon/add_catalogue_icon.svg':'/icon/add_catalogue_active_icon.svg'} alt=""></img>
                                  <text style={{marginTop:'.5rem'}} className='catalogue_test_name display_block_rish '>Your Catalogue</text>
                            </span>


                            <span className="catalogue_section_1_icon_wrapper"  onClick={(e)=>this.handleAddProcedureClick(e)} >
                                 <img className="catalogue-img cursor-pointer" src={this.state.addProcedureFlag?'/icon/add_speciality_active_icon.svg':'/icon/add_speciality_icon.svg'} alt="" />
                                 <text style={{marginTop:'.5rem'}} className='catalogue_test_name display_block_rish '>Add To Catalogue</text>
                              </span>
                             

                              <span className="catalogue_section_1_icon_wrapper">
                                  <img onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({uploadCatalogFlag:true})
                                    }}
                                      className="catalogue-img cursor-pointer" src="/upload.svg" alt=""/>
                                  <text style={{marginTop:'.5rem'}} className='catalogue_test_name display_block_rish '>Upload File</text>
                              </span>
                              <span className="catalogue_section_1_icon_wrapper">
                                <DownloadCatalogue
                                    downloadCatalogueClr = {this.props.downloadCatalogueClr}
                                    downloadCatalogueRet = {this.props.downloadCatalogueRet}
                                    downloadCatalogue ={this.props.downloadCatalogue}
                                />
                              </span>
                           </div>
                           <div className="catalogue_section_1_bottom new_card_class">
                                <div className="section_1_header">
                                    <span className='section_1_header_child'>
                                         <Select
                                            options = {this.state.specialities}
                                            handleChange = {this.handleSpecialitySelect}
                                            placeholder= "Speciality"
                                            input_text_class = "catalogue_dropdown"
                                            wrapper_class = "catalogue_dropdown_wrapper"
                                            value = {this.state.selected_speciality}
                                            name = "speciality_chosen"
                                            label = "Speciality" />
                                    </span>
                                    <span className='section_1_header_child'>
                                        <SearchComponent 
                                            searchProcedures = {this.searchProceduresFun}
                                            searchProceduresClr = {this.props.searchProceduresClr}
                                            searchProceduresRet = {this.props.search_procedures_ret}
                                            selected_speciality = {this.state.selected_speciality}  />
                                    </span>
                                </div>



                                {!!this.state.addProcedureFlag &&  <div style={{position:'relative'}} className="text-center">
                          {this.state.add_specs_loading && <LoaderComponent />}
                            <div style={{marginTop:'.5rem'}} className="add_specs_wrapper">
                            {   
                                this.state.add_remaining_specs? 
                                <React.Fragment>
                                <Select
                                options = {this.props.catalogue_data.remaining_specs}
                                handleChange = {this.handle_change_selected_remain_specs}
                                placeholder= "Speciality"
                                placeholder= "Speciality"
                                input_text_class = "catalogue_dropdown"
                                wrapper_class = "catalogue_dropdown_wrapper"
                                value = {this.state.selected_remain_specs[0]}
                                name = "remain_specs"
                                label = "Speciality"
                              />
                              <div  style={{marginTop:'.5rem'}}>
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
                                 <button  style={{marginTop:'.5rem', width : '13rem !important', height:'3rem !important'}} onClick = {()=>this.add_selected_remain_specs()} className='button_rish color_white_rish  add_speciality_button'>Submit</button>
                                </div>  
                              </div>
                              </React.Fragment>
                              : 
                              <button onClick = {()=>this.setState({add_remaining_specs: true})} className='button_rish color_white_rish margin_top_small_rish margin_bottom_small_rish add_speciality_button'>Add Speciality</button>
                            }
                         </div>
                        </div>
}

                                <div className='catalogue_head_tabs margin_top_small_rish'>
                                    <span className=' display_block_rish catalogue_circle_wrap'> <span className='catalogue_circle'></span> </span>
                                    <span className='head_tabs_name display_block_rish'> <text className='catalogue_test_name '>Test Name</text></span>
                                    <span className='head_tabs_price display_block_rish text-center'> <text className='catalogue_test_name '>Price</text></span>
                                    <span className='head_tabs_variance display_block_rish text-center'><text className='catalogue_test_name '>Variance</text></span>
                                    <span className='head_tabs_actions display_block_rish text-center'><text className='catalogue_test_name '>Actions</text></span>
                                </div>
                                      { !this.state.addProcedureFlag &&
                                      <div style={{position:'relative'}}>
                                      {this.props.search_procedures_loading_flag && <LoaderComponent />}
                                        {(this.state.procedures.length > 0 ? this.state.procedures.map( (c, i) => (
                                        <Procedure 
                                        id = {i}
                                        data = {c}
                                        editFlag = {this.state.editFlag}
                                        handleEditInclusion = {this.handleEditInclusion}
                                        disabled={!this.state.editFlag}
                                        onEdit = {this.onEdit}
                                        // selectedProcedure = {this.state.selectedProcedure}
                                        // selected_procedures = {this.state.selected_procedures}
                                        handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                                        handleVarianceChange = {this.handleVarianceChange}
                                        ret = {this.props.editProcedureRet}
                                        clr = {this.props.editProcedureClr}
                                        loadingOff = {()=>console.log()}
                                        isSelected = {this.isSelected(c)}
                                        getVariance ={this.getVariance(c)}
                                        getValue = {this.getValue(c)}
                                        refresh = {this.state.refresh}
                                        procedure_for_update = {this.state.procedure_for_update}
                                        update_procedure = {this.update_procedure}
                                        update_procedure_loading = {this.get_update_procedure_loading(c)}
                                        />
                                        )) : 
                                       <div className='text-center'>No Procedures</div>)}
                                       </div>
                                    }
                                    {((this.state.selected_procedures.length !==0) && (!this.state.addProcedureFlag)) &&  <div className='text-center'>
                                      <button onClick = {()=>this.update_procedure()} className='button_rish color_white_rish margin_top_small_rish margin_bottom_small_rish add_speciality_button'>Submit</button>
                                      </div>
                                      }



                            {/* Add to Your Catalogue */}                        
                            {!!this.state.addProcedureFlag  &&    <div style={{position:'relative'}}>
                                      {this.props.search_procedures_loading_flag && <LoaderComponent />} 
                            {(this.state.procedures_toAdd.length > 0 ? this.state.procedures_toAdd.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            onEdit = {this.onEdit}
                            disabled={(!!((this.state.editFlag) && (this.state.selected_procedures.length !== 0)))}
                            // selectedProcedure = {this.state.selectedProcedure}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            ret = {this.props.addServicesRet}
                            clr = {this.props.addServicesClr}
                            loadingOff = {()=>this.console.log()}
                            // selected_procedures = {this.state.selected_procedures}
                            disabled={false}
                            isSelected = {this.isSelected(c)}
                            getVariance ={this.getVariance(c)}
                            getValue = {this.getValue(c)}
                            refresh = {this.state.refresh}
                            procedure_for_update = {this.state.procedure_for_update}
                            update_procedure = {this.add_procedure}
                            update_procedure_loading = {this.add_procedure_loading(c)}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>)}
                           </div>
                        }
                        


                                {((this.state.selected_procedures.length !==0) && (!!this.state.addProcedureFlag)) &&  <div className='text-center'>
                                      <button onClick = {()=>this.add_procedure()} className='button_rish color_white_rish margin_top_small_rish margin_bottom_small_rish add_speciality_button'>Submit</button>
                                      </div>
                                      }
                           </div>
                        </div>
                        <ProcedureView
                         procedure_for_detail = {this.state.procedure_for_detail}
                        />
                   </div>
                </div>









                    {/* <div  style={{ padding:'0rem 1rem 1rem 1rem'}}  className='main_content_rish'>
                        <div className='row justify-content-center'>
                            <div className='text-center' >
                            <h4 style={{position:'relative', marginTop:'1rem'}} className="section_heading_rish">Catalogue</h4>
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
                              consultationFee   <button onClick = {()=>this.add_selected_remain_specs()} className='button_rish color_white_rish margin_top_small_rish margin_bottom_small_rish add_speciality_button'>Add</button>
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
                        {this.state.addProcedureFlag  && <div className='text-center'>
                            {(((this.state.editFlag) && (this.state.selected_procedures.length !== 0)) )  && <button style={{marginBottom:'1rem',marginTop:'1rem'}} onClick={this.handleSubmit} className="common-button">Submit</button> }    
                        </div>}
                        </div>
                    </div>*/}
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
    update_procedure_ret:state.catalogue_store.update_procedure_ret,
    update_procedure_loading_flag:state.catalogue_store.update_procedure_loading,
    get_user_specialities_ret:state.catalogue_store.get_user_specs_ret,
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
    add_specs_ret:state.user.add_specs_ret,
    add_procedure_ret:state.catalogue_store.add_procedure_ret,
    add_procedure_loading_flag:state.catalogue_store.add_procedure_loading,
    search_procedures_loading_flag:state.catalogue_store.search_procedures_loading,
    search_procedures_ret:state.catalogue_store.search_procedures_ret
})

export default connect(mapStateToProps, { getUserCatalogue, 
    uploadProcedures, uploadProceduresClr, upload,
    searchProcedures, searchProceduresClr, get_user_specialities,
    get_user_specialities_loading,
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
add_specs,
update_procedure,
update_procedure_loading,
add_procedure,
add_procedure_loading,
search_procedures,
search_procedures_loading
})(MyCatalogueComponent);


