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
      <React.Fragment>
     <div className="col-sm-4 col-lg-4">
        <div className="cir_b"><img src="/cross.jpg" onClick={()=>props.removeAchievement(props.i)} className="croS cursor-pointer" /></div>
            <img src={!!props.data?!!props.data.imageUrl?props.data.imageUrl:'/ach1.jpg':'/ach1.jpg'} className="ach1" />
            {/* <span className="three">+3</span> */}
        <p>{!!props.data?!!props.data.achievement?props.data.achievement:'Not Available':'Not Available'}</p>
    </div>
    <div className="col-sm-2 col-lg-2"></div>
    </React.Fragment>
    )
}

export default Achievement