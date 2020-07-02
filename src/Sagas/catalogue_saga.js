import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_USER_SPECIALITIES, GET_USER_SPECIALITIES_RET } from '../actions/types'
import { get_user_specialities_ret, get_user_specialities_loading } from '../actions/userActions'
import api from '../utils/api_routes'
import { get_url_params } from "../utils/common_utilities"
import store from '../store'
let center_id = get_url_params('center')
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* get_user_specs_saga(action) {
    console.log("Inside get procedures saga")

   try {
      const  get_user_specs = yield store.getState().catalogue_store.get_user_specs
      const data = get_user_specs
      const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
      console.log("Just before api call")
      const api_data = yield call(api.catalogue_routes.get_user_specialities, data, headers)
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
    //   const user = yield call(Api.fetchUser, action.payload.userId);
    //   yield put({type: "USER_FETCH_SUCCEEDED", user: user});
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

function* mySaga() {
  yield takeLatest(GET_USER_SPECIALITIES, get_user_specs_saga);
}

export default mySaga