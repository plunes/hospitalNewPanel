import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';

export default class LogoutComponent extends Component {
    render() {
        return (
            <div>
<<<<<<< HEAD
            <div className='row'>
=======
            <div>
>>>>>>> c716901bdbfcb1a4ec89db606a78db26f007a4ed
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
