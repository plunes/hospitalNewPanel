import { CHANGE_ADDRESS_LOADING,
    CHANGE_ADDRESS,
    CHANGE_ADDRESS_RET
    
} from '../actions/types';
import { get_url_params } from "../utils/common_utilities"

const profile_init_state  = {
    change_address:false,
    change_address_ret:false,
    change_address_loading:false
}

export default function (state = profile_init_state, action) {
switch (action.type) {

    case CHANGE_ADDRESS:
        return {
            ...state,
            change_address:action.payload,
            change_address_loading:true
        }
    case CHANGE_ADDRESS_RET:
        return {
            ...state,
            change_address_ret:action.payload,
         //    get_act_insight_loading:false
        }
    case CHANGE_ADDRESS_LOADING:
        return {
            ...state,
            change_address_ret:false,
            change_address_loading:false
        }
 
       default:
           return state;
}
}