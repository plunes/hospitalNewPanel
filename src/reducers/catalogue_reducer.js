import { GET_USER_SPECIALITIES, GET_USER_SPECIALITIES_RET, GET_USER_SPECIALITIES_LOADING } from '../actions/types';
import { get_url_params } from "../utils/common_utilities"

const cat_init_state  = {
    get_user_specs:false,
    get_user_specs_ret:false,
    get_user_specs_loading:false
}

export default function (state = cat_init_state, action) {
    switch (action.type) {
        case GET_USER_SPECIALITIES:
            return {
                ...state,
                get_user_specs:action.payload,
                get_user_specs_loading:true
            }
        case GET_USER_SPECIALITIES_RET:
            return {
                ...state,
                get_user_specs_ret:action.payload,
                get_user_specs_loading:true
            }
        case GET_USER_SPECIALITIES_LOADING:
            return {
                ...state,
                get_user_specs_ret:false,
                get_user_specs_loading:true
            }

            default:
                return state;
    }
}