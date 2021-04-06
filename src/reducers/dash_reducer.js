import { fas } from '@fortawesome/free-solid-svg-icons';
import { GET_ACT_INSIGHT, GET_ACT_INSIGHT_RET, GET_ACT_INSIGHT_LOADING, 
    GET_REAL_INSIGHT, GET_REAL_INSIGHT_RET, GET_REAL_INSIGHT_LOADING, DELETE_PROFILE,
    DELETE_PROFILE_LOADING, DELETE_PROFILE_RET, DO_NOT_NOTIFY_LOADING, DO_NOT_NOTIFY_RET, DO_NOT_NOTIFY,
    GET_INSIGHT_INFO_RET, GET_INSIGHT_INFO_LOADING, GET_INSIGHT_INFO, UPDATE_INSIGHT, UPDATE_INSIGHT_RET, 
    UPDATE_INSIGHT_LOADING 
} from '../actions/types';
import { get_url_params } from "../utils/common_utilities"

const cat_init_state  = {

    get_act_insight:false,
    get_act_insight_ret:false,
    get_act_insight_loading:true,

    get_real_insight:false,
    get_real_insight_ret:false,
    get_real_insight_loading:true,

    delete_profile:false,
    delete_profile_ret:false,
    delete_profile_loading:false,

    do_not_notify:false,
    do_not_notify_ret:false,
    do_not_notify_loading:false,

    get_insight_info:false,
    get_insight_info_ret:false,
    get_insight_info_loading:false,

    update_insight:false,
    update_insight_ret:false,
    update_insight_loading:false

}

export default function (state = cat_init_state, action) {
switch (action.type) {

    case UPDATE_INSIGHT:
        return {
            ...state,
            update_insight:action.payload,
            update_insight_loading:true
        }
    case UPDATE_INSIGHT_RET:
        return {
            ...state,
            update_insight_ret:action.payload,
            update_insight_loading:true
        }

    case UPDATE_INSIGHT_LOADING:
        return {
            ...state,
            update_insight_ret:false,
            update_insight_loading:false
        }



    case GET_INSIGHT_INFO:
        return {
            ...state,
            get_insight_info:action.payload,
            get_insight_info_loading:true
        }
    case GET_INSIGHT_INFO_RET:
        return {
            ...state,
            get_insight_info_ret:action.payload,
            get_insight_info_loading:true
        }

    case GET_INSIGHT_INFO_LOADING:
        return {
            ...state,
            get_insight_info_ret:false,
            get_insight_info_loading:false
        }

    case DO_NOT_NOTIFY:
        return {
            
            ...state,
            do_not_notify:action.payload,
            do_not_notify_loading:true
        }
    case DO_NOT_NOTIFY_RET:

        return {
            ...state,
            do_not_notify_ret:action.payload,
            do_not_notify_loading:true
        }

    case DO_NOT_NOTIFY_LOADING:

        return {
            ...state,
            do_not_notify_ret:false,
            do_not_notify_loading:false
        }


    case DELETE_PROFILE:
        return {
            ...state,
            delete_profile:action.payload,
            delete_profile_loading:true
        }
    case DELETE_PROFILE_RET:
        return {
            ...state,
            delete_profile_ret:action.payload,
         //    get_act_insight_loading:false
        }
    case DELETE_PROFILE_LOADING:
        return {
            ...state,
            delete_profile_ret:false,
            delete_profile_loading:false
        }
 

   case GET_ACT_INSIGHT:
       return {
           ...state,
           get_act_insight:action.payload,
           get_act_insight_loading:true
       }
   case GET_ACT_INSIGHT_RET:
       return {
           ...state,
           get_act_insight_ret:action.payload,
        //    get_act_insight_loading:false
       }
   case GET_ACT_INSIGHT_LOADING:
       return {
           ...state,
           get_act_insight_ret:false,
           get_act_insight_loading:false
       }


   case GET_REAL_INSIGHT:
        return {
            ...state,
            get_real_insight:action.payload,
            get_real_insight_loading:true
        }
    case GET_REAL_INSIGHT_RET:
        return {
            ...state,
            get_real_insight_ret:action.payload,
            // get_real_insight_loading:false
        }
    case GET_REAL_INSIGHT_LOADING:
        return {
            ...state,
            get_real_insight_ret:false,
            get_real_insight_loading:false
        }
 
       default:
           return state;
}
}