import React from 'react'
// import Header from './Header'
import Footer from './Footer'
import ContactUs from './ContactUs'
import Portfolio from './Portfolio'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react'
import api from '../api'
// import Header from './Header';
export default function Home() {

  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents();
}, []);


  const getEvents = () => {
    api
        .get("/api/events/orders/")
        .then((res) => res.data)
        .then((data) => {
            setEvents(data);
            console.log(data);
        })
        .catch((err) => alert(err));
};
  return (

   <main>
   <nav class="navbar navbar-expand-lg">
                <div class="container">
                  
                    <a class="navbar-brand" href="index.html">
                        <i class="bi-back"></i>
                        <span>AnyQRC</span>
                    </a>

                    <div class="d-lg-none ms-auto me-4">
                        <a href="#top" class="navbar-icon bi-person smoothscroll"></a>
                    </div>
    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
    
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-lg-5 me-lg-auto">
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_1">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_2">Generate Cause</a>
                            </li>
    
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_3">ScanQRCode</a>
                            </li>
{/* <!-- 
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_4">FAQs</a>
                            </li> --> */}
    
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_5">Contact</a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>

                                <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                    <li><a class="dropdown-item" href="topics-listing.html">REGISTER</a></li>

                                    {/* <li><a class="dropdown-item" href="login.html">LOGIN</a></li> */}
                                    <li>
                                      <Link className="dropdown-item" to="/login">LOGIN</Link>
                                    </li>

                                    <li><a class="dropdown-item" href="contact.html">LOGOUT</a></li>

                                </ul>
                            </li>
                        </ul>

                        <div class="d-none d-lg-block">
                         
                            <a href="#top" class="navbar-icon bi-person smoothscroll">
                                

                            </a>
                            
                        
                        </div>
                    </div>
                </div>
            </nav>  


<section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
    <div class="container">
        <div class="row">

            <div class="col-lg-8 col-12 mx-auto">
                <h1 class="text-white text-center">Search. Scan. Join</h1>

                <h6 class="text-center">Dont be left out Scan now</h6>

                <form method="get" class="custom-form mt-4 pt-2 mb-lg-0 mb-5" role="search">
                    <div class="input-group input-group-lg">
                        <span class="input-group-text bi-search" id="basic-addon1">
                            
                        </span>

                        <input name="keyword" type="search" class="form-control" id="keyword" placeholder="Birthday, Shopping, Marketing, Finance ..." aria-label="Search" />

                        <button type="submit" class="form-control">Search</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</section>


<section class="featured-section">
    <div class="container">
        <div class="row justify-content-center">

            <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                <div class="custom-block bg-white shadow-lg">
                    <a href="topics-detail.html">
                        <div class="d-flex">
                            <div>
                                <h5 class="mb-2">AnyQRC</h5>

                                <p class="mb-0">We work around the clock to ensure you get the best.</p>
                            </div>

                            <span class="badge bg-design rounded-pill ms-auto">14</span>
                        </div>

                        <img src="./assets/images/topics/undraw_Remote_design_team_re_urdx.png" class="custom-block-image img-fluid" alt=""/>
                    </a>
                </div>
            </div>

            <div class="col-lg-6 col-12">
                <div class="custom-block custom-block-overlay">
                    <div class="d-flex flex-column h-100">
                        <img src="./assets/images/businesswoman-using-tablet-analysis.jpg" class="custom-block-image img-fluid" alt=""/>

                        <div class="custom-block-overlay-text d-flex">
                            <div>
                                <h5 class="text-white mb-2">Finance</h5>

                                <p class="text-white">Topic Listing Template includes homepage, listing page, detail page, and contact page. You can feel free to edit and adapt for your CMS requirements.</p>

                                <a href="topics-detail.html" class="btn custom-btn mt-2 mt-lg-3">Learn More</a>
                            </div>

                            <span class="badge bg-finance rounded-pill ms-auto">25</span>
                        </div>

                        <div class="social-share d-flex">
                            <p class="text-white me-4">Share:</p>

                            <ul class="social-icon">
                                <li class="social-icon-item">
                                    <a href="#" class="social-icon-link bi-twitter"></a>
                                </li>

                                <li class="social-icon-item">
                                    <a href="#" class="social-icon-link bi-facebook"></a>
                                </li>

                                <li class="social-icon-item">
                                    <a href="#" class="social-icon-link bi-pinterest"></a>
                                </li>
                            </ul>

                            <a href="#" class="custom-icon bi-bookmark ms-auto"></a>
                        </div>

                        <div class="section-overlay"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>


<section class="explore-section section-padding" id="section_2">
    <div class="container">
        <div class="row">

            <div class="col-12 text-center">
                <h2 class="mb-4">Browse Activities</h2>
            </div>

        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                {/* <!-- <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="design-tab" data-bs-toggle="tab" data-bs-target="#design-tab-pane" type="button" role="tab" aria-controls="design-tab-pane" aria-selected="true">Design</button>
                </li> -->

                <!-- <li class="nav-item" role="presentation">
                    <button class="nav-link" id="marketing-tab" data-bs-toggle="tab" data-bs-target="#marketing-tab-pane" type="button" role="tab" aria-controls="marketing-tab-pane" aria-selected="false">Marketing</button>
                </li> --> */}

                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="finance-tab" data-bs-toggle="tab" data-bs-target="#finance-tab-pane" type="button" role="tab" aria-controls="finance-tab-pane" aria-selected="false">Activities</button>
                </li>

                {/* <!-- <li class="nav-item" role="presentation">
                    <button class="nav-link" id="music-tab" data-bs-toggle="tab" data-bs-target="#music-tab-pane" type="button" role="tab" aria-controls="music-tab-pane" aria-selected="false">Music</button>
                </li> -->

                <!-- <li class="nav-item" role="presentation">
                    <button class="nav-link" id="education-tab" data-bs-toggle="tab" data-bs-target="#education-tab-pane" type="button" role="tab" aria-controls="education-tab-pane" aria-selected="false">Education</button>
                </li> --> */}
            </ul>
        </div>
    </div>

    <div class="container">
        <div class="row">

            <div class="col-12">
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="design-tab-pane" role="tabpanel" aria-labelledby="design-tab" tabindex="0">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                                <div class="custom-block bg-white shadow-lg">
                                    <a href="topics-detail.html">
                                        <div class="d-flex">
                                            <div>
                                                <h5 class="mb-2">Birthday</h5>

                                                <p class="mb-0">Birthday Party happening o 28/12/2025.</p>
                                            </div>

                                            <span class="badge bg-design rounded-pill ms-auto">14</span>
                                        </div>

                                        <img src="./assets/images/topics/undraw_Remote_design_team_re_urdx.png" class="custom-block-image img-fluid" alt=""/>
                                    </a>
                                </div>
                            </div>
                            {events.map((event, index) => (
                            <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                                <div class="custom-block bg-white shadow-lg">
                                    <a href="topics-detail.html">
                                        <div class="d-flex">
                                            <div>
                                                <h5 class="mb-2">{event.name}</h5>

                                                    <p class="mb-0">Wedding of X and Y happening on {event.date}.</p>
                                            </div>

                                            <span class="badge bg-design rounded-pill ms-auto">75</span>
                                        </div>

                                        <img src="./assets/images/topics/undraw_Redesign_feedback_re_jvm0.png" class="custom-block-image img-fluid" alt=""/>
                                    </a>
                                </div>
                            </div>
 ))}
                            {/* <div class="col-lg-4 col-md-6 col-12">
                                <div class="custom-block bg-white shadow-lg">
                                    <a href="topics-detail.html">
                                        <div class="d-flex">
                                            <div>
                                                <h5 class="mb-2">Shopping Voucher</h5>

                                                    <p class="mb-0">Shopping voucher from Walmart expiry 12/12/24.</p>
                                            </div>

                                            <span class="badge bg-design rounded-pill ms-auto">100</span>
                                        </div>

                                        <img src="./assets/images/topics/colleagues-working-cozy-office-medium-shot.png" class="custom-block-image img-fluid" alt=""/>
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

        </div>
    </div>
    </div>
</section>


<Portfolio />
<ContactUs />
<Footer/>

  
</main>
  )
}