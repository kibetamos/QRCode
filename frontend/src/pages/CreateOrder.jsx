import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Header from './Header';
import Footer from './Footer';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';


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
    const [order, setOrder] = useState(null); // Store created order details for QR code

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
                setOrder(res.data); // Store order data for QR code generation
                navigate('/'); // Redirect after successful creation
            })
            .catch((err) => alert("Error creating order: " + err.message));
    };

    // Generate QR code data format for the order
    const generateQRData = () => {
        if (!order) return "";
        return `orderId=${order.id}|eventId=${order.event}|userId=${order.user}|quantity=${order.quantity}|timestamp=${new Date().toISOString()}`;
    };

    return (
        <div>
            <Header />
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Homepage</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Orders</li>
                                </ol>
                            </nav>
                            <h2 className="text-white">Create Order</h2>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-12 text-center">
                            <h3 className="mb-4">Create Order</h3>
                        </div>

                        {event ? (
                            <div className="col-lg-8 col-12 mt-3 mx-auto" key={event.id}>
                                <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                    <div className="d-flex">
                                        <div className="custom-block-topics-listing-info d-flex">
                                            <div>
                                                <h5 className="mb-2">Name: {event.name}</h5>
                                                <p className="mb-0">Organizer: {event.organizer}</p>
                                                <p className="mb-0">Date: {event.date}</p>
                                            </div>
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

                                {/* Display QR Code after order creation */}
                                {order && (
                                    <div className="qr-code-section text-center mt-4">
                                        <h5>Your Order QR Code:</h5>
                                        <QRCodeCanvas value={generateQRData()} size={128} level="H" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>Loading event details...</p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}