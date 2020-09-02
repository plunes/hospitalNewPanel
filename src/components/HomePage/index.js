import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import LandingHeader from '../LandingHeader'
import "./index.css"
import LandingFooter from '../LandingFooter';

var rootStyle = {
    backgroundColor : 'green',
    color : 'white',
    height : '100%'
  
  }

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
    }

    componentDidMount(){
        const runScript = () => {
            if( window.$ ) {
              // do your action that depends on jQuery.
             let  script = document.createElement("script");
          
              script.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/lib/bootstrap/js/bootstrap.bundle.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/js/jquery.countto.js?1485983083";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/js/slick/slick.js?1485983083";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/js/core.js?1507873861";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
          
              script = document.createElement("script");
              script.src = "/assets/lib/owl.carousel/owl.carousel.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/lib/jquery.easing/jquery.easing.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/lib/waypoints/jquery.waypoints.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/lib/jquery-sticky/jquery.sticky.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/lib/counterup/counterup.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/js/marquee.js?1485983083";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
          
              script = document.createElement("script");
              script.src = "/assets/lib/venobox/venobox.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
              script = document.createElement("script");
              script.src = "/assets/lib/owl.carousel/owl.carousel.min.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
          
              script = document.createElement("script");
              script.src = "/assets/js/main.js";
              script.async = true;
              script.crossorigin="anonymous"
              document.head.appendChild(script);
          
          } else {
              // Load Jquey in to window
              let script = document.createElement("script");
          
              script.src = "https://code.jquery.com/jquery-2.2.4.min.js";
              script.async = true;
              script.crossorigin="anonymous"
            
              document.head.appendChild(script);
          
               // wait 50 milliseconds and try again.
              window.setTimeout( runScript, 50 );
          }
           }

           runScript()
    }

    render() {
        
        return (
        <React.Fragment>
            <div>
                <div className='row'>
                    <LandingHeader />
                </div>
                <div className="main_content_wrapper_rish page_min_height_rish oversize_wrap_rish">
                    <section id="section_rish" className="home_page_sec1">
                        <div className="text-center">
                            <h1 className="primary_heading_rish ">Welcome to India's First Utility Network</h1>
                            <h3 className="sub_heading_rish grey_color">Create your profile for free to get started</h3>
                            <Link to="/signup">
                            <button className='button_rish color_white_rish margin_top_small_rish'>Get Started for Free</button>
                            </Link>
                            <div className="flex_wrap_rish_column-reverse margin_top_medium_rish">
                                <div className="flex_child_three_rish">
                                    <h2 className="secondary-heading_rish sub_heading_home_page_rish home_page_section1_secondary">AI offers intelligent and competitive business insights to enhance your patient footfall and revenues.</h2>
                                </div>
                                <div className="flex_child_seven_rish">
                                   <img src="/ai_offeres_inteligent_solution.png" className="align_center_rish home_page_section_1_image " alt="AI offers intelligent and competitive business insights to enhance your patient footfall and revenues." />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="counts" className="counts section-bg">
            <div className="container">
      
              <div className="row justify-content-end">
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/balance.svg" className="img-fluid" />
                      <span data-toggle="counter-up">1349</span>
                    <p>Contract Balance</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/participants.svg" className="img-fluid" />
                      <span data-toggle="counter-up">65</span>
                    <p>Participants</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/withdrawal.svg" className="img-fluid" />
                      <span data-toggle="counter-up">960</span>
                    <p>Today's withdrawal</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/secure-fund.svg" className="img-fluid" />
                      <span data-toggle="counter-up">500</span>
                    <p>Secure Fund</p>
                  </div>
                </div>
      
              </div>
      
            </div>
          </section>


          <section className="user-land-advantages  cryp-section translate40 js-animate" style={{background:'#2a2d33'}}>
      
      <span className="user-land-advantages__left"></span>
      <span className="user-land-advantages__right"></span>
      <div className="container">
          <div className="section-title">
            <h2 style={{color:'#fff'}}>Advantages</h2>
          </div>
          
          <div className="row">
              <div className="col-md-5">
                  <div className="user-land-advantage__item js-animate translate40">
                      <div className="user-land-advantage__value">Smart</div>
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                  </div>
                  <div className="user-land-advantage__item js-animate translate40">
                      <div className="user-land-advantage__value">Simple</div>
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                  </div>
              </div>
              
                  
              <div className="col-md-2 text-center js-animate translate40">
                <img src="assets/img/ether-logo.png" className="img-fluid" style={{height:'60%'}} />
              </div>
              
              <div className="col-md-5 ">
                  <div className="user-land-advantage__item user-land-advantage__item--right js-animate translate40">
                    
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                      <div className="user-land-advantage__value">Secure</div>
                  </div>
                  <div className="user-land-advantage__item user-land-advantage__item--right js-animate translate40">
                    
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                      <div className="user-land-advantage__value">Stable</div>
                  </div>
  
              </div>
          </div>
          
      </div>
  
  </section>
  
  

                    <section id="section_rish" className="home_page_sec2 margin_top_medium_rish">
                       <div className="flex_wrap_rish margin_top_medium_rish">
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <img src="/home_page_section_2.png" className="align_center_rish image_class_rish" alt="Real Time Insights" />
                                </div>
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className="margin_top_medium_rish home_page__sect2_heading_wrapper">
                                        <h2 className="secondary-heading_rish bold_text_rish  ">Real Time Insights.</h2>
                                        <h3 className="sub_heading_rish margin_top_small_rish sub_heading_home_page_rish">AI and Big data tools to monitor the flow of patients, enabling you to take data driven decision for optimizing the revenue.</h3>
                                    </div>
                                </div>
                       </div>
                    </section>

                    <section id="section_rish" className="home_page_sec3 margin_top_medium_rish">
                       <div className="flex_wrap_rish_column-reverse margin_top_medium_rish">
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className="margin_top_medium_rish home_page__sect3_heading_wrapper">
                                        <h2 className="secondary-heading_rish bold_text_rish home_page_section3_secondary ">Real Time Prediction.</h2>
                                        <ul className="home_page_ul_rish">
                                            <li className="home_page_li_rish"><h3 className="sub_heading_rish display_inline_rish">AI predicts the success rate based on the actions you take on insights. </h3> </li>
                                            <li className="home_page_li_rish"><h3 className="sub_heading_rish display_inline_rish">Smart decision making, via competition analysis.</h3></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <img src="/real_time_prediction.png" className="image_class_rish align_center_rish" alt="Real Time Insights" />
                                </div>
                       </div>
                    </section>

                    <section id="section_rish" className="home_page_sec4 margin_top_medium_rish">
                       <div className="flex_wrap_rish margin_top_medium_rish">
                                <div   className="flex_child_five_rish vertical_align_flex_rish">
                                  <div id="how_it_works_div" className="home_page_how_works_div">
                                     <div className="iframe_wrapper_home">
                                        <iframe 
                                            src="https://www.youtube.com/embed/eEQGGzplZ7w" 
                                            className="vertical_align_rish_new home_page_iframe"
                                            frameBorder="0"
                                            alt = "Check how it work" 
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen>
                                        </iframe>
                                      </div>
                                  </div>
                                </div>
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className="position_relative_rish text-center">
                                            <h2 className="secondary-heading_rish vertical_align_rish_new bold_text_rish home_page_section3_secondary ">See how it works!</h2>
                                    </div>
                                </div>
                                
                       </div>
                    </section>



                    <section id="section_rish" className="home_page_sec5 margin_top_medium_rish">
                       <div className="flex_wrap_rish_column-reverse margin_top_medium_rish">
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className="margin_top_medium_rish">
                                            <h2 className="secondary-heading_rish bold_text_rish home_page_section3_secondary ">Manage Centres</h2>
                                            <h3 className="sub_heading_rish  home_page_section3_secondary">Real Time Reports</h3>
                                            <ul className="home_page_ul_rish">
                                                <li className="home_page_li_rish margin_top_small_rish"><h3 className="sub_heading_rish display_inline_rish">Manage all of your branches and centre with one app</h3> </li>
                                                <li className="home_page_li_rish margin_top_small_rish"><h3 className="sub_heading_rish display_inline_rish">Monitor, Control & increase the business efficiency for all the centers from one app.</h3></li>
                                            </ul>
                                    </div>
                                </div>
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className="margin_top_medium_rish ">
                                      <img src="/manage_center_home.png" className="image_class_rish align_center_rish" alt="Real Time Insights" />
                                    </div>
                                </div>
                       </div>
                    </section>

                    <section id="section_rish" className="home_page_sec6 margin_top_medium_rish">
                       <div className="flex_wrap_rish margin_top_medium_rish">
                                <div   className="flex_child_five_rish vertical_align_flex_rish">
                                  <div id="why_plunes_home_div" className="why_plunes_home_div">
                                  <img src="/why_plunes_home.svg" className="align_center_rish image_class_rish" alt="Real Time Insights" />
                                  </div>
                                </div>
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className=" home_page_sec6_heading_wrap">
                                            <h2 className="secondary-heading_rish  bold_text_rish home_page_section3_secondary ">Why Plunes?</h2>
                                            <h3 className="sub_heading_rish home_page_section3_secondary  sub_heading_home_page_rish">Enhance your revenues via smart insights.<br /> Stay ahead of the competition. <br />Direct leads matching your catalog.</h3>
                                    </div>
                                </div>  
                       </div>
                    </section>


                    <section id="section_rish" className="home_page_sec7 margin_top_medium_rish">
                       <div className="flex_wrap_rish_column-reverse margin_top_medium_rish">
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className="margin_top_medium_rish">
                                            <h2 className="secondary-heading_rish bold_text_rish home_page_section3_secondary ">An intelligent Cloud Solution for EMR, Integrated with profiles of Users and Hospitals for a seamless experience.</h2>
                                           <div className="margin_top_medium_rish">
                                                <div className="margin_top_small_rish rish_flex_wrap_sect7">
                                                    <span className="sect7_icon_span rish_flex_wrap_sect7_child1"><img className="icon_rish_sect7" src="/sect7_icon1.svg"/></span>
                                                    <span className="sect7_data_span rish_flex_wrap_sect7_child2"><h3 style={{marginBottom:'0rem'}} className="sub_heading_rish display_inline_rish ">Unlimited cloud storage</h3></span>
                                                </div>
                                                <div className="margin_top_small_rish rish_flex_wrap_sect7 ">
                                                    <span className="sect7_icon_span rish_flex_wrap_sect7_child1"><img className="icon_rish_sect7" src="/sect7_icon2.svg"/></span>
                                                    <span className="sect7_data_span rish_flex_wrap_sect7_child2"><h3 style={{marginBottom:'0rem'}} className="sub_heading_rish ">Share reports with patients in one click</h3></span>
                                                </div>
                                                <div className="margin_top_small_rish rish_flex_wrap_sect7">
                                                    <span className="sect7_icon_span rish_flex_wrap_sect7_child1"><img className="icon_rish_sect7" src="/sect7_icon3.svg"/></span>
                                                    <span className="sect7_data_span rish_flex_wrap_sect7_child2"><h3  style={{marginBottom:'0rem'}} className="sub_heading_rish ">Reduction in overall operational costs up to 40% /annum</h3></span>
                                                </div>
                                           </div>
                                    </div>
                                </div>
                                <div className="flex_child_five_rish vertical_align_flex_rish">
                                    <div className="margin_top_medium_rish ">
                                      <img src="/home_page_plockr.png" className="image_class_rish align_center_rish" alt="Real Time Insights" />
                                    </div>
                                </div>
                       </div>
                    </section>
                </div>
            </div>
          <LandingFooter />
          </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    user : state.user.userDetail
  })
  export default connect(mapStateToProps, { })(HomePage)

