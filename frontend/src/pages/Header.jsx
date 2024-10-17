import React from 'react'

export default function Header() {
  return (
    <div>
      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="#top" className="logo">
                  <h4>ANY<span>QRC</span></h4>
                </a>
  
                <ul className="nav">
                  <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                  <li className="scroll-to-section"><a href="#about">About Us</a></li>
                  {/* <li className="scroll-to-section"><a href="#services">Services</a></li> */}
                  <li className="scroll-to-section"><a href="#portfolio">ScanCode</a></li>
                  {/* <li className="scroll-to-section"><a href="#blog">Blog</a></li>  */}
                  <li className="scroll-to-section"><a href="#contact">Message Us</a></li> 
                  <li className="scroll-to-section">
                    <div className="main-red-button">
                      {/* <a href="#contact">Contact Now</a> */}
                      <a href="#contact">Scan code</a>
                    </div>
                  </li> 
                </ul>        
                <a className='menu-trigger'>
                    <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
