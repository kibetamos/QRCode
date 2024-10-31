import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Orders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
      getOrders();
  }, []);
  
  
    const getOrders = () => {
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
    
    <div>
        <Header />
          {/* {orders.map((order, index) => (
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
                            ))} */}


<header class="site-header d-flex flex-column justify-content-center align-items-center">
                <div class="container">
                    <div class="row align-items-center">

                        <div class="col-lg-5 col-12">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="index.html">Homepage</a></li>

                                    <li class="breadcrumb-item active" aria-current="page">Orders</li>
                                </ol>
                            </nav>

                            <h2 class="text-white">Orders</h2>
                        </div>

                    </div>
                </div>
            </header>
            <section class="section-padding">
            <div class="container">
                <div class="row">

                    <div class="col-lg-12 col-12 text-center">
                        <h3 class="mb-4">All Orders</h3>
                        <p>You have {orders.length} order{orders.length !== 1 ? 's' : ''}.</p>
                    </div>
                    
                    {orders.map((order, index) => (
                        // <Link to={`/api/events/${event.id}/`}>
                    <div class="col-lg-8 col-12 mt-3 mx-auto" key={order.id}>
                        <div class="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                        <Link to={`/api/orders/${order.id}/`}>
                            <div class="d-flex">
                            {/* <img src="./assets/images/topics/undraw_Remote_design_team_re_urdx.png" class="custom-block-image img-fluid" alt=""/> */}
                                <img src="/assets/images/topics/undraw_Remote_design_team_re_urdx.png" class="custom-block-image img-fluid" alt=""/>

                                <div class="custom-block-topics-listing-info d-flex">
                                    <div>
                                        <h5 class="mb-2">{order.event_name.charAt(0).toUpperCase() + order.event_name.slice(1)}</h5>

                                        <p class="mb-0">
                                        {order.event_name && order.event_name.charAt(0).toUpperCase() + order.event_name.slice(1)} on {new Date(order.event_date).toLocaleString()}
                                            </p>

                                        <p class="mb-0">
                                        {order.remaining_quantity}
                                            </p>

                                        {/* <p class="mb-0">{event.date}.</p> */}
                                        {/* <Link to={`/events/${event.id}/create-order`}>
                                            <button class="btn custom-btn mt-3 mt-lg-4">Create Order</button>
                                        </Link> */}

                                        {/* <a href="topics-detail.html" class="btn custom-btn mt-3 mt-lg-4">Create Order</a> */}
                                    </div>

                                    <span class="badge bg-design rounded-pill ms-auto">{order.remaining_quantity}</span>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    // </Link>  
                        ))}
                                        

                </div>
            </div>
        </section>
                
                    
                    
              
            <div class="col-lg-12 col-12">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-center mb-0">
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">Prev</span>
                                        </a>
                                    </li>

                                    <li class="page-item active" aria-current="page">
                                        <a class="page-link" href="#">1</a>
                                    </li>
                                    
                                    <li class="page-item">
                                        <a class="page-link" href="#">2</a>
                                    </li>
                                    
                                    <li class="page-item">
                                        <a class="page-link" href="#">3</a>
                                    </li>

                                    <li class="page-item">
                                        <a class="page-link" href="#">4</a>
                                    </li>

                                    <li class="page-item">
                                        <a class="page-link" href="#">5</a>
                                    </li>
                                    
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <section class="section-padding section-bg">
                <div class="container">


                    
                    <div class="row">

                        {/* <div class="col-lg-12 col-12">
                            <h3 class="mb-4">Trending Events</h3>
                        </div> */}

                        {/* {lastEvents.map(event => (

                        <div class="col-lg-6 col-md-6 col-12 mt-3 mb-4 mb-lg-0">
                            <div class="custom-block bg-white shadow-lg">
                                <a href="topics-detail.html">
                                    <div class="d-flex">
                                        <div>
                                            <h5 class="mb-2">{event.name}</h5>

                                            <p class="mb-0">{event.description}</p>
                                        </div>

                                        <span class="badge bg-finance rounded-pill ms-auto">30</span>
                                    </div>

                                    <img src="./assets/images/topics/undraw_Finance_re_gnv2.png" class="custom-block-image img-fluid" alt=""/>
                                </a>
                            </div>
                        </div>
                        ))} */}
                       

                    </div>
                </div>
            </section>
                        <Footer/>
        </div>
    );
};
    


