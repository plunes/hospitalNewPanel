import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useLayoutEffect } from "react"

 const DownloadCatalogue= (props) => {
  const { addToast } = useToasts()
  if(!!props.downloadCatalogueRet){
      if(!!props.downloadCatalogueRet.success){
        addToast(props.downloadCatalogueRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.downloadCatalogueRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.downloadCatalogueClr()
  }

  return (
<React.Fragment>
<div className='col-md-3 text-center'>
<a onClick={(e)=>{
    e.preventDefault()
    props.downloadCatalogue()
}} href=""><img src="./down.svg" alt=""></img>
<p className="uploadCata">Download Sample</p></a>
 </div>
</React.Fragment>
  )
}
 

export default DownloadCatalogue