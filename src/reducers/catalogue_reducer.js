import { GET_USER_SPECIALITIES, GET_USER_SPECIALITIES_RET, GET_USER_SPECIALITIES_LOADING,
         UPDATE_PROCEDURE, UPDATE_PROCEDURE_RET, UPDATE_PROCEDURE_LOADING,
         ADD_PROCEDURE,
         ADD_PROCEDURE_RET,
         ADD_PROCEDURE_LOADING,

         SEARCH_PROCEDURE,
         SEARCH_PROCEDURE_RET,
         SEARCH_PROCEDURE_LOADING,

         GET_USER_SERVICES,
         GET_USER_SERVICES_RET,
         GET_USER_SERVICES_ERROR
        
        
        } from '../actions/types';
import { get_url_params, paginate_data } from "../utils/common_utilities"

const cat_init_state  = {
    get_user_specs:false,
    get_user_specs_ret:false,
    get_user_specs_loading:false,

    update_procedure:false,
    update_procedure_ret:false,
    update_procedure_loading:false,

    add_procedure:false,
    add_procedure_ret:false,
    add_procedure_loading:false,

    search_procedures:false,
    search_procedures_ret:false,
    search_procedures_loading:false,


    procedures_data:{
        total_procedures:[],
        modified_procedures:[],
        query_param:{
          limit:10,
          total:'',
          page:1,
          total_pages:1,
          next:false
        }
    }
}

export default function (state = cat_init_state, action) {
    switch (action.type) {

        case ADD_PROCEDURE:
            return {
                ...state,
                add_procedure:action.payload,
                add_procedure_loading:true
            }
        case ADD_PROCEDURE_RET:
            return {
                ...state,
                add_procedure_ret:action.payload,
                add_procedure_loading:false
            }
        case ADD_PROCEDURE_LOADING:
            return {
                ...state,
                add_procedure_ret:false,
                add_procedure_loading:false
            }


        case SEARCH_PROCEDURE:

            return {
                ...state,
                search_procedures:action.payload,
                search_procedures_loading:true
            }
        case SEARCH_PROCEDURE_RET:
            console.log(action.payload,"SEARCH PROCEDURE RET ACTION GETTING CALLED")
            return {
                ...state,
                search_procedures_ret:action.payload,
                search_procedures_loading:false,
                procedures_data:{
                    total_procedures:[...action.payload.data],
                    modified_procedures:paginate_data([...action.payload.data],{limit:10,page:1,search:'',total:''}).data,
                    query_param:paginate_data([...action.payload.data],{limit:10,page:1,search:'',total:''}).parameters
                }
            }
        case SEARCH_PROCEDURE_LOADING:
            return {
                ...state,
                search_procedures_ret:false,
                search_procedures_loading:false
            }




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
                get_user_specs_loading:false
            }
        case GET_USER_SPECIALITIES_LOADING:
            return {
                ...state,
                get_user_specs_ret:false,
                get_user_specs_loading:false
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