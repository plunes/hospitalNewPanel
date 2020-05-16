import React from "react"
import { Link } from "react-router-dom"

const AuthHeader = (props) =>{
  console.log(window.location,"window.location")
    return(
     <div className="header">
       <div>
        
<nav className="navbar custom_ha navbar-expand-md custom-navbar sigunup_hedr">
        <div className="container">
            <Link className="navbar-brand logo_size col-lg-3 col-md-3 col-6" to="/">
                <img src="/logo.png" className="lgo_sigun" />
            </Link>
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
                    <Link to="/signin" className={`${window.location.pathname==='/'?'active':''} nav-link sig_lgn a `} >Login</Link>
                  </li>
                   <li className="nav-item">
                     <Link to="/signup"  className={`${window.location.pathname==='/signup'?'active':''} nav-link signup_lgu`}  href="/signup">Signup</Link>
                   </li>  
                 </ul>
             </div>  
        </div>
</nav>

</div>
</div>
            
    )
}
export default AuthHeader