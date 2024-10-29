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

  const [orders, setOrders] = useState([])

  useEffect(() => {
    getEvents();
}, []);


  const getEvents = () => {
    api
        .get("/api/orders/")
        .then((res) => res.data)
        .then((data) => {
            setOrders(data);
            console.log(data);
        })
        .catch((err) => alert(err));
};
  return (

   <main>
   <nav class="navbar navbar-expand-lg">
                <div class="container">
                
                    <a className="navbar-brand" href="/">
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

    
                            <li class="nav-item">
                            <a className="nav-link" href="/event">Create Order</a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>

                                <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                    <li><a class="dropdown-item" href="topics-listing.html">REGISTER</a></li>

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

                            {/* <span class="badge bg-design rounded-pill ms-auto">14</span> */}
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
                                <h5 class="text-white mb-2">AnyQRC</h5>

                                <p class="text-white">Easily create, share, and showcase your causes or ideas with a simple scan. With Anyqrc, you can generate QR codes that link directly to detailed information, images, and stories about your cause or project, enabling seamless sharing and engagement for anyone, anywhere.</p>

                                <a href="topics-detail.html" class="btn custom-btn mt-2 mt-lg-3">Learn More</a>
                            </div>

                            {/* <span class="badge bg-finance rounded-pill ms-auto">25</span> */}
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

                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="finance-tab" data-bs-toggle="tab" data-bs-target="#finance-tab-pane" type="button" role="tab" aria-controls="finance-tab-pane" aria-selected="false">Activities</button>
                </li>
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
                            {orders.map((order, index) => (
                                <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" key={index}>
                                    <div className="custom-block bg-white shadow-lg">
                                        <Link to={`/api/orders/${order.id}/`}>
                                            <div className="d-flex">
                                                <div>
                                                <h5 className="mb-2">
                                                {order.event_name.charAt(0).toUpperCase() + order.event_name.slice(1)}
                                                 </h5>

                                                    <p className="mb-0">
                                                    {order.event_name && order.event_name.charAt(0).toUpperCase() + order.event_name.slice(1)} on {new Date(order.event_date).toLocaleString()}
                                                    </p>
                                                </div>
                                                <span className="badge bg-design rounded-pill ms-auto">
                                                    {order.remaining_quantity}
                                                </span>
                                            </div>
                                            <img 
                                                src="./assets/images/topics/undraw_Redesign_feedback_re_jvm0.png" 
                                                className="custom-block-image img-fluid" 
                                                alt={`${order.event_name} image`}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ))}
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