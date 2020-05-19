import { useToasts } from 'react-toast-notifications'
import React from "react"
export const notify = ( content,type ) => {
  const { addToast } = useToasts()
  addToast(content, {
      appearance:type,
      autoDismiss: true,
    })
  return (<div></div>)
}

