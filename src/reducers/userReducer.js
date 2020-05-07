
import { NEW_USER, GET_BOOKING, GET_INSIGHTS, GET_NOTIFICATIONS, GET_TIMESLOT,
   UNREAD_LENGTH, UNREAD_NOTIFICATION, GET_SOL_INSIGHTS, BUSINESS_EARN, 
   BUSINESS_LOST, SOLUTION_USERS, GET_CATALOGUE, CLEAR_SUBMIT_PROFILE_RET,
   SUBMIT_PROFILE_RET, RESET_PASS_RET, CLR_RESET_PASS, SUBMIT_PROFILE,
   LOGOUT_DEVICES_RET,

   GET_USER_DETAILS,
   LOGOUT_DEVICES,
   LOGOUT_DEVICES_CLR,
   UPLOAD,
   UPLOAD_RET,
   UPLOAD_RET_CLR,
   UPDATE_IMAGE,
   UPDATE_IMAGE_RET,
   UPDATE_IMAGE_CLR,

   //UPLOAD PROCEDURE
   UPLOAD_PROCEDURE,
   UPLOAD_PROCEDURE_RET,
   UPLOAD_PROCEDURE_CLR,

   //DOWNLOAD CATALOGUE
   DOWNLOAD_CATALOGUE,
   DOWNLOAD_CATALOGUE_RET,
   DOWNLOAD_CATALOGUE_CLR,

   SEARCH_PROCEDURE,
   SEARCH_PROCEDURE_CLR,
   SEARCH_PROCEDURE_RET,
   SUBMIT_BANK_DETAILS_RET,
   SUBMIT_BANK_DETAILS_CLR,

   UPDATE_BANNER,
   UPDATE_BANNER_RET,
   UPDATE_BANNER_CLR,

   UPDATE_ACHIEVEMENT_RET,
   UPDATE_ACHIEVEMENT_CLR,
   UPDATE_ACHIEVEMENT,
   EDIT_BIO_RET,
   EDIT_BIO_CLR,

   
  GET_SERV_RET,
  GET_SERV_CLR,

  GET_SPECS_CLR,
  GET_SPECS_RET,
  
  ADD_DOCTOR_RET,
  ADD_DOCTOR_CLR,

  EDIT_PROCEDURE_RET,
  EDIT_PROCEDURE_CLR,

  REGISTER_USER_RET,
  REGISTER_USER_CLR,

  SET_AVAILABILITY_RET,
  SET_AVAILABILITY_CLR,
  
  TO_ADD_SERVICES_CLR,
  TO_ADD_SERVICES_RET,

  ADD_SERVICES_CLR,
  ADD_SERVICES_RET,

  GET_BOOKING_CLR,
  GET_BOOKING_RET,

  NEW_USER_RET,
  NEW_USER_CLR,

  UPDATE_REAL_PRICE_RET,
  UPDATE_REAL_PRICE_CLR,
  
  UPDATE_PRICE_DATA_RET,
  CLEAR_UPDATE_PRICE_DATA,

  GET_ENTITY_CLR,
  GET_ENTITY_RET
  
  } from '../actions/types';
import { uploadProcedure } from '../actions/userActions';

