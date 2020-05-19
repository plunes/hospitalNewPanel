import React, { Component } from 'react'
import ProfileContainer from './ProfileContainer'
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';

export default class ProfileComponent extends Component {
    render() {
        return (
            <div>
            <div className='row'>
                <DashboardHeader />
            </div>
          
            <div className='row'>
                <div className='col-md-4 col-xl-2 text-center'>
                    <SidebarComponent />
                </div>
                <div className='col-md-8 col-xl-8'>
                    <ProfileContainer />
                </div>
                </div>
            
           
        </div>
        )
    }
}
