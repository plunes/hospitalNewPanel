import { ToastProvider, useToasts } from 'react-toast-notifications'
import React from "react"
import LoaderComponent from "./LoaderComponent"
const Achievement = (props) =>{
    const { addToast } = useToasts()
    if(props.selectedAchievement === props.i){
          if(props.updateAchievementRet.type==="delete"){
              if(!!props.updateAchievementRet.success){
                addToast(props.updateAchievementRet.message, {appearance: 'success', autoDismiss:true}) 
                props.getUser()
              }else{
                addToast(props.updateAchievementRet.message, {appearance: 'error', autoDismiss:true})
              }
              props.updateAchievementClr()
          }
        }
    return (
     <div className="col-lg-6">
        <div className="cir_b"><img src="/cross.png" onClick={()=>props.removeAchievement(props.i)} className="croS cursor-pointer" /></div>
            <img src={!!props.data?!!props.data.imageUrl?props.data.imageUrl:'/ach1.png':'/ach1.png'} className="ach1" />
            {/* <span className="three">+3</span> */}
        <p>{!!props.data?!!props.data.achievement?props.data.achievement:'Not Available':'Not Available'}</p>
    </div>
    )
}

export default Achievement