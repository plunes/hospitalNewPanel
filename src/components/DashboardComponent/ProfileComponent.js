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
                <div className='col-md-3'>
                    <SidebarComponent />
                </div>
                <div className='col-md-7'>
                    <ProfileContainer />
                </div>
                <div className='col-md-2'></div>
            </div>
        </div>
        )
    }
}
