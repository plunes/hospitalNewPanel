import { ToastProvider, useToasts } from 'react-toast-notifications'
import React from "react"

 const LogoutOther= (props) => {
    
  const { addToast } = useToasts()
  if(!!props.logoutDevicesRet){
      if(!!props.logoutDevicesRet.success){
        addToast(props.logoutDevicesRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.logoutDevicesRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.logoutDevicesClr()
  }

   const logoutOther = () => {
       let deviceId = localStorage.getItem('deviceId' || [])
        if(deviceId){
          props.logoutOtherDevices({
                deviceId:deviceId
           })
            // addToast("Enter all the details",{ appearance: 'error', autoDismiss:true  })
        }else if(props.newPassword !== props.rePassword){
          addToast("Please refresh and try again",{ appearance: 'error', autoDismiss:true  })
        }else{
            props.logoutOtherDevices({
                 deviceId:[deviceId]
            })
        }
    }

  return (
    <div className="col-sm-9 col settingcol2">
        <p onClick = {()=>logoutOther()} className="typeofsetting">Logout from all devices</p>
    </div>
  )
}
 

export default LogoutOther