import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import LandingHeader from '../LandingHeader'
import "./index.css"
import LandingFooter from '../LandingFooter';
import Button from "../functional/Button"

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
                <div className=" page_min_height_rish oversize_wrap_rish">
                <section id="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6  pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <div>
                {/* <img
                  src="assets/img/ethertree.png"
                  className="img-fluid"
                  style={{ height: "50px" }}
                /> */}
                {/* <br />
                <br /> */}
                <h2>Welcome to India's First Utility Network</h2>
                <h4>Smart, Simple, Secure, Stable</h4>
                <p>
                 Plunes is the AI powered utility network, which helps you find curated, validated & cost effective solutions to your healthcare problems.
                </p>
                <Button className="margin_top_small_rish" type="no_icon" >Join Plunes</Button>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img in-down">
              <img
                src="https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/About-Us/home_page_image-min.png"
                className="img-fluid home_section_1_image"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

                    {/* <section id="section_rish" className="home_page_sec1">
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
                    </section> */}
                 
          <section className="user-land-advantages  cryp-section translate40 js-animate section-bg"  >
      
      <span className="user-land-advantages__left"></span>
      <span className="user-land-advantages__right"></span>
      <div className="container">
          <div className="section-title">
            <h2 style={{color:'#000'}}>Why Plunes</h2>
          </div>
          
          <div className="row">
              <div className="col-md-4">
                  <div className="user-land-advantage__item js-animate translate40">
                      <div className="user-land-advantage__value">Real Time Insights</div>
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                  </div>
                  <div className="user-land-advantage__item js-animate translate40">
                      <div className="user-land-advantage__value">Actionable Insights</div>
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                  </div>
              </div>
              
                  
              <div className="col-md-4 text-center js-animate translate40">
                <img src="https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/About-Us/why_plunes-min.png" className="img-fluid why_plunes_center_image"  />
              </div>
              
              <div className="col-md-4 ">
                  <div className="user-land-advantage__item user-land-advantage__item--right js-animate translate40">
                    
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                      <div className="user-land-advantage__value">Extensive Marketing</div>
                  </div>
                  <div className="user-land-advantage__item user-land-advantage__item--right js-animate translate40">
                    
                      <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                      <div className="user-land-advantage__value">Stable</div>
                  </div>
  
              </div>
          </div>
          
      </div>
  
  </section>
  
  <section id="counts" className="counts section-bg">
            <div className="container">
      
              <div className="row justify-content-end">

              <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box">
                        <img src="https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/About-Us/stats_image4-min.png" className="img-fluid" />
                        <span className="count_wrap"> <span  data-toggle="counter-up">100000 </span> <span className="plus_icon"> + </span>  </span>
                        <p>Users</p>
                    </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/About-Us/stats_image1-min.png" className="img-fluid" />
                      <span className="count_wrap"> <span  data-toggle="counter-up">30000 </span> <span className="plus_icon"> + </span>  </span>
                    <p>Procedures</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/About-Us/stats_image2-min.png" className="img-fluid" />
                      <span className="count_wrap"> <span  data-toggle="counter-up">1500 </span> <span className="plus_icon"> + </span>  </span>
                    <p className="count-text">Doctors</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/About-Us/stats_image3-min.png" className="img-fluid" />
                      <span className="count_wrap"> <span  data-toggle="counter-up">500 </span> <span className="plus_icon"> + </span>  </span>
                    <p>Hospitals</p>
                  </div>
                </div>
      
               
      
              </div>
      
            </div>
          </section>

          <section id="how_we_do_section" className="contact_us_form_section_wrapper oversize_wrap_rish">
                        <div className="what_we_do_wrapper">
                            <h2 className="heading_rish align_center text-center">See How we Work?</h2>
                            <div className="see_how_we_work_iframe_wrap">
                              <iframe 
                                    className="see_how_we_work_iframe"
                                    src="https://www.youtube.com/embed/QwCxu5BgJQg"
                                    frameBorder="0"
                                    alt = "Check how it work" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                   allowFullScreen>
                         </iframe>
                        </div>   
                        </div>
             </section>



                    {/* <section id="section_rish" className="home_page_sec2 margin_top_medium_rish">
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
                    </section> */}

                    {/* <section id="section_rish" className="home_page_sec3 margin_top_medium_rish">
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
                    </section> */}

                    {/* <section id="section_rish" className="home_page_sec4 margin_top_medium_rish">
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
 */}


                    {/* <section id="section_rish" className="home_page_sec5 margin_top_medium_rish">
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
                    </section> */}

                    {/* <section id="section_rish" className="home_page_sec6 margin_top_medium_rish">
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
                    </section> */}


                    <section id="section_rish" className="home_page_sec7 ">
                       <div className="flex_wrap_rish_column-reverse ">
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

