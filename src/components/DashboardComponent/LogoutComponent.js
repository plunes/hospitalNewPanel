import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';

export default class LogoutComponent extends Component {
    render() {
        return (
            <div>
            <div>
                <DashboardHeader />
            </div>
            <div className='row'>
                <div className='col-md-4'>
                    <SidebarComponent />
                </div>
                <div className='col-md-8'>
                    {/* <img src='/profile.png' alt='Profile'/> */}
                    LogoutComponent
                </div>
            </div>
        </div>
        )
    }
}
