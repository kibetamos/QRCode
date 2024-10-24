import React from 'react'

export default function Portfolio() {
  return (
    <div>
<section class="timeline-section section-padding" id="section_3">
    <div class="section-overlay"></div>

    <div class="container">
        <div class="row">

            <div class="col-12 text-center">
                <h2 class="text-white mb-4">How does it work?</h2>
            </div>

            <div class="col-lg-10 col-12 mx-auto">
                <div class="timeline-container">
                    <ul class="vertical-scrollable-timeline" id="vertical-scrollable-timeline">
                        <div class="list-progress">
                            <div class="inner"></div>
                        </div>

                        <li>
                            <h4 class="text-white mb-3">Search</h4>

                            <p class="text-white">Search for an event you are instrested</p>

                            <div class="icon-holder">
                              <i class="bi-search"></i>
                            </div>
                        </li>
                        
                        <li>
                            <h4 class="text-white mb-3">Scan</h4>

                            <p class="text-white">Choose the event and scan qr as a person to attend</p>

                            <div class="icon-holder">
                              <i class="bi-bookmark"></i>
                            </div>
                        </li>

                        <li>
                            <h4 class="text-white mb-3">Prepare &amp; Enjoy</h4>

                            <p class="text-white">Hurray You are atending the event, Dont miss it.</p>

                            <div class="icon-holder">
                              <i class="bi-book"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 text-center mt-5">
                <p class="text-white">
                    Want to learn more?
                    <a href="#" class="btn custom-btn custom-border-btn ms-3">Check out Here</a>
                </p>
            </div>
        </div>
    </div>
</section>
        
    </div>
  )
}
