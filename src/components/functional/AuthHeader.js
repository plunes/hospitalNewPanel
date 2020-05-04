import React from "react"

const AuthHeader = (props) =>{
    return(
     
        <nav className="navbar custom_ha navbar-expand-md custom-navbar sigunup_hedr">
        <div className="container">
            <a className="navbar-brand logo_size col-lg-3 col-md-4 col-6" href="#">
                <img src="/pluneslogo.png" className="lgo_sigun" />
            </a>
           <button className="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <i className="fa fa-bars" aria-hidden="true"></i>
           </button>
             <div className="collapse navbar-collapse col-lg-9 back_color_mo" id="collapsibleNavbar">
                 <ul className="navbar-nav ml-auto Three_butn dr_lis_mobile">
                   <li className="nav-item">
                    <a href="#"className="nav-link d_app">Download App</a>
                    <img src="/iOS.png" className="ios_m"/> <img src="/Android.png" className="andorid_m"/>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-link sig_lgn">Login</a>
                  </li>
                   <li className="nav-item">
                     <a className="nav-link signup_lgu" href="/signup">Signup</a>
                   </li>  
                 </ul>
             </div>  
        </div>
</nav>
            
    )
}
export default AuthHeader