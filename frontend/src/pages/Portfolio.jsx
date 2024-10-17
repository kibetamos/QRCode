import React from 'react'

export default function Portfolio() {
  return (
    <div>
 <div id="portfolio" class="our-portfolio section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div class="section-heading  wow bounceIn" data-wow-duration="1s" data-wow-delay="0.2s">
            <h2>How <em> it</em> Works <span></span></h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <a href="#">
            <div class="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.3s">
              <div class="hidden-content">
                <h4>1.</h4>
                <p>Create a Cause  Sign up and add a title, description, and media.</p>
              </div>
              <div class="showed-content">
                <img src="assets/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-sm-6">
          <a href="#">
            <div class="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.4s">
              <div class="hidden-content">
                <h4>2.</h4>
                <p>Generate a QR Code Attach the QR code to your cause</p>
              </div>
              <div class="showed-content">
                <img src="assets/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-sm-6">
          <a href="#">
            <div class="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
              <div class="hidden-content">
                <h4>3.</h4>
                <p>Share & Engage Distribute your QR code and track engagement..</p>
              </div>
              <div class="showed-content">
                <img src="assets/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-sm-6">
          <a href="#">
            <div class="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.6s">
              <div class="hidden-content">
                <h4>4 .</h4>
                {/* <p>Lorem ipsum dolor sit ameti ctetur aoi adipiscing eto.</p> */}
              </div>
              <div class="showed-content">
                <img src="assets/images/portfolio-image.png" alt=""/>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
        
    </div>
  )
}
