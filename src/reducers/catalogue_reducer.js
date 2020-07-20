import {
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
         UPDATE_MODIFIED_PROCEDURES,

         UPDATE_ADD_PARAMS,
         GET_ADD_PROCEDURES,
         RET_ADD_PROCEDURES,
         GET_ADD_PROCEDURES_ERROR, 
         CLR_ADD_PROCEDURES, 
         UPDATE_ADD_MODIFIED_PROCEDURES,

         SEARCH_ADD_PROCEDURE,
         SEARCH_ADD_PROCEDURE_RET,
         SEARCH_ADD_PROCEDURE_LOADING,

         TO_ADD_SERVICES,
         TO_ADD_SERVICES_RET,
         TO_ADD_SERVICES_CLR,

         SET_VARIANCE, 
         SET_VARIANCE_RET,
         SET_VARIANCE_LOADING,

         GET_USER_SPECIALITIES, 
         GET_USER_SPECIALITIES_RET, 
         GET_USER_SPECIALITIES_LOADING
        
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

    search_add_procedures:false,
    search_add_procedures_ret:false,
    search_add_procedures_loading:false,
    
    get_user_specialities:false,
    get_user_specialities_ret:false,
    get_user_specialities_loading:false,


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


    procedures_add_data:{
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
    get_procedures_error:false,

    get_add_procedures:false,
    ret_add_procedures:false,
    get_add_procedures_loading:false,
    get_add_procedures_error:false,

    to_add_services:false,
    to_add_services_ret:false,
    to_add_services_clr:false,

    set_variance:false,
    set_variance_ret:false,
    set_variance_loading:false
}

export default function (state = cat_init_state, action) {
    switch (action.type) {

    case TO_ADD_SERVICES:
    return {
        ...state,
        to_add_services:action.payload,
        to_add_services_loading:true
    };

    case TO_ADD_SERVICES_RET:
        return {
            ...state,
            to_add_services_ret:action.payload,
            // search_procedures_loading:false,
            // procedures_add_data:{
            //     total_procedures:[...action.payload.data],
            //     modified_procedures:paginate_data([...action.payload.data],{limit:10,page:1,search:'',total:''}).data,
            //     query_param:paginate_data([...action.payload.data],{limit:10,page:1,search:'',total:''}).parameters
            // }
        }
      
    case TO_ADD_SERVICES_CLR:
    return {
        ...state,
        to_add_services_ret:false,
        to_add_services_loading:false
    };

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


    case GET_ADD_PROCEDURES:
        return {
            ...state,
            get_add_procedures:action.payload,
            get_add_procedures_loading:true
        }

    case RET_ADD_PROCEDURES:
        console.log("Inside ret Procedures", action.payload)
        return {
            ...state,
            ret_add_procedures:action.payload,
            get_add_procedures_loading:true
        }
    
    case CLR_ADD_PROCEDURES:
        return {
            ...state,
            ret_add_procedures:false,
            get_add_procedures_loading:false,
            get_add_procedures_error:false
        }
    
    case GET_ADD_PROCEDURES_ERROR:
        return {
            ...state,
            get_add_procedures_error:true
        }

    case UPDATE_ADD_PARAMS:
        return {
            ...state,
            procedures_add_data:{
                ...state.procedures_data,
                query_param:action.payload
            }
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

    case SEARCH_ADD_PROCEDURE:
        return {
            ...state,
            search_add_procedures:action.payload,
            search_add_procedures_loading:true,
            get_add_procedures_loading:true
        }
    case SEARCH_ADD_PROCEDURE_RET:
        return {
            ...state,
            search_add_procedures_ret:action.payload,
            search_add_procedures_loading:false,
            procedures_add_data:{
                total_procedures:[...action.payload.data],
                modified_procedures:paginate_data([...action.payload.data],{limit:10,page:1,search:'',total:''}).data,
                query_param:paginate_data([...action.payload.data],{limit:10,page:1,search:'',total:''}).parameters
            }
        }

    case SEARCH_ADD_PROCEDURE_LOADING:
        return {
            ...state,
            search_add_procedures_ret:false,
            search_add_procedures_loading:false
        }
    

    case UPDATE_MODIFIED_PROCEDURES:
        return {
            ...state,
            procedures_data:{
            total_procedures:[...action.payload.total_procedures],
            modified_procedures:[...action.payload.modified_procedures],
            query_param:{...action.payload.query_param}
        }
    }

    case UPDATE_ADD_MODIFIED_PROCEDURES:
    return {
        ...state,
        procedures_add_data:{
            total_procedures:[...state.procedures_data.total_procedures],
            modified_procedures:[...action.payload.modified_procedures],
            query_param:{...action.payload.query_param}
        }
    }
       
    case GET_USER_SPECIALITIES:
        return {
            ...state,
            get_user_specialities:action.payload,
            get_user_specialities_loading:true
        }
    case GET_USER_SPECIALITIES_RET:
        return {
            ...state,
            get_user_specialities_ret:action.payload,
            get_user_specialities_loading:false
        }
    case GET_USER_SPECIALITIES_LOADING:
        return {
            ...state,
            get_user_specialities_ret:false,
            get_user_specialities_loading:false
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

    case SET_VARIANCE:
        return {
            ...state,
            set_variance:action.payload,
            set_variance_loading:true
        }
    case SET_VARIANCE_RET:
        return {
            ...state,
            set_variance_ret:action.payload,
            set_variance_loading:false
        }
    case SET_VARIANCE_LOADING:
        console.log("SET_VARIANCE LOADING CALLED REDUCER")
        return {
            ...state,
            set_variance_ret:false,
            set_variance_loading:false
        }
        default:
            return state; 
    }
}