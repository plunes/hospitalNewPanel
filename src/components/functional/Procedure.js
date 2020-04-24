import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useLayoutEffect } from "react"

 const Procedure= (props) => {
     
 console.log(props,"props in dowmnload Catalogue")  
  const { addToast } = useToasts()
//   if(!!props.downloadCatalogueRet){
//     console.log("props.downloadCatalogueRet",props.downLoadCatalogueRet)
//       if(!!props.downloadCatalogueRet.success){
//         addToast(props.downloadCatalogueRet.message, {appearance: 'success', autoDismiss:true}) 
//       }else{
//         addToast(props.downloadCatalogueRet.message, {appearance: 'error', autoDismiss:true})
//       }
//       props.downloadCatalogueClr()
//   }

  const {data} = props

  return (
<React.Fragment>
  
<div>
    <div className = 'row listOfService' key = {props.id}>
        <div className='col-md-6'>{data.service}</div>
        <div className='col-md-3'>Rs. {data.price[0]}</div>
        <div className='col-md-3 catalogueVariance'>{data.variance}%</div>
        <p onClick={()=>props.handleEditInclusion()} className={`col-md-3 edit-link ${!!props.editFlag?'':'display-none'}`}>Edit Inclusions</p>
    </div>
    <div>
    
    </div>
    <hr></hr>
    {/* <div className = 'row listOfService'>
            <div className='col-md-8'><hr></hr></div>
            <div className='col-md-4'></div>
    </div> */}
</div>
</React.Fragment>
  )
}
 

export default Procedure