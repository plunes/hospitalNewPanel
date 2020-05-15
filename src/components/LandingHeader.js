import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './landingheader.css'


class LandinHeader extends Component {
    render() {
        return (
          <React.Fragment>
          <nav className="navbar custom_ha navbar-expand-md custom-navbar landing_hedr">
        <div className="container">
            <a className="navbar-brand logo_size col-lg-3 col-md-3 col-6" href="#">
                <img src="/logo.png" className="lgo_sigun" />
            </a>
           <button className="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <i className="fa fa-bars" aria-hidden="true"></i>
           </button>
             <div className="collapse navbar-collapse col-lg-9 col-12 col-md-9 back_color_mo" id="collapsibleNavbar">
                 <ul className="navbar-nav ml-auto Three_butn dr_lis_mobile">
                   <li className="nav-item">
                    <div className="dropdown drp_part">
                <button type="button" className="btn dropdown-toggle cus_bu" data-toggle="dropdown" >
                  Download the App
                    </button>
                   
                  <ul className="dropdown-menu" role="tree" aria-expanded="true" aria-hidden="false">
                  <li className="icons_pdi"><a href="https://apps.apple.com/us/app/plunes/id1463747553/" title="app store">
                    <img className="OIS" src="/OIS.png" alt=".." />
                    <span className="ios-img-header">iOS</span></a>
                  </li>
                    <hr width="70%"></hr>
                  <li className="icons_pdi">
                    <a href="https://play.google.com/store/apps/details?id=com.plunes&hl=en_IN/" title="play store">
                      <img className="Andgre" src="/Andgre.png" alt=".." />
                      <span className="ios-img-header">Android</span></a>
                  </li>
                </ul>
               
              </div>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup"
                    className="nav-link sig_lgn"
                    > login</Link>
                    {/* <a href="/signup" className="nav-link sig_lgn">Signup</a> */}
                  </li> 
                 </ul>
             </div>  
        </div>
</nav>

    
    </React.Fragment>
      );
    }
}

export default  LandinHeader;