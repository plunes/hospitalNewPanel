import { fas } from "@fortawesome/free-solid-svg-icons";
import  React from "react"
import Modal from 'react-modal';
import NewNotif from "./NewNotif"
const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding:'0px',
      boxShadow:"0px 3px 6px #00000029",
      width:'30%'
  }
};


const SaveService = (props) => {
  const [open, set_open] = React.useState(false)
  const [ret, set_ret] = React.useState(false)
  React.useEffect(()=>{
        set_open(props.open)

        if(props.do_not_notify_ret){
          if(props.do_not_notify_ret.success){
             set_ret({
              success:true,
              message:props.do_not_notify_ret.message
            })
            props.toggle()
          }else{
            set_ret({
              success:false,
              message:props.do_not_notify_ret.message
            })
          }
          props.do_not_notify_loading()
        }

  },[props.open, props.do_not_notify_ret])

  const close = () => {
      set_open(false)
      props.toggle()
  }

  console.log(props,"props in NotNotify")
    return (<React.Fragment>
                        <NewNotif 
                            ret ={ret}
                            retClr = {()=>{set_ret(false)}}
                        />
                       <Modal
                        // Real Time Insight Modal
                            isOpen={open}
                            onAfterOpen={()=>console.log()}
                            onRequestClose={()=>close()}
                            style={customStyles}
                            ariaHideApp={false}
                            contentLabel="Example Modal" className=''>
                        <div className="no_notif_wrapper">
                                  <div className="no_notif-image-wrapper">
                                      <img src="/catalogue_save.svg" className="no_notif_image" />
                                  </div>
                                  <div className="no_notif-text-wrapper">
                                          <span className="no_notify-text-bold">
                                          Save the price in your catalogue ?
                                          </span>
                                          <span className="no_notify-text-small">
                                             {/* Do not notify for this in future */}
                                          </span>
                                    </div>
                                    <div className="no_notif-buttons-wrapper">
                                        <span onClick={()=>{
                                          props.updateRealPrice({...props.data, saveService:"NO"})
                                        }}  className="no_notif_button-left">
                                            Cancel
                                        </span>
                                        <span onClick={()=>{
                                          props.updateRealPrice({
                                            specialityId:props.data.specialityId,
                                            saveService:true,
                                            services:[{
                                              specialityId:props.data.specialityId,
                                              serviceId:props.data.serviceId,
                                              service:props.data.serviceName,
                                              category:"Basic",
                                              price:props.real_time_edit?props.real_time_edit_price:props.updateRealPrice,
                                              variance:0
                                            }]
                                          })
                                        }} className="no_notif_button-right">
                                            Yes
                                        </span>
                                    </div>
                        </div>           
                      </Modal>
    </React.Fragment>)
}

export default SaveService