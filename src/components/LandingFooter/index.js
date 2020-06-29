import React, { Component } from 'react'
import  { Link } from "react-router-dom"


export default class LandingFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, openFooter:false };
    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
//   componentDidMount() {
//     this.updateWindowDimensions();
//     window.addEventListener('resize', this.updateWindowDimensions);
//   }
  
//   componentWillUnmount() {
//     window.removeEventListener('resize', this.updateWindowDimensions);
//   }
  
//   updateWindowDimensions() {
//     this.setState({ width: window.innerWidth, height: window.innerHeight });
//   }
  render() {
    return (
        <div class="container-fluid foter_colour_section">
          <div className="container">

            <div className="footer_wrap_rish">
                <div className="footer_wrap_child_rish">
                    <Link to="/" title="home" >
                      <img className="responsive-logo" src="/logo.png" alt=".."/>
                    </Link>
                  <h3 className="heading_footer_rish margin margin_top_medium_rish">FOLLOW US AT </h3>
                  <ul className="follow-us-at top_mobile">
                    <li className="follow-us-at">
                      <span>
                        <a href="https://in.linkedin.com/company/plunes-com/" target="_blank" rel="noopener" title="linkedin"><img className="ftr" src="/lin.svg" alt=".." /></a></span>
                    </li>
                    <li className="follow-us-at">
                      <span>
                        <a href="https://instagram.com/plunes_utility_network?igshid=17ov9733181re/" rel="noopener" title="instagram" target="_blank"><img className="ftr1" src="/ins.svg" alt=".." /></a></span>
                    </li>
                    <li className="follow-us-at">
                      <span>
                        <a href="https://www.facebook.com/plunes076/ " title="facebook" rel="noopener" target="_blank"><img className="ftr2" src="/fce.svg" alt=".." /></a></span>
                    </li>
                  </ul>
                </div>

                

                <div className='footer_wrap_child_rish'>
                  <h3 className="heading_footer_rish">FOR HOSPITALS/CLINICS</h3>
                  <ul className="services footerele">
                    <li><Link className="sub_heading_footer_rish" to="/signup"  title="Register at Plunes">Register</Link></li>
                    <li><a className="sub_heading_footer_rish" href="https://plockr.plunes.com/" target= '_blanck' title='Plockr'>Plockr</a></li>
                  </ul>
                </div>

                <div className='footer_wrap_child_rish'>
                  <h3 className="heading_footer_rish">Get in touch with</h3>
                  <ul className="services footerele">
                    <li><a href="https://www.plunes.com/about-us" target="_blanck" className="sub_heading_footer_rish" title='About us'>About us</a></li>
                    <li><a href="https://www.plunes.com/contact-us" target="_blanck" className="sub_heading_footer_rish" title='Contact us'>Contact Us</a></li>
                    {/* <li><a ="/careers" className="sub_heading_footer_rish" title='Careers'>Careers</Link></li> */}
                    <li><a href="https://www.plunes.com/blog" target="_blanck" className="sub_heading_footer_rish" title='Blog'>Blog</a></li>
                  </ul>
                </div>

                <div className="footer_wrap_child_rish">
                  <h3 className="heading_footer_rish">Our policies</h3>
                   <ul className="services footerele ">
                    <li><a href="https://www.plunes.com/terms-of-use" target="_blanck" className="sub_heading_footer_rish" title='Terms of use'>Terms of use</a></li>
                    <li><a href="https://www.plunes.com/privacy" target="_blanck" className="sub_heading_footer_rish" title='Privacy Policy'>Privacy Policy</a></li>
                  </ul>
                </div>

               

                <div className="footer_wrap_child_rish">
                  <h3 className="heading_footer_rish">Reach us at</h3>
                  <ul className="services footerele ">
                    <li><a className="sub_heading_footer_rish" style={{textTransform:'none'}} href="https://www.plunes.com/contact-us" target='_blanck' title='info@plunes.com'>info@plunes.com</a></li>
                  </ul>

                  <h3 className="heading_footer_rish">Toll Free No</h3>
                  <ul className="services footerele ">
                    <li><span className="sub_heading_footer_rish" style={{textTransform:'none'}} >+91 7011311900</span></li>
                  </ul>
                </div>
            </div>
          </div>
          <div className="">
            <div className="row align-items-center _brdr_bt">
              <p style={{color:'#fff'}} className="col-lg-12 col-sm-12 footer-text m-0 text-center footerlast ">
                © 2020 Plunes · All rights reserved
             </p>
            </div>
          </div>
        </div>
    )
  }
}