import React , { Component } from 'react'
import { Redirect } from "react-router-dom"

 const protected_route = ({authObject, ...rest}) => (getComponent) => {
                if(!!(authObject().isAuthenticated)){
                    return  getComponent()
                  }else{
                    let { logout } = {...rest}
                    logout()
                    return  <Redirect to="/signin" />
                  }
}

export default protected_route
