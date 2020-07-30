import React from "react"
import { Link } from "react-router-dom"

const AuthHeader = (props) =>{
  console.log(window.location,"window.location")
    return(
      <nav className="navbar custom_ha navbar-expand-md custom-navbar ">
      <div className="header_wrapper_rish oversize_wrap_rish display_flex">
      <div className="header_wrapper_logo_child_rish ">
            <div style={{position:'relative',width:'100%', height:'100%'}} className='center_align_rish' >
              <Link to="/dashboard">
                <img src="/icon/plunes_logo.png" style={{marginLeft:'2rem'}} className="logo_rish cursor-pointer" />
              </Link>
            </div>
          
          </div>
      <div className="header_wrapper_links_child_rish mobile_header_links">
         <button className="navbar-toggler navbar-toggler-right custom-toggler" type="button" >
          <i className="fa fa-bars" aria-hidden="true"></i>
         </button>
           <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ml-auto Three_butn dr_lis_mobile">
              <li className="nav-item header_li_rish">
                    <Link to="/signup"
                    > <text style={{color:window.location.pathname==='/signup'?'#01D35A !important':'inherit'}}  className={`${window.location.pathname==='/signup'?'green_text_rish':'header_link_text'} `} >Signup</text></Link>
                </li> 
               <li className="nav-item header_li_rish">
                    <Link to="/signin"
                    > <text style={{color:window.location.pathname==='/signin'?'#01D35A !important':'inherit'}}   className={`${window.location.pathname==='/signin'?'green_text_rish':'header_link_text'} `} >Login</text></Link>
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
            
    )
}
export default AuthHeader