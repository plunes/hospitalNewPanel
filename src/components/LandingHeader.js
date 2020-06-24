import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './landingheader.css'


class LandinHeader extends Component {
    render() {
        return (
          <React.Fragment>
     <nav className="navbar custom_ha navbar-expand-md custom-navbar ">
        <div className="header_wrapper_rish oversize_wrap_rish display_flex">
          <div className="header_wrapper_logo_child_rish ">
            <div style={{position:'relative',width:'100%', height:'100%'}} className='center_align_rish' >
              <Link to="/">
                <img src="/logo.jpg" className="logo_rish cursor-pointer" />
              </Link>
            </div>
          
          </div>
        <div className="header_wrapper_links_child_rish mobile_header_links">
           <button className="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <i className="fa fa-bars" aria-hidden="true"></i>
           </button>
             <div className="collapse navbar-collapse" id="collapsibleNavbar">
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
      </div>
</nav>

    
    </React.Fragment>
      );
    }
}

export default  LandinHeader;