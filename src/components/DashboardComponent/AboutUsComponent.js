import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import  "./AboutUs.css";
import { Redirect } from 'react-router-dom';
import AnimatedMount from "../../HOC/AnimatedMount"

class AboutUsComponent extends Component {
    render() {
        let isAuth = localStorage.getItem('token')
        if(!isAuth){
        return  <Redirect
          to={{
            pathname : '/signin'
          }}
        />
        }else{
            return (
              <React.Fragment>
                            <div className='main_content_rish new_card_class'>
                                <div>
                                <div className="AboutHospitalBody">
                                <h4 style={{position:'relative'}} className="section_heading_rish">About Us</h4>
                                <div className="Aboutplunes"><p>Plunes is building India's first utility network, which helps you find instant solutions to your all healthcare problems. 
                                    We are an AI powered utility network, which helps you find curated, validated & cost effective solutions to your all healthcare problems. 
                                    Our technology enables every individual to have their own doctor anywhere anytime as well as have the experience of solving the problems
                                    of clients in real time. Our AI is very advanced and acts as an assistant to everyone on the platform. 
                                    It assist users in curating professionals and price, on the other hand, it acts as an assistant for professionals as well. 
                                    Plunes is the one stop solution for Diagnostic, Consultation and Procedures.
                                    Soon, Plunes will also helps its users to receive medicines at their doorsteps by partnering with pharmacists.</p></div>
                                </div>
                                </div>
                                </div>
                        <div className='col-md-3'></div>
           </React.Fragment>
            )
        }    
       
    }
}

    
export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: 'translate3d(0, -2rem, 0)',
    transition: 'opacity 100ms ease-out, transform 100ms ease-out',
  },
  mountedStyle: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .5s ease-out, transform .5s ease-out',
  },
})(AboutUsComponent)
