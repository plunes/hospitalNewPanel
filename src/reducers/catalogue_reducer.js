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
         GET_USER_SERVICES_ERROR,

         GET_PROCEDURES,
         CLR_PROCEDURES,
         RET_PROCEDURES,
         GET_PROCEDURES_ERROR,
         UPDATE_PARAMS,
         UPDATE_MODIFIED_PROCEDURES
        
        } from '../actions/types';
import { get_url_params, paginate_data } from "../utils/common_utilities"
import { get_procedures } from '../actions/catalogue_actions';

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
          next:false,
          search:''
        }
    },

    get_procedures:false,
    ret_procedures:false,
    get_procedures_loading:false,
    get_procedures_error:false
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


        case GET_PROCEDURES:
            return {
                ...state,
                get_procedures:action.payload,
                get_procedures_loading:true
            }

        case RET_PROCEDURES:
            console.log("Inside ret Procedures", action.payload)
            return {
                ...state,
                ret_procedures:action.payload,
                get_procedures_loading:true
            }

        case CLR_PROCEDURES:
            return {
                ...state,
                ret_procedures:false,
                get_procedures_loading:false,
                get_procedures_error:false
            }

        case GET_PROCEDURES_ERROR:
            return {
                ...state,
                get_procedures_error:true
            }


        case UPDATE_PARAMS:
        return {
            ...state,
            procedures_data:{
                ...state.procedures_data,
                query_param:action.payload
            }
        }


        case SEARCH_PROCEDURE:

            return {
                ...state,
                search_procedures:action.payload,
                search_procedures_loading:true,
                get_procedures_loading:true
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


       case UPDATE_MODIFIED_PROCEDURES:
           console.log(action, "action in update Modified procediures")
           return {
               ...state,
               procedures_data:{
                total_procedures:[...state.procedures_data.total_procedures],
                modified_procedures:[...action.payload.modified_procedures],
                query_param:{...action.payload.query_param}
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