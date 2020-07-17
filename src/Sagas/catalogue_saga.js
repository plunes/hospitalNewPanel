import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_USER_SPECIALITIES, UPDATE_PROCEDURE , ADD_PROCEDURE, SEARCH_PROCEDURE, GET_PROCEDURES} from '../actions/types'
import { get_user_specialities_ret, get_user_specialities_loading, update_procedure_ret, update_procedure_loading, add_procedure_ret, add_procedure_loading, search_procedures_ret, search_procedures_loading } from '../actions/userActions'
import api from '../utils/api_routes'
import  {  ret_procedures, update_params, get_procedures_error, update_modified_procedures }  from '../actions/catalogue_actions'
import { get_url_params, paginate_data } from "../utils/common_utilities"
import store from '../store'

function* get_procedures_saga(action) {
  console.log("Inside get procedures saga>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

 try {
  let center_id = get_url_params('center')
    const  get_procedures = yield store.getState().catalogue_store.get_procedures
    const params = get_procedures
    const store_param = yield store.getState().catalogue_store.procedures_data.query_param
    const modified_procedures = yield store.getState().catalogue_store.procedures_data.modified_procedures
    console.log(params, store_param, modified_procedures , "------------------------------------------------>>>><<<<<<<<<><<<<<<<<<<")
    if(params.search !== store_param.search){
      // SEARCH CASE
    console.log("<<<<<<<<<<<<<<<<<<<<<< Search case Active >>>>>>>>>>>>>>>>>>>>>>>>>")
      const total_procedures = yield store.getState().catalogue_store.procedures_data.total_procedures
      let arr = []
      if(params.search !== ''){
         arr = total_procedures.filter(item=>{
          if(item.service.startsWith(params.search)){
            return true
          }
          return false
       })
      }else {
        arr = [...total_procedures]
      }

      console.log(arr,"arr in search")

   
   let obj = {
      modified_procedures:paginate_data([...arr],{...params}).data,
      query_param:{
        ...paginate_data([...arr],{...params}).parameters,
        search:params.search
      }
   }
        yield put(update_modified_procedures({...obj}))
        yield put(ret_procedures({
          params:{
            ...obj.query_param,
            search:params.search
          },
          data:!!obj.modified_procedures[1]?obj.modified_procedures[1]:[]
        }))

    }else if(params.limit !== store_param.limit){
        // Limit Change case
        console.log(params, store_param, "Limit Case")
    }else {
      yield put (ret_procedures({
           params: {...store_param, page:params.page},
           data:modified_procedures[params.page]
      }))
      yield put ( update_params({
        ...store_param,
        page:params.page
      }))
    }
 } catch (e) {
   console.log(e,"e in get_procedures_saga =>>>>>>>>>>>>>>>>>>>>>>>>")
  try{
      yield put(get_procedures_error())
    }catch(x){
      // yield put(get_user_specialities_ret({
      //     success:false,
      //     message:'Something went wrong try again later..',
      //     data:[]
      //    }))
      }
 }
}




function* get_user_specs_saga(action) {
    console.log("Inside get procedures saga")

   try {
    let center_id = get_url_params('center')
      const  get_user_specs = yield store.getState().catalogue_store.get_user_specs
      const data = get_user_specs
      const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
      console.log("Just before api call")
      const api_data = yield call(api.catalogue_routes.get_user_specialities, data, center_id, headers)
      console.log(api_data.data,"api_data in get_user_specs_saga")
      if(!!api_data){
        if (api_data.status === 200) {
            yield put(get_user_specialities_ret({
                success:true,
                message:' successfully updated',
                data:api_data.data.data
               }))
          }else{
            yield put(get_user_specialities_ret({
                success:false,
                message:'Something went wrong try again later..',
                data:[]
               }))
          }
      }
   } catch (e) {
    try{
        yield put(get_user_specialities_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }catch(x){
        yield put(get_user_specialities_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
        }
   }
}



function* update_procedure_saga(action) {
  console.log("Inside get procedures saga")

 try {
  let center_id = get_url_params('center')
    const  update_procedure = yield store.getState().catalogue_store.update_procedure
    const data = update_procedure
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    console.log(data,"Just before api call")
    const api_data = yield call(api.catalogue_routes.update_procedures, data, center_id, headers)
    console.log(api_data.data,"api_data in get_user_specs_saga")
    if(!!api_data){
      if (api_data.status === 200) {
          yield put(update_procedure_ret({
              success:true,
              message:'Procedure has been successfully updated in catalogue',
              data:api_data.data
             }))
        }else{
          yield put(update_procedure_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
  try{
      yield put(update_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(update_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}


function* add_procedure_saga(action) {
  console.log("Inside get procedures saga")

 try {
  let center_id = get_url_params('center')
    const  add_procedure = yield store.getState().catalogue_store.add_procedure
    const data = add_procedure
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    console.log(data,"Just before api call")
    const api_data = yield call(api.catalogue_routes.add_procedure, data, center_id, headers)
    console.log(api_data.data,"api_data in add_procedure_saga")
    if(!!api_data){
      if (api_data.status === 200) {
          if(!!api_data.data){
            yield put(add_procedure_ret({
              success:true,
              message:'Procedure has been successfully updated in catalogue',
              data:api_data.data
             }))
          }else {
            yield put(add_procedure_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
          }
         
        }else{
          yield put(add_procedure_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
  try{
      yield put(add_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(add_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}


 function* search_procedures_saga(action) {
  console.log("Inside search_procedures_ret saga")

 try {
  let center_id = get_url_params('center')
    const  search_procedures = yield store.getState().catalogue_store.search_procedures
    const data = search_procedures
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    let dataObject = {
      page:data.page,
      searchQuery:data.searchQuery,
      limit:data.limit,
      specialityId:data.specialityId
    }
    console.log(data,"Just before api call")
    const api_data = yield call(api.catalogue_routes.search_procedures, dataObject, center_id, headers)
    console.log(api_data,"api_data in add_procedure_saga")
    if(!!api_data){
      if (api_data.status === 201) {
          if(!!api_data.data){
            yield put(search_procedures_ret({
              success:true,
              message:'Procedure has been successfully fetched',
              data:api_data.data.data
             }))
          }else {
            yield put(search_procedures_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
          }
         
        }else{
          yield put(search_procedures_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
   console.log(e,'e in search_procedure saga')
  try{
      yield put(search_procedures_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(search_procedures_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}


const catalogue_saga  = [
   takeLatest(GET_USER_SPECIALITIES, get_user_specs_saga),
   takeLatest(UPDATE_PROCEDURE, update_procedure_saga),
   takeLatest(ADD_PROCEDURE, add_procedure_saga),
   takeLatest(SEARCH_PROCEDURE, search_procedures_saga),
   takeLatest(GET_PROCEDURES, get_procedures_saga)
]

export default catalogue_saga