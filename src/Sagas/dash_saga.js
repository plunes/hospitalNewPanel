import { call, put, takeLatest } from 'redux-saga/effects'
import {  GET_ACT_INSIGHT, GET_REAL_INSIGHT, DELETE_PROFILE, DO_NOT_NOTIFY, GET_INSIGHT_INFO, UPDATE_INSIGHT, UPDATE_INSIGHT_RET } from '../actions/types'
import { get_act_insight_ret, get_real_insight_ret, delete_profile_ret, do_not_notify_ret, update_insight_loading,
   get_insight_info_ret, update_insight_ret } from '../actions/dash_actions'
import api from '../utils/api_routes'
import { get_url_params } from "../utils/common_utilities"
import store from '../store'


function* get_insight_info_saga() {
  console.log("Inside get_real_insight_saga")

    try {
        let center_id = get_url_params('center')
        const  data = yield store.getState().dash_store.get_insight_info
        
        const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
        console.log("Just before api call")
        const api_data = yield call(api.dash_routes.get_insight_info, data, headers)
        console.log(api_data,"api_data in get_user_specs_saga")
        // const api_data = {
        //   status: 200
        // }
        if(!!api_data){
          if (api_data.status === 200) {
              yield put(get_insight_info_ret({
                  success:true,
                  message:'Insight Information fetched',
                  data:api_data.data.data
                }))
            }else{
              yield put(get_insight_info_ret({
                  success:false,
                  message:'Something went wrong try again later..',
                  data:[]
                }))
            }
        }
    } catch (e) {
      console.log(e,"e in get_act insigt saga")
      try{
          yield put(get_insight_info_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
        }catch(x){
          yield put(get_insight_info_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
          }
    }
}


function* update_insight_saga() {
  console.log("Inside get_real_insight_saga")

    try {
        let center_id = get_url_params('center')
        const  data = yield store.getState().dash_store.update_insight
        
        const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
        console.log("Just before api call")
        const api_data = yield call(api.dash_routes.update_insight, data, headers)
        console.log(api_data,"api_data in get_user_specs_saga")
        // const api_data = {
        //   status: 200
        // }
        if(!!api_data){
          if (api_data.status === 200) {
              yield put(update_insight_ret({
                  success:true,
                  message:'Insight Information Updated',
                  // data:api_data.data.data
                }))
            }else{
              yield put(update_insight_ret({
                  success:false,
                  message:api_data.data.error,
                  data:[]
                }))
            }
        }
    } catch (e) {
      console.log(e,"e in get_act insigt saga")
      try{
          yield put(update_insight_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
        }catch(x){
          yield put(update_insight_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
          }
    }
}

function* do_not_notify_saga() {
  console.log("Inside get_real_insight_saga")

    try {
        let center_id = get_url_params('center')
        const  data = yield store.getState().dash_store.do_not_notify
        
        const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
        console.log("Just before api call")
        const api_data = yield call(api.dash_routes.do_not_notify, data, headers)
        console.log(api_data,"api_data in get_user_specs_saga")
        // const api_data = {
        //   status: 200
        // }
        if(!!api_data){
          if (api_data.status === 200) {
              yield put(do_not_notify_ret({
                  success:true,
                  message:'You will not receive insights relate to this service now',
                  data:{}
                }))
            }else{
              yield put(do_not_notify_ret({
                  success:false,
                  message:'Something went wrong try again later..',
                  data:[]
                }))
            }
        }
    } catch (e) {
      console.log(e,"e in get_act insigt saga")
      try{
          yield put(do_not_notify_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
        }catch(x){
          yield put(do_not_notify_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
          }
    }
}

function* delete_profile_saga() {
  console.log("Inside get_real_insight_saga")

    try {
        let center_id = get_url_params('center')
        const  get_real_insight = yield store.getState().dash_store.delete_profile
        const data = get_real_insight
        const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
        console.log("Just before api call")
        const api_data = yield call(api.dash_routes.delete_profile, data, center_id, headers)
        console.log(api_data,"api_data in get_user_specs_saga")
        if(!!api_data){
          if (api_data.status === 200) {
              yield put(delete_profile_ret({
                  success:true,
                  message:'Profile deleted successfully',
                  data:{}
                }))
            }else{
              yield put(delete_profile_ret({
                  success:false,
                  message:'Something went wrong try again later..',
                  data:[]
                }))
            }
        }
    } catch (e) {
      console.log(e,"e in get_act insigt saga")
      try{
          yield put(delete_profile_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
        }catch(x){
          yield put(delete_profile_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
          }
    }
}


function* get_real_insight_saga() {
    console.log("Inside get_real_insight_saga")

   try {
      let center_id = get_url_params('center')
      const  get_real_insight = yield store.getState().dash_store.get_real_insight
      const data = get_real_insight
      const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
      console.log("Just before api call")
      const api_data = yield call(api.dash_routes.get_real_insight, data, center_id, headers)
      console.log(api_data,"api_data in get_user_specs_saga")
      if(!!api_data){
        if (api_data.status === 200) {
            yield put(get_real_insight_ret({
                success:true,
                message:'Successfully fetched real time insights',
                data:api_data.data.data
               }))
          }else{
            yield put(get_real_insight_ret({
                success:false,
                message:'Something went wrong try again later..',
                data:[]
               }))
          }
      }
   } catch (e) {
    console.log(e,"e in get_act insigt saga")
    try{
        yield put(get_real_insight_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }catch(x){
        yield put(get_real_insight_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
        }
   }
}



function* get_act_insight_saga() {
  console.log("Inside get_act_insight_saga")
 try {
    let center_id = get_url_params('center')
    const  get_act_insight = yield store.getState().dash_store.get_act_insight
    console.log(get_act_insight,"get_act_inisgight")
    const data = get_act_insight
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    console.log(data,"Just before api call")
    const api_data = yield call(api.dash_routes.get_act_insight, data, center_id, headers)
    console.log(api_data,"api_data in get_user_specs_saga")
    if(!!api_data){
      if (api_data.status === 200) {
        console.log("this.getting called", api_data)
          yield put(get_act_insight_ret({
              success:true,
              message:'Successfully fetched your actionable Insights',
              data:api_data.data.data
             }))
        }else{
          yield put(get_act_insight_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
   console.log(e,"e in get_act insigt saga")
  try{
      yield put(get_act_insight_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(get_act_insight_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}



export const dash_saga = [
   takeLatest(GET_ACT_INSIGHT, get_act_insight_saga),
   takeLatest(GET_REAL_INSIGHT, get_real_insight_saga),
   takeLatest(DELETE_PROFILE, delete_profile_saga),
   takeLatest(DO_NOT_NOTIFY, do_not_notify_saga),
   takeLatest(GET_INSIGHT_INFO, get_insight_info_saga),
   takeLatest(UPDATE_INSIGHT, update_insight_saga)
]

export default dash_saga