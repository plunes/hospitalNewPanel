import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {  GET_ACT_INSIGHT, GET_REAL_INSIGHT, DELETE_PROFILE} from '../actions/types'
import { get_act_insight_ret, get_real_insight_ret, get_act_insight_loading, get_real_insight_loading, delete_profile_ret, delete_profile_loading } from '../actions/dash_actions'
import api from '../utils/api_routes'
import { get_url_params } from "../utils/common_utilities"
import store from '../store'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions


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
   takeLatest(DELETE_PROFILE, delete_profile_saga)
]

export default dash_saga