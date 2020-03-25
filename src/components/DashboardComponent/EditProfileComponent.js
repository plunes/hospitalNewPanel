import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';

class EditProfileComponent extends Component {
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
                        <div className = 'editProfileComponent'>
                            Edit Profile
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfileComponent;