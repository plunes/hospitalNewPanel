import { GET_USER_SPECIALITIES, GET_USER_SPECIALITIES_RET, GET_USER_SPECIALITIES_LOADING,
         UPDATE_PROCEDURE, UPDATE_PROCEDURE_RET, UPDATE_PROCEDURE_LOADING } from '../actions/types';
import { get_url_params } from "../utils/common_utilities"

const cat_init_state  = {
    get_user_specs:false,
    get_user_specs_ret:false,
    get_user_specs_loading:false,

    update_procedure:false,
    update_procedure_ret:false,
    update_procedure_loading:false
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

        case UPDATE_PROCEDURE:
            return {
                ...state,
                update_procedure:action.payload,
                update_procedure_loading:true
            }
        case UPDATE_PROCEDURE_RET:
            return {
                ...state,
                update_procedure_ret:action.payload,
                update_procedure_loading:false
            }
        case UPDATE_PROCEDURE_LOADING:
            return {
                ...state,
                update_procedure_ret:false,
                update_procedure_loading:false
            }
            default:
                return state;
    }
}