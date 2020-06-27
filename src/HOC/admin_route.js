import React , { Component } from 'react'
import { Redirect } from "react-router-dom"

 const admin_route = ({authObject, ...rest}) => (getComponent) => {
                if(((!!(authObject().isAdmin)) || (((!authObject().isAdmin) && (!authObject().isCenter))))){
                    return  getComponent()
                  }else{
                    return  <Redirect to="/dashboard" />
                  }
}

export default admin_route