const initialState = {
  userDetail: {},
  insightData: [],
  bookingData: [],
  notificationData: [],
  timeSlot: [],
  unreadCounter: null,
  unreadNotification: [],
  solInsights: [],
  businessEarn: null,
  businessLost: null,
  solutionUsers: [],
  catalogues:[],
  submitProfile:false,
  submitProfileRet:false,
  resetPassRet:false,
  logoutDevicesRet:false,
  logoutDevices:false,
  logoutDevicesLoading:false,
  upload:false,
  uploadRet:false,
  uploadLoading:false,
  updateImage:false,
  updateImageRet:false,
  updateImageLoading:false,
  uploadProcedures:false,
  uploadProceduresRet:false,
  uploadProceduresLoading:false,
  downloadCatalogue:false,
  downloadCatalogueRet:false,
  downloadCatalogueClr:false,
  submitProfileLoading:false,
  getUserLoading:false,
  searchProcedures:false,
  searchProceduresRet:false,
  searchProcedureLoading:false,
  submitBankDetailsRet:false,
  updateBannerRet:false,
  updateAchievementRet:false,
  editBioRet:false,
  getServRet:false,
  getSpecsRet:false,
  addDoctorRet:false,
  editProcedureRet:false,
  editProcedureClr:false,
  registerUserRet:false,
  setAvailabilityRet:false,
  toAddServicesRet:false,
  addServicesRet:false,
  getBookingRet:false,
  newUserRet:false,
  updateRealPriceRet:false,
  updatePriceDataRet:false,
  getEntityRet:false
};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_ENTITY_CLR:
      return {
        ...state,
        getEntityRet:false
      };

      case GET_ENTITY_RET:
      return {
        ...state,
        getEntityRet:action.payload
      };


    case UPDATE_REAL_PRICE_CLR:
      return {
        ...state,
        updateRealPriceRet:false
      };

      case UPDATE_REAL_PRICE_RET:
      return {
        ...state,
        updateRealPriceRet:action.payload
      };

      case UPDATE_PRICE_DATA_RET:
        return {
          ...state,
          updatePriceDataRet:action.payload
        };
  
        case CLEAR_UPDATE_PRICE_DATA:
        return {
          ...state,
          updatePriceDataRet:false
        };
  

    case NEW_USER_RET:
      return {
        ...state,
        newUserRet:action.payload
      };

      case NEW_USER_CLR:
      return {
        ...state,
        newUserRet:false
      };


    case GET_BOOKING_RET:
      return {
        ...state,
        getBookingRet:action.payload
      };

      case GET_BOOKING_CLR:
      return {
        ...state,
        getBookingRet:false
      };


    case ADD_SERVICES_RET:
      return {
        ...state,
        addServicesRet:action.payload
      };

      case ADD_SERVICES_CLR:
      return {
        ...state,
        addServicesRet:false
      };



    case TO_ADD_SERVICES_RET:
      return {
        ...state,
        toAddServicesRet:action.payload
      };

      case TO_ADD_SERVICES_CLR:
      return {
        ...state,
        toAddServicesRet:false
      };

    case SET_AVAILABILITY_RET:
      return {
        ...state,
        setAvailabilityRet:action.payload
      };

      case SET_AVAILABILITY_CLR:
      return {
        ...state,
        setAvailabilityRet:false
      };

    case REGISTER_USER_RET:
      return {
        ...state,
        registerUserRet:action.payload
      };

      case REGISTER_USER_CLR:
      return {
        ...state,
        registerUserRet:false
      };



    case ADD_DOCTOR_RET:
      return {
        ...state,
        addDoctorRet:action.payload
      };

      case ADD_DOCTOR_CLR:
      return {
        ...state,
        addDoctorRet:false
      };


      case EDIT_PROCEDURE_RET:
        return {
          ...state,
          editProcedureRet:action.payload
        };
  
        case EDIT_PROCEDURE_CLR:
        return {
          ...state,
          editProcedureRet:false
        };
  

    case UPDATE_BANNER_RET:
      return {
        ...state,
        updateBannerRet:action.payload
      };

      case UPDATE_BANNER_CLR:
      return {
        ...state,
        updateBannerRet:false
      };


      case GET_SPECS_RET:
      return {
        ...state,
        getSpecsRet:action.payload
      };

      case GET_SPECS_CLR:
      return {
        ...state,
        getSpecsRet:false
      };

      case GET_SERV_RET:
      return {
        ...state,
        getServRet:action.payload
      };

      case GET_SERV_CLR:
      return {
        ...state,
        getServRet:false
      };



      case EDIT_BIO_RET:
        return {
          ...state,
          editBioRet:action.payload
        };
  
        case EDIT_BIO_CLR:
        return {
          ...state,
          editBioRet:false
        };


      case UPDATE_ACHIEVEMENT_RET:
      return {
        ...state,
        updateAchievementRet:action.payload
      };

      case UPDATE_ACHIEVEMENT_CLR:
      return {
        ...state,
        updateAchievementRet:false
      };

    case SUBMIT_BANK_DETAILS_RET:
      return {
        ...state,
        submitBankDetailsRet:action.payload
      };

      case SUBMIT_BANK_DETAILS_CLR:
      return {
        ...state,
        submitBankDetailsRet:false
      };
  

  case DOWNLOAD_CATALOGUE:
    return {
      ...state,
      downloadCatalogue: action.payload,
      downloadCatalogueLoading:true
    };

    case SEARCH_PROCEDURE_RET:
    return {
      ...state,
      searchProceduresRet: action.payload,
      searchProcedureLoading:false
    };

    case SEARCH_PROCEDURE_CLR:
    return {
      ...state,
      searchProceduresRet: false,
      searchProcedureLoading:false
    };

    case GET_USER_DETAILS:
      return {
        ...state,
         getUserLoading:true
      };

    case DOWNLOAD_CATALOGUE_RET:
    return {
      ...state,
      downloadCatalogueRet: action.payload,
      downloadCatalogueLoading:false
    };

    case DOWNLOAD_CATALOGUE_CLR:
      return {
        ...state,
        downloadCatalogueRet: false,
        downloadCatalogueLoading:false
      };

    case UPLOAD_PROCEDURE:
      return {
        ...state,
        uploadProcedures: action.payload,
        uploadProceduresLoading:true
      };

      case UPLOAD_PROCEDURE_RET:
      return {
        ...state,
        uploadProceduresRet: action.payload,
        uploadProceduresLoading:false
      };

      case UPLOAD_PROCEDURE_CLR:
        return {
          ...state,
          uploadProceduresRet: false,
          uploadProceduresLoading:false
        };

    case UPDATE_IMAGE:
      return {
        ...state,
        updateImage: action.payload,
        updateImageLoading:true
      };

      case UPDATE_IMAGE_RET:
      return {
        ...state,
        updateImageRet: action.payload,
        updateImageLoading:false
      };

      case UPDATE_IMAGE_CLR:
        return {
          ...state,
          updateImageRet: false,
          updateImageLoading:false
        };

    case UPLOAD:
      return {
        ...state,
        upload: action.payload,
        uploadLoading:true
      };

      case UPLOAD_RET:
      return {
        ...state,
        uploadRet: action.payload,
        uploadLoading:false
      };

      case UPLOAD_RET_CLR:
        return {
          ...state,
          uploadRet: false,
          uploadLoading:false
        };


    case LOGOUT_DEVICES:
      return {
        ...state,
        logoutDevices: action.payload,
        logoutDevicesLoading:true
      };

      case LOGOUT_DEVICES_RET:
      return {
        ...state,
        logoutDevicesRet: action.payload,
        logoutDevicesLoading:false
      };

      case LOGOUT_DEVICES_CLR:
        return {
          ...state,
          logoutDevicesRet: false,
          logoutDevicesLoading:false
        };


    case RESET_PASS_RET:
      return {
        ...state,
        resetPassRet: action.payload
      };

      case CLR_RESET_PASS:
      return {
        ...state,
        resetPassRet: false
      };

      case SUBMIT_PROFILE:
        return {
          ...state,
          submitProfileLoading:true
        };

    case SUBMIT_PROFILE_RET:
      return {
        ...state,
        submitProfileRet: action.payload,
        submitProfileLoading:false
      };

    case CLEAR_SUBMIT_PROFILE_RET:
      return {
        ...state,
        submitProfileRet: false,
        submitProfileLoading:false
      };

    case NEW_USER:
      return {
        ...state,
        userDetail: action.payload,
        getUserLoading:false
      };
    case GET_BOOKING:
      return {
        ...state,
        bookingData: action.payload
      };
    case GET_INSIGHTS:
      return {
        ...state,
        insightData: action.payload
      }
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notificationData: action.payload
      }
    case GET_TIMESLOT:
      return {
        ...state,
        timeSlot: action.payload
      }
    case UNREAD_LENGTH:
      return {
        ...state,
        unreadCounter: action.payload
      }
    case UNREAD_NOTIFICATION:
      return {
        ...state,
        unreadNotification: action.payload
      }
    case GET_SOL_INSIGHTS:
      return {
        ...state,
        solInsights: action.payload
      }
    case BUSINESS_EARN:
      return {
        ...state,
        businessEarn: action.payload
      }
    case BUSINESS_LOST:
      return {
        ...state,
        businessLost: action.payload
      }
      case SOLUTION_USERS:
        return {
          ...state,
          solutionUsers: action.payload
        }
        case GET_CATALOGUE:
        return {
          ...state,
          catalogues: action.payload
        }   
    default:
      return state;
  }
}