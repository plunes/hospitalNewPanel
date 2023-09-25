import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import LandingHeader from '../LandingHeader'
import "./index.css"
import LandingFooter from '../LandingFooter';
import Button from "../functional/Button"
import AliceCarousel from 'react-alice-carousel';


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
        this.responsive = {
            0: { items: 1 },
            1024: { items: 1 },
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
                <h4>Smart, Simple, Secure</h4>
                <p>
                 Plunes is the AI powered utility network, which helps you find curated, validated & cost effective solutions to your healthcare problems.
                </p>
                <Link to="/signup">
                <Button className="margin_top_small_rish" type="no_icon" >Join Plunes</Button>
                </Link>
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
                 
          <section className="user-land-advantages  translate40 js-animate section-bg"  >
      
      <span className="user-land-advantages__left"></span>
      <span className="user-land-advantages__right"></span>
      <div className="container">
          <div className="section-title">
            <h2 style={{color:'#000'}}>Why Plunes</h2>
          </div>
          
          <div className="row">
              <div className="col-md-4 text-center vertical_space_around">
                  <div className="user-land-advantage__item js-animate translate40">
                      <div className="user-land-advantage__value">Real Time Insights</div>
                      <div className="user-land-advantage__desc"></div>
                  </div>
                  <div className="user-land-advantage__item js-animate translate40">
                      <div className="user-land-advantage__value">Actionable Insights</div>
                      <div className="user-land-advantage__desc"></div>
                  </div>
              </div>
              
                  
              <div className="col-md-4 text-center js-animate translate40">
                <img src="https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/About-Us/why_plunes-min.png" className="img-fluid why_plunes_center_image"  />
              </div>
              
              <div className="col-md-4 text-center vertical_space_around">
              <div className="user-land-advantage__item user-land-advantage js-animate translate40">
                    
                    <div className="user-land-advantage__desc"></div>
                    <div className="user-land-advantage__value">Easy Business Management</div>
                </div>
                  <div className="user-land-advantage__item user-land-advantage js-animate translate40">
                    
                      <div className="user-land-advantage__desc"></div>
                      <div className="user-land-advantage__value">Extensive Marketing</div>
                  </div>
                 
  
              </div>
          </div>
          
      </div>
  
  </section>

  <section>
  <div className="how_we_do_slider_wrapper" >
                        <AliceCarousel
                             items={[
                             <div  key={1} className="how_we_do_item_wrap " >
                                        <div className="how_we_do_item_child how_we_do_item_child_1">
                                            <img className="how_we_do_image" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/realtime.png" />
                                        </div>
                                        <div className="how_we_do_item_child how_we_do_child_2">
                                            <img  className="how_we_do_child_2_icon" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/realtime_icon.svg"/>
                                            <text style={{fontSize:'1rem'}} className="how_we_do_child_2_text how_we_do_child_2_head">Realtime Insights</text>
                                            <text className="how_we_do_child_2_text">Real Time requests from Patients near you who are looking for Medical Services and are viewing your Profiles.</text>
                                        </div>
                             </div>,
                             
                             <div  key={2} className="how_we_do_item_wrap " >
                                        <div className="how_we_do_item_child how_we_do_item_child_1">
                                            <img className="how_we_do_image" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/559.png" />
                                        </div>
                                        <div className="how_we_do_item_child how_we_do_child_2">
                                            <img  className="how_we_do_child_2_icon" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/actionable_icon.png"/>
                                            <text className="how_we_do_child_2_text how_we_do_child_2_head ">Actionable Insights</text>
                                            <text className="how_we_do_child_2_text">With the help of our powerful AI , we help you maintain your catalog Prices according to the competition rate in the market to get you maximum bookings.</text>
                                        </div>
                             </div>, <div  key={3} className="how_we_do_item_wrap " >
                                        <div className="how_we_do_item_child how_we_do_item_child_1">
                                            <img className="how_we_do_image" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/ai_image.png" />
                                        </div>
                                        <div className="how_we_do_item_child how_we_do_child_2">
                                            <img  className="how_we_do_child_2_icon" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/ai_icon.svg"/>
                                            <text style={{fontSize:'1rem'}} className="how_we_do_child_2_text how_we_do_child_2_head">Easy Business Management</text>
                                            <text className="how_we_do_child_2_text">Track your Business including your centres from one platform only, monitor performance and enhance your revenues by acting on intelligent insights.

</text>
                                        </div>
                             </div>,<div  key={4} className="how_we_do_item_wrap " >
                                        <div className="how_we_do_item_child how_we_do_item_child_1">
                                            <img className="how_we_do_image" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/marketting.png" />
                                        </div>
                                        <div className="how_we_do_item_child how_we_do_child_2">
                                            <img  className="how_we_do_child_2_icon" src="https://profile-image-plunes.s3.amazonaws.com/AnalyticPanel/marketting_icon.svg"/>
                                            <text style={{fontSize:'1rem'}} className="how_we_do_child_2_text how_we_do_child_2_head">Strong Marketing</text>
                                            <text className="how_we_do_child_2_text">Strong marketing on our platform will extensively promote your facility to targeted audiences and hence enhanced revenue </text>
                                        </div>
                             </div>]}
                             responsive={this.responsive}
                              autoPlayInterval={2000}
                              autoPlayDirection="rtl"
                              autoPlay={false}
                              buttonsDisabled ={true}
                            fadeOutAnimation={false}
                            mouseTrackingEnabled={true}
                            disableAutoPlayOnAction={true}
  />
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
                     <section className="about">
  <div className="container">
    <div className="icon-boxes text-center">
          <div className="section-title">
             <h2 style={{color:'#000'}}>Onboarding Process</h2>
          </div>
    
    </div>
  </div>
</section>

<section id="section_hiw" className="user-land-history cryp-section" style={{paddingTop:0}} >
    <div className="our_proccess_wrapper"  style={{position:'relative', zIndex:2}} >
        
        
        <div className="user-land-history__items">
            <div className="row">
                
                
                <div className="col-md-6 js-animate translate40">
                    <div className="history-item history-item--congress history-item--congress-spain history-item--left">
                        <div className="history-item__wrapper">
                            {/* <img src="assets/img/icons/registration.svg"  style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}} /> */}
                            <h3 className="history-item__title">Signup</h3>
                            <div className="history-item__place history-item__place-guarantee"> Step 1</div>
                            <p className="history-item__desc">
                                 Signup on the platform with your Primary phone number and specify specialities that are available at your facility.  
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 js-animate translate40">
                    <div className="history-item history-item--blockchain history-item--right">
                        <div className="history-item__wrapper">
                            {/* <img src="assets/img/icons/wallet.svg"  style={{position:'absolute', top:'-32px', right:'-32px', display:'block', width:'128px', height:'128px'}} /> */}
                            <h3 className="history-item__title">Add Services</h3>
                            <div className="history-item__place history-item__place-guarantee"> Step 2</div>
                            <p className="history-item__desc">
                            You can add service prices from our Universal catalog or upload list of services offered by your facility via .pdf , .xlsx document in our "Catalog Section"
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 js-animate translate40">
                    <div className="history-item history-item--leadership history-item--munich history-item--left">
                        <div className="history-item__wrapper">
                            {/* <img src="assets/img/icons/deposit.svg"  style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}} /> */}
                            <h3 className="history-item__title">Act on Insights</h3>
                            <div className="history-item__place history-item__place-guarantee"> Step 3</div>
                            <p className="history-item__desc">
                            Update prices according to intelligent insights provided by us to increase the conversion rates of patients.
Update Variance</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 js-animate translate40">
                    <div className="history-item history-item--blockchain history-item--right">
                        <div className="history-item__wrapper" >
                            {/* <img src="assets/img/icons/growth.svg"  style={{position:'absolute', top:'-32px', right:'-32px', display:'block', width:'128px', height:'128px'}} /> */}
                            <h3 className="history-item__title">Update Variance</h3>
                            <div className="history-item__place history-item__place-guarantee"> Step 4</div>
                            <p className="history-item__desc">
                            Our AI will suggest the right variance to you for better patient footfall and enhanced revenue.
Confirm appointments
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 js-animate translate40">
                    <div className="history-item history-item--leadership history-item--berlin history-item--left">
                        <div className="history-item__wrapper">
                            {/* <img src="assets/img/icons/withdraw.svg"  style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}}  /> */}
                            <h3 className="history-item__title">Confirm appointments</h3>
                            <div className="history-item__place history-item__place-guarantee"> Step 5</div>
                            <p className="history-item__desc">
                            Confirm and track  appointments of your facility and all respective centres from only one Admin Profile
                            Monitor Business/Payments
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6 js-animate translate40" >
                    <div className="history-item history-item--leadership history-item--koln history-item--right">
                        <div className="history-item__wrapper" style={{background:'#3bb83b'}} >
                            {/* <img src="assets/img/icons/restart-cycle.svg"  style={{position:'absolute', top:'-32px', right:'-32px', display:'block', width:'128px', height:'128px'}} /> */}
                            
                            <h3 className="history-item__title">Monitor payments</h3>
                            <div className="history-item__place history-item__place-guarantee"> Step 6</div>
                            <p className="history-item__desc">
                            Monitor complete payment funnel for every confirmed appointment and Monitor your business easily.
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
        

    </div>
 
</section>



{/* <section id="how_we_do_section" className="contact_us_form_section_wrapper oversize_wrap_rish">
                        <div className="what_we_do_wrapper">
                        <div className="section-title">
                           <h2 style={{color:'#000'}}>See How we Work?</h2>
                        </div>
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
             </section> */}




                    {/* <section id="section_rish" className="home_page_sec7 ">
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
                    </section> */}
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

