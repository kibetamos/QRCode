import React, { useState, useEffect } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function About_Event() {
    const [event, setEvent] = useState(null); // Change to singular since we're fetching one event
    const { id } = useParams();

    useEffect(() => {
        getEvent(); // Fetch event when component mounts
    }, []);

    const getEvent = () => {
        api
            .get(`api/events/${id}/`) // API call to get the event details
            .then((res) => {
                setEvent(res.data); // Set the single event
                console.log(res.data);
            })
            .catch((err) => alert("Error fetching event: " + err.message));
    };
    
    return (
        <div>
            <Header />

            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        {event ? (
                            <div className="col-lg-8 col-12 mt-3 mx-auto">
                                <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                                    <div className="d-flex">
                                        <img src="/assets/images/topics/undraw_Remote_design_team_re_urdx.png" className="custom-block-image img-fluid" alt=""/>

                                        <div className="custom-block-topics-listing-info d-flex">
                                            <div>
                                                <h5 className="mb-2">{event.name}</h5>
                                                <p className="mb-0">Organizer: {event.organizer}</p>
                                                <p className="mb-0">Description: {event.description}</p>
                                                <p className="mb-0">Date: {event.date}</p>
                                                <Link to={`/api/events/${event.id}/create_order`}>
                                                {/* <Link to={`/api/events/${event.id}/`}></Link> */}
                                                    <button className="btn custom-btn mt-3 mt-lg-4">Create Order</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
