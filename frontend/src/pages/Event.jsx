import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Event = () => {
    const [formData, setFormData] = useState({
        id: "", 
        name: "", 
        description: "", 
        date: "", 
        venue: "",  
        enable_phone_check: false,
        event_slug: "",
    });
    
    const [events, setEvents] = useState([]);
    const [lastEvents, setLastEvents] = useState([]);

    useEffect(() => {
        getEvents(); // Fetch events when component mounts
        getLastEvents();
    }, []);

    // const handleChange = (event) => {
    //     const { name, value, type, checked } = event.target;
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [name]: type === "checkbox" ? checked : value
    //     }));
    // };

    const getEvents = () => {
        api
            .get("/api/events/")
            .then((res) => {
                setEvents(res.data); // Set all events
                console.log(res.data);
            })
            .catch((err) => alert("Error fetching events: " + err.message));
    };


    const getLastEvents = () => {
        api
            .get("/api/events/")
            .then((res) => {
                const lastTwoEvents = res.data.slice(-2); // Get the last two events
                setLastEvents(lastTwoEvents);
                console.log(lastTwoEvents);
            })
            .catch((err) => alert("Error fetching last events: " + err.message));
    };

// Only take the top 3 events for display
const topThreeEvents = events.slice(0, 3);

    const createEvent = (e) => {
        e.preventDefault();
        const { id, ...eventData } = formData; // Extract the ID from formData
        api
            .post("/api/events/", {
                organizer: id, // Set organizer ID correctly
                ...eventData // Spread the rest of the event data
            })
            .then((res) => {
                if (res.status === 201) {
                    alert("Event created!");
                    setFormData({ 
                        id: "", 
                        name: "", 
                        description: "", 
                        date: "", 
                        venue: "",  
                        enable_phone_check: false,
                        event_slug: "",
                    });
                    getEvents(); // Refresh events
                } else {
                    alert("Failed to create event.");
                }
            })
            .catch((err) => {
                console.error(err); // Log the error for debugging
                alert("Error creating event: " + (err.response ? err.response.data : err.message));
            });
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

                                    <li class="breadcrumb-item active" aria-current="page">Events</li>
                                </ol>
                            </nav>

                            <h2 class="text-white">Events</h2>
                        </div>

                    </div>
                </div>
            </header>
            

            

            {/* <h2>
            <a className="nav-link" href="/">Create Event</a>
                </h2> */}
            {/* <form onSubmit={createEvent}>

                <input 
                    type="text"  
                    name="id"
                    placeholder="Organizer ID" 
                    onChange={handleChange} 
                    value={formData.id} 
                    required 
                />

                <input 
                    type="text" 
                    name="name"  
                    placeholder="Event Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />

                <textarea 
                    name="description"  
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange}                    
                    required 
                />

                <input 
                    type="date" 
                    name="date"  
                    value={formData.date} 
                    onChange={handleChange}
                    required 
                />

                <input 
                    type="text" 
                    name="venue"  
                    placeholder="Venue" 
                    value={formData.venue} 
                    onChange={handleChange}
                    required 
                />
                <input 
                    type="text" 
                    name="event_slug"  
                    placeholder="Event Slug" 
                    value={formData.event_slug} 
                    onChange={handleChange} 
                    required 
                />
                
                <label>
                    <input 
                        type="checkbox" 
                        checked={formData.enable_phone_check}
                        onChange={handleChange}
                        name="enable_phone_check" 
                    />
                    Enable Phone Check
                </label>

                <button type="submit">Create Event</button>
            </form> */}

            {/* Display fetched events */}
            {/* <h3>Existing Events:</h3> */}
            
          
            <section class="section-padding">
            <div class="container">
                <div class="row">

                    <div class="col-lg-12 col-12 text-center">
                        <h3 class="mb-4">Popular Events</h3>
                        <p>You have {events.length} event{events.length !== 1 ? 's' : ''}.</p>
                    </div>
                    {topThreeEvents.map(event => (
                    <div class="col-lg-8 col-12 mt-3 mx-auto" key={event.id}>
                        <div class="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                            <div class="d-flex">
                                <img src="./assets/images/topics/undraw_Remote_design_team_re_urdx.png" class="custom-block-image img-fluid" alt=""/>

                                <div class="custom-block-topics-listing-info d-flex">
                                    <div>
                                        <h5 class="mb-2">{event.name}</h5>
                                        <p class="mb-0">{event.organizer}.</p>

                                        <p class="mb-0">{event.description}.</p>

                                        <p class="mb-0">{event.date}.</p>
                                        <Link to={`/events/${event.id}/create-order`}>
                                            <button class="btn custom-btn mt-3 mt-lg-4">Create Order</button>
                                        </Link>

                                        {/* <a href="topics-detail.html" class="btn custom-btn mt-3 mt-lg-4">Create Order</a> */}
                                    </div>

                                    {/* <span class="badge bg-design rounded-pill ms-auto">14</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
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

                        <div class="col-lg-12 col-12">
                            <h3 class="mb-4">Trending Events</h3>
                        </div>

                        {lastEvents.map(event => (

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
                        ))}
                       

                    </div>
                </div>
            </section>
                        <Footer/>
        </div>
    );
};

export default Event;
