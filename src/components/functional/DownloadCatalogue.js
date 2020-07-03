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
       <img 
       onClick={(e)=>{
                 e.preventDefault()
                 props.downloadCatalogue()  }}
       className="catalogue-img cursor-pointer" src="/down.svg" alt="" />
      <text style={{marginTop:'.5rem'}} className='catalogue_test_name display_block_rish  '>Download Sample</text>
    </React.Fragment>
  )
}
 

export default DownloadCatalogue