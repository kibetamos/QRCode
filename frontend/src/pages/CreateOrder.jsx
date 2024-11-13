// OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';


export default function CreateOrder() {
    const [event, setEvent] = useState(null); // Store event details
    const { id } = useParams(); // Event ID from URL parameters
    const navigate = useNavigate(); // For navigation after order creation
    const [formData, setFormData] = useState({
        user: "", 
        event: "", 
        quantity: 1, // Default to 1
        remaining_quantity: 1, 
        status: "PENDING",
    });

    // Fetch event details on component mount
    useEffect(() => {
        getEvent();
    }, []);

    // Fetch the event based on ID from URL parameters
    const getEvent = () => {
        api.get(`api/events/${id}/`)
            .then((res) => {
                setEvent(res.data);
                setFormData((prevData) => ({
                    ...prevData,
                    event: res.data.id,
                    user: res.data.organizer,
                }));
            })
            .catch((err) => alert("Error fetching event: " + err.message));
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submit the form to create an order
    const handleSubmit = (e) => {
        e.preventDefault();
        api.post("api/orders/", formData)
            .then((res) => {
                alert("Order created successfully!");
                navigate('/'); // Redirect after successful creation
            })
            .catch((err) => alert("Error creating order: " + err.message));
    };

    return (
        <div>
            <Header />
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
                            <h2 class="text-white">Create Order</h2>
                        </div>
                    </div>
                </div>
            </header>
            {/* <h3></h3> */}
            <div>

            <section class="section-padding">
            <div class="container">
                <div class="row">

                    <div class="col-lg-12 col-12 text-center">
                        <h3 class="mb-4">Create Order</h3>
                        {/* <p>You have {events.length} event{events.length !== 1 ? 's' : ''}.</p> */}
                    </div>
                    
                    {event ? (
                        // <Link to={/api/events/${event.id}/}>
                    <div class="col-lg-8 col-12 mt-3 mx-auto" key={event.id}>
                        <div class="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                            <div class="d-flex">
                                {/* <img src="./assets/images/topics/undraw_Remote_design_team_re_urdx.png" class="custom-block-image img-fluid" alt=""/> */}

                                <div class="custom-block-topics-listing-info d-flex">
                                    <div>
                                        <h5 class="mb-2">Name: {event.name}</h5>
                                        <p class="mb-0">Organizer: {event.organizer}</p>

                                        <p class="mb-0">Date: {event.date}.</p>

                                        <p class="mb-0">{event.date}.</p>
                                        
                                    </div>
                                    

                                    {/* <span class="badge bg-design rounded-pill ms-auto">14</span> */}
                                </div>
                                
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn custom-btn mt-3 mt-lg-4">
                                    Create Order
                                </button>
                            </form>
                        </div>
                        
                    </div>
                   
                ) : (
                    <p>Loading event details...</p>
                )}
                                        

                </div>
            </div>
        </section>
            </div>
            <Footer />
        </div>
    );
}