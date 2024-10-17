import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ContactUs from './ContactUs'
import Portfolio from './Portfolio'
import Blog from './Blog'
export default function Home() {
  return (
    <div>
        <div id="js-preloader" class="js-preloader">
    <div class="preloader-inner">
      <span class="dot"></span>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
      
<Header />

      <div class="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
          {/* Empowering Ideas and Causes Through QR Technology */}
            <div class="col-lg-6 align-self-center">
              <div class="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                <h6>Welcome to ANYQRC</h6>
                {/* &amp; */}
                <h2>Empowering <em>Ideas through</em>  <span>QR</span> Technology</h2>
                <p>
                Easily create, share, and showcase your causes or ideas with a simple scan. 
                With Anyqrc, you can generate QR codes that link directly to detailed information, images, 
                and stories about your cause or project, enabling seamless sharing and engagement for anyone, anywhere.
                  
                  
                {/* <a rel="nofollow" href="https://templatemo.com/page/1" target="_parent">TemplateMo</a>. */}
                
                
                </p>
                <form id="search" action="#" method="GET">
                  <fieldset>
                    <input type="address" name="address" class="email" placeholder="Your website URL..." autocomplete="on" required />
                  </fieldset>
                  <fieldset>
                    <button type="submit" class="main-button">Create Your First QRCode</button>
                  </fieldset>
                </form>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <img src="assets/images/banner-right-image.png" alt="team meeting" /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="about" class="about-us section">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="left-image wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
            <img src="assets/images/about-left-image.png" alt="person graphic"/>
          </div>
        </div>
        <div class="col-lg-8 align-self-center">
          <div class="services">
            <div class="row">
              <div class="col-lg-6">
                <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                  <div class="icon">
                    <img src="assets/images/service-icon-01.png" alt="reporting"/>
                  </div>
                  <div class="right-text">
                    <h4>Create & Share Instantly </h4>
                    <p>Generate a QR code for any cause or idea within minutes.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
                  <div class="icon">
                    <img src="assets/images/service-icon-02.png" alt=""/>
                  </div>
                  <div class="right-text">
                    <h4>Engage with Multimedia </h4>
                    <p>Add images, videos, and detailed descriptions.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
                  <div class="icon">
                    <img src="assets/images/service-icon-03.png" alt=""/>
                  </div>
                  <div class="right-text">
                    <h4>Track Engagement </h4>
                    <p>Monitor views and interactions on your QR codes.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
                  <div class="icon">
                    <img src="assets/images/service-icon-04.png" alt=""/>
                  </div>
                  <div class="right-text">
                    <h4>Accessible Everywhere </h4>
                    <p>Anyone can scan your QR code and access the information instantly, without an app.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


<Portfolio />

{/* <Blog /> */}
  
<ContactUs />
  
<Footer />
  
    </div>
  )
}
