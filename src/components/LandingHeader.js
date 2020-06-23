import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './landingheader.css'


class LandinHeader extends Component {
    render() {
        return (
          <React.Fragment>
          <nav className="navbar custom_ha navbar-expand-md custom-navbar landing_hedr">
        <div className="container">
            <a  style={{position:'relative'}} className="col-lg-3 col-md-3 col-6" href="#">
                <img src="/logo.jpg" className="vertical_align_rish_new logo_rish" />
            </a>
           <button className="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <i className="fa fa-bars" aria-hidden="true"></i>
           </button>
             <div className="collapse navbar-collapse col-lg-9 col-12 col-md-9 back_color_mo" id="collapsibleNavbar">
                 <ul className="navbar-nav ml-auto Three_butn dr_lis_mobile">
                 <li className="nav-item header_li_rish">
                    <Link to="/signin"
                    > <text className="header_link_text">Login</text></Link>
                  </li> 
                   <li className="nav-item header_li_rish">
                    <div className="dropdown drp_part">
                <text type="button"  className="header_link_text"  data-toggle="dropdown" >
                  Download the App <img src="/Small-Arrow-Down.svg" style={{marginLeft:'.8rem', height:'0.6rem', width:'auto'}}  />
                    </text>
                  <ul className="dropdown-menu" role="tree" aria-expanded="true" aria-hidden="false">
                  <li className="icons_pdi"><a href="https://apps.apple.com/us/app/plunes/id1463747553/" title="app store">
                    <img className="OIS" src="/OIS.jpg" alt=".." />
                    <span className="ios-img-header">iOS</span></a>
                  </li>
                    <hr width="70%"></hr>
                  <li className="icons_pdi">
                    <a href="https://play.google.com/store/apps/details?id=com.plunes&hl=en_IN/" title="play store">
                      <img className="Andgre" src="/Andgre.jpg" alt=".." />
                      <span className="ios-img-header">Android</span></a>
                  </li>
                </ul>
              </div>
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