import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {  CHANGE_ADDRESS } from '../actions/types'
import { change_address_ret, change_address_loading } from '../actions/profile_actions'
import api from '../utils/api_routes'
import { get_url_params } from "../utils/common_utilities"
import store from '../store'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions


function* change_address_saga() {
  console.log("Inside get_real_insight_saga")

    try {
        let center_id = get_url_params('center')
        const  data  = yield store.getState().profile_store.change_address
        const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
        console.log("Just before api call")
        const api_data = yield call(api.profile_routes.change_address, data, center_id, headers)
        console.log(api_data,"api_data in get_user_specs_saga")
        if(!!api_data){
          if (api_data.status === 201) {
              yield put(change_address_ret({
                  success:true,
                  message:'Profile updated successfully',
                  data:api_data.data.data
                }))
            }else{
              yield put(change_address_ret({
                  success:false,
                  message:'Something went wrong try again later..',
                  data:[]
                }))
            }
        }
    } catch (e) {
      console.log(e,"e in get_act insigt saga")
      try{
          yield put(change_address_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
        }catch(x){
          yield put(change_address_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
            }))
          }
    }
}


export const dash_saga = [
   takeLatest(CHANGE_ADDRESS, change_address_saga)
]

export default dash_saga