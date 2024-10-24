import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {

  return (

    <div>
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
    </div>
  );
}
